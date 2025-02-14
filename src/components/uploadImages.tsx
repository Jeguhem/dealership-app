import React, { useState, useEffect } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImageUploaderProps {
  label: string;
  name: string;
  onChange: (files: File[]) => void;
  error?: string;
  className?: string;
  maxSize?: number;
  acceptedTypes?: string[];
  initialPreviews?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  name,
  onChange,
  error,
  className = "",
  maxSize = 2 * 1024 * 1024, // 2MB default
  acceptedTypes = ["image/png", "image/jpeg", "image/gif"],
  initialPreviews = [],
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialPreviews);
  const [errors, setErrors] = useState<string[]>([]);

  const validateImage = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      setErrors((prev) => [...prev, `${file.name}: Invalid file type.`]);
      return false;
    }

    if (file.size > maxSize) {
      setErrors((prev) => [
        ...prev,
        `${file.name}: File size too large (max ${formatFileSize(maxSize)}).`,
      ]);
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList) => {
    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    setErrors([]);

    Array.from(files).forEach((file) => {
      if (validateImage(file)) {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    onChange([...selectedFiles, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    onChange(selectedFiles.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        className={`relative rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
          dragActive
            ? "border-purple-600 bg-purple-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="block cursor-pointer">
          <input
            type="file"
            id={name}
            name={name}
            className="hidden"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            accept={acceptedTypes.join(",")}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-[#A700AF]/10 p-3">
              <Upload className="h-6 w-6 text-[#A700AF]/80" />
            </div>
            <div>
              <span className="text-[#A700AF] hover:underline">
                Click to upload
              </span>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <p className="text-sm text-gray-500">
              {acceptedTypes
                .map((type) => type.split("/")[1].toUpperCase())
                .join(", ")}{" "}
              (max. {formatFileSize(maxSize)} each)
            </p>
          </div>
        </label>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Image Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previews.map((src, index) => (
            <div key={index} className="relative group">
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -right-2 -top-2 rounded-full bg-white p-1.5 shadow-md hover:bg-red-50"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
              <Image
                src={src}
                alt={`Preview ${index + 1}`}
                width={120}
                height={120}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
