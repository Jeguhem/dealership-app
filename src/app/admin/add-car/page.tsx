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
  images: File[];
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
    images: [],
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      console.log("Form Data:", formData);
      // Reset form after successful submission
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
        images: [],
      });
    } catch (err) {
      setError("Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
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
    </div>
  );
};

export default AddCarPage;
