



import { ICar } from "@/types/car";
import mongoose, { Schema, Model } from "mongoose";


// Car Schema
const CarSchema: Schema = new Schema(
    {
      make: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      price: { type: Number, required: true },
      mileage: { type: Number, required: true },
      fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true },
      transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
      status: { type: String, enum: ["New", "Sold", "Available"], default: "Available" },
      images: {
        type: [{ type: String }],
        validate: {
          validator: (images: string[]) => images.length <= 20,
          message: "A car can have a maximum of 20 images.",
        },
      },
      condition: {
        type: String,
        required: true
      },
      drivetrain: {
        type: String,
        enum: ["4WD", "AWD", "FWD", "RWD"],
        required: true
      },
      extras: {
        type: String,
        required: false  // Optional field
      }
    },
    { timestamps: true }
  );

// Export model properly
const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);
export default Car;
