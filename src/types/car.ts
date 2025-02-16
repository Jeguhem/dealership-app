import mongoose from 'mongoose';

export interface ICar extends mongoose.Document {
    // name: string;
      make: string;
      model: string;
      year: number;
      price: number;
      mileage: number;
      fuelType: string;
      transmission: string;
      status: string;
      images: string[];
      condition: string;      // Added field
      drivetrain: string;     // Added field
      extras: string;         // Added field
    }