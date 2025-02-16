import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/lib/mongodb";
import Car from "@/models/car";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  const { make } = req.query;
  if (!make) return res.status(400).json({ message: "Make is required" });

  try {
    await connectMongoDB();
    const models = await Car.distinct("model", { make }); // Get models for the given make

    res.status(200).json(models);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
