import { Hotel } from "../Models/hotel.js";

export const createHotel = async (req, res) => {
  const { name, location, description, rating, amenities, rooms } = req.body;
  try {
    const newHotel = new Hotel({
      name,
      location,
      description,
      rating,
      amenities,
      rooms,
    });

    await newHotel.save();
    res.status(201).json({
      message: "Hotel created successfully",
      hotel: newHotel,
    });
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, location, price, description } = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { name, location, price, description },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHotel = await Hotel.findById(id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    await deletedHotel.remove();
    res.status(200).json({
      message: "Hotel deleted successfully",
      hotel: deletedHotel,
    });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (hotels.length == 0) {
      res.status(400).json({ message: "No hotels found" });
    }
    res.status(200).json({ hotels });
  } catch (error) {
    console.log("Error getting hotels", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
