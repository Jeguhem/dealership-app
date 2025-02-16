import mongoose from 'mongoose';

export interface ICar extends mongoose.Document {
    // name: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
    transmission: "Manual" | "Automatic";
    status: "New" | "Sold" | "Available";
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }