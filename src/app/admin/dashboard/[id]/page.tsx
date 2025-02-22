"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const AdminProductDetailsPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // const {
  //   data: car,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["car", id],
  //   queryFn: async () => {
  //     if (!id) throw new Error("Invalid car ID");
  //     const response = await fetch(`/api/cars/${id}`);
  //     if (!response.ok) throw new Error("Failed to fetch car details");
  //     return response.json();
  //   },
  // });

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      if (!id) throw new Error("Invalid car ID");
      const response = await fetch(`/api/cars/${id}`);
      if (!response.ok) throw new Error("Failed to fetch car details");
      return response.json();
    },
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true, // Ensures it refetches when the component mounts
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // First, delete images from Cloudinary
      for (const imageUrl of car.images) {
        // Extract public_id from the Cloudinary URL
        const urlParts = imageUrl.split("/");
        const publicId = urlParts[urlParts.length - 1].split(".")[0];

        await fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: publicId }),
        });
      }

      // Then delete the car from the database
      const response = await fetch(`/api/cars/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: car._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      // Redirect to admin dashboard or listing page
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error deleting car:", error);
      // You might want to show an error toast here
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/edit/${id}`);
  };

  // Loading and error states remain the same as the original component
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading car details: {error.message}
      </div>
    );
  }

  if (!car) {
    return <div className="text-center">Car not found</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Admin Header with Actions */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Admin: {car.make} {car.model} {car.year}
          </h1>
          <div className="flex gap-3">
            <Button
              onClick={handleEdit}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button
              onClick={() => setIsDeleteDialogOpen(true)}
              variant="destructive"
              className="flex items-center gap-2"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-4">
        {/* Image Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? car.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === car.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-6 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Details */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries({
                Make: car.make,
                Model: car.model,
                Year: car.year,
                Price: `₦${car.price.toLocaleString()}`,
                Mileage: `${car.mileage.toLocaleString()} km`,
                "Fuel Type": car.fuelType,
                Transmission: car.transmission,
                Condition: car.condition,
                Drivetrain: car.drivetrain,
                Status: car.status,
                Extras: car.extras,
              }).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <div className="text-sm text-gray-500">{key}</div>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              vehicle listing and all associated images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProductDetailsPage;
