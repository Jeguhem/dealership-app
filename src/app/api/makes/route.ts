import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    await connectMongoDB();
    const makes = await Car.distinct("make"); // Get unique makes

    res.status(200).json(makes);
  } catch (error) {
    console.error("Error fetching makes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
