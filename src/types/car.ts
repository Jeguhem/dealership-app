import { Document } from "mongoose";

export interface ICar extends Omit<Document, "_id" | "__v"> {
  make: string;
  carModel: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  status: string;
  images: string[];
  condition: string;
  drivetrain: string;
  extras: string;
}
