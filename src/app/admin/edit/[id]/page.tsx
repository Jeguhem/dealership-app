"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "@/components/uploadImages";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getPublicIdFromUrl } from "@/app/api/cloudinary/delete/route";
import { useQueryClient } from "@tanstack/react-query";

interface CarFormData {
  name: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  status: string;
  drivetrain: string;
  condition: string;
  extras: string;
  images: string[];
}

const EditCarPage: React.FC = () => {
  const [formData, setFormData] = useState<CarFormData>({
    name: "",
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    status: "",
    drivetrain: "",
    condition: "",
    extras: "",
    images: [],
  });
  const [originalData, setOriginalData] = useState<CarFormData | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the full pathname
  const id = pathname.split("/").pop();
  const queryClient = useQueryClient();

  // Fetch existing car data
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/cars/${id}`);
        const data = await response.json();
        setFormData(data);
        setOriginalData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Failed to load car data");
      }
    };

    fetchCarData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  const uploadImagesToCloudinary = async (files: File[]) => {
    const cloudinaryUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "car inventory");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          cloudinaryUrls.push(data.secure_url);
        }
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
      }
    }

    return cloudinaryUrls;
  };

  // const handleDeleteSelectedImages = async () => {
  //   try {
  //     // First delete images from Cloudinary
  //     for (const imageUrl of selectedImages) {
  //       const publicId = getPublicIdFromUrl(imageUrl);

  //       if (publicId) {
  //         await fetch("/api/cloudinary/delete", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ public_id: publicId }),
  //         });
  //       }
  //     }

  //     // Then update the car document to remove the deleted image URLs
  //     const response = await fetch(`/api/cars/${id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ imageUrls: selectedImages }),
  //     });

  //     if (!response.ok) throw new Error("Failed to update car");

  //     // Update local state
  //     setFormData((prev) => ({
  //       ...prev,
  //       images: prev.images.filter((img) => !selectedImages.includes(img)),
  //     }));
  //     setSelectedImages([]);
  //     setIsDeleteDialogOpen(false);
  //   } catch (error) {
  //     console.error("Error deleting images:", error);
  //     setError("Failed to delete images");
  //   }
  // };

  const handleDeleteSelectedImages = async () => {
    try {
      // Define types for our arrays
      const successfullyDeletedImages: string[] = [];
      const failedImages: string[] = [];

      // First delete images from Cloudinary
      for (const imageUrl of selectedImages) {
        try {
          const publicId = getPublicIdFromUrl(imageUrl);
          if (!publicId) {
            failedImages.push(imageUrl);
            continue;
          }

          const response = await fetch("/api/cloudinary/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: publicId }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(
              error.error || "Failed to delete image from Cloudinary"
            );
          }

          successfullyDeletedImages.push(imageUrl);
        } catch (error) {
          console.error(`Failed to delete image ${imageUrl}:`, error);
          failedImages.push(imageUrl);
        }
      }

      if (successfullyDeletedImages.length === 0) {
        throw new Error("No images were successfully deleted from Cloudinary");
      }

      // Calculate remaining images
      const remainingImages = formData.images.filter(
        (img: string) => !successfullyDeletedImages.includes(img)
      );

      // Update the car document with remaining images
      const response = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: successfullyDeletedImages }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update car images");
      }

      // Update local state
      setFormData((prev) => ({
        ...prev,
        images: remainingImages,
      }));
      setSelectedImages([]);
      setIsDeletingImage(false);
      setIsDeleteDialogOpen(false);

      // Show success/warning message if some images failed
      if (failedImages.length > 0) {
        setError(
          `${successfullyDeletedImages.length} images deleted, ${failedImages.length} failed`
        );
      } else {
        // You might want to add a success toast/message here
        console.log("All images deleted successfully");
      }
    } catch (error) {
      console.error("Error in delete image operation:", error);
      setIsDeletingImage(false);
      setIsDeleteDialogOpen(false);
      setError(
        error instanceof Error ? error.message : "Failed to delete images"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload new images if any
      const uploadedUrls = await uploadImagesToCloudinary(selectedFiles);
      const updatedFormData = {
        ...formData,
        images: [...formData.images, ...uploadedUrls],
      };

      const response = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) throw new Error("Failed to update car");

      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to update car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Car</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Form fields with current values shown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Make
                    {originalData?.make && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.make})
                      </span>
                    )}
                  </label>
                  <Input
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    placeholder={originalData?.make || "e.g., Toyota"}
                    required
                  />
                </div>

                {/* Model Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Model
                    {originalData?.model && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.model})
                      </span>
                    )}
                  </label>
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder={originalData?.model || "e.g., Camry"}
                    required
                  />
                </div>

                {/* Year Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Year
                    {originalData?.year && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.year})
                      </span>
                    )}
                  </label>
                  <Input
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder={originalData?.year || "e.g., 2022"}
                    min="1900"
                    max="2025"
                    required
                  />
                </div>

                {/* Price Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Price (₦)
                    {originalData?.price && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.price})
                      </span>
                    )}
                  </label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder={originalData?.price || "e.g., 15000000"}
                    required
                  />
                </div>

                {/* Mileage Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Mileage
                    {originalData?.mileage && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.mileage})
                      </span>
                    )}
                  </label>
                  <Input
                    name="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder={originalData?.mileage || "e.g., 20000"}
                    required
                  />
                </div>

                {/* Fuel Type Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Fuel Type
                    {originalData?.fuelType && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.fuelType})
                      </span>
                    )}
                  </label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value) =>
                      handleSelectChange("fuelType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          originalData?.fuelType || "Select fuel type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transmission Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Transmission
                    {originalData?.transmission && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.transmission})
                      </span>
                    )}
                  </label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) =>
                      handleSelectChange("transmission", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          originalData?.transmission || "Select transmission"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Status
                    {originalData?.status && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.status})
                      </span>
                    )}
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          originalData?.status || "Select initial status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Drivetrain Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Drivetrain
                    {originalData?.drivetrain && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.drivetrain})
                      </span>
                    )}
                  </label>
                  <Select
                    value={formData.drivetrain}
                    onValueChange={(value) =>
                      handleSelectChange("drivetrain", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          originalData?.drivetrain || "Select drivetrain"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AWD">AWD</SelectItem>
                      <SelectItem value="FWD">FWD</SelectItem>
                      <SelectItem value="RWD">RWD</SelectItem>
                      <SelectItem value="4WD">4WD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Condition
                    {originalData?.condition && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.condition})
                      </span>
                    )}
                  </label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleSelectChange("condition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          originalData?.condition || "Select condition"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brand New">Brand New</SelectItem>
                      <SelectItem value="Foreign Used">Foreign Used</SelectItem>
                      <SelectItem value="Local Used">Local Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Extras Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Extras
                    {originalData?.extras && (
                      <span className="text-gray-500 ml-2">
                        (Current: {originalData.extras})
                      </span>
                    )}
                  </label>
                  <Input
                    name="extras"
                    value={formData.extras}
                    onChange={handleInputChange}
                    placeholder={
                      originalData?.extras ||
                      "e.g., Panoramic Roof, 360 Camera, etc."
                    }
                  />
                </div>

                {/* Repeat similar pattern for other fields */}
                {/* ... Other form fields ... */}

                {/* Current Images Display */}
                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-4">Current Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`relative border rounded-lg overflow-hidden ${
                          selectedImages.includes(imageUrl)
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                      >
                        <Image
                          src={imageUrl}
                          alt={`Car image ${index + 1}`}
                          width={200}
                          height={150}
                          className="object-cover w-full h-40"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageSelect(imageUrl)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                        >
                          {selectedImages.includes(imageUrl) ? (
                            <X className="h-4 w-4 text-red-500" />
                          ) : (
                            <div className="h-4 w-4 border-2 rounded" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Actions */}
                {selectedImages.length > 0 && (
                  <div className="col-span-2">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      Delete Selected Images ({selectedImages.length})
                    </Button>
                  </div>
                )}

                {/* New Image Upload */}
                <div className="col-span-2">
                  <ImageUploader
                    label="Add New Images"
                    name="car-images"
                    onChange={handleImageChange}
                    maxSize={5 * 1024 * 1024}
                    acceptedTypes={["image/jpeg", "image/png"]}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Car"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Image Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedImages.length} selected
              images? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDeletingImage(true);
                handleDeleteSelectedImages();
              }}
            >
              {isDeletingImage ? "Deleting..." : "Delete Images"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Car Updated Successfully!</DialogTitle>
            <DialogDescription>
              The car details have been updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push("/admin/dashboard")}>
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCarPage;
