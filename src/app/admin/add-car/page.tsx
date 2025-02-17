"use client";
import React, { useState } from "react";
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
import { AlertCircle } from "lucide-react";
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
import { useRouter } from "next/navigation";

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

const AddCarPage: React.FC = () => {
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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const router = useRouter(); // Router for navigation

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images first
      const uploadedUrls = await uploadImagesToCloudinary(selectedFiles);
      const updatedFormData = { ...formData, images: uploadedUrls };

      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) throw new Error("Failed to add car");

      // Open the modal on success
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to add car. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnotherCar = () => {
    // Clear the form and close the modal
    setFormData({
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
    setSelectedFiles([]);
    setIsModalOpen(false);
  };

  const handleGoToDashboard = () => {
    // Redirect to the dashboard
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Car</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Existing Fields */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Make</label>
                  <Input
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    placeholder="e.g., Toyota"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Model</label>
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., Camry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <Input
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2022"
                    min="1900"
                    max="2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (₦)</label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 15000000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mileage</label>
                  <Input
                    name="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="e.g., 20000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fuel Type</label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value) =>
                      handleSelectChange("fuelType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Transmission</label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) =>
                      handleSelectChange("transmission", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select initial status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* New Fields */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Drivetrain</label>
                  <Select
                    value={formData.drivetrain}
                    onValueChange={(value) =>
                      handleSelectChange("drivetrain", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drivetrain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AWD">AWD</SelectItem>
                      <SelectItem value="FWD">FWD</SelectItem>
                      <SelectItem value="RWD">RWD</SelectItem>
                      <SelectItem value="4WD">4WD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Condition</label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleSelectChange("condition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brand New">Brand New</SelectItem>
                      <SelectItem value="Foreign Used">Foreign Used</SelectItem>
                      <SelectItem value="Local Used">Local Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Extras</label>
                  <Input
                    name="extras"
                    value={formData.extras}
                    onChange={handleInputChange}
                    placeholder="e.g., Panoramic Roof, 360 Camera, etc."
                  />
                </div>
              </div>

              {/* Image Uploader */}
              <div className="space-y-2">
                <ImageUploader
                  label="Car Images"
                  name="car-images"
                  onChange={handleImageChange}
                  maxSize={5 * 1024 * 1024} // 5MB
                  acceptedTypes={["image/jpeg", "image/png"]}
                />
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Car..." : "Add Car"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Car Added Successfully!</DialogTitle>
            <DialogDescription>
              What would you like to do next?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleAddAnotherCar}>Add Another Car</Button>
            <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCarPage;
