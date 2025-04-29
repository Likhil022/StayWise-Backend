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

export const getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const Hotel = await Hotel.findById(id);
    if (!Hotel) {
      return res
        .status(400)
        .json({ message: `No Hotel available with the ID: {id}` });
    }
    res.status(200).json({ Hotel });
  } catch (error) {
    console.log("Error getting hotel", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getHotelByName = async (req, res) => {
  const { name } = req.params;
  try {
    const hotel = await Hotel.findOne({
      name: { $regex: name, $options: "i" },
    });
    if (!hotel) {
      return res.status(400).json({ message: "No hotel found" });
    }
    res.status(200).json({ hotel });
  } catch (error) {
    console.log("Error getting hotel", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getAllHotelsByLocation = async (req, res) => {
  const { location } = req.params;
  try {
    const hotels = await Hotel.find({ location: location });
    if (hotels.length == 0) {
      return res.status(400).json({ message: "No hotels found" });
    }
    res.status(200).json({ hotels });
  } catch (error) {
    console.log("Error getting hotels", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const addRoomToHotel = async (req, res) => {
  const { hotelId } = req.params;
  const { roomId } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    hotel.rooms.push(roomId);
    await hotel.save();
    res.status(200).json({ message: "Room added to hotel successfully" });
  } catch (error) {
    console.error("Error adding room to hotel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRoomFromHotel = async (req, res) => {
  const { hotelId } = req.params;
  const { roomId } = req.body;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    hotel.rooms = hotel.rooms.filter((room) => room.toString() !== roomId);
    await hotel.save();
    res.status(200).json({ message: "Room deleted from hotel successfully" });
  } catch (error) {
    console.error("Error deleting room from hotel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getHotelRooms = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findById(hotelId).populate("rooms");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ rooms: hotel.rooms });
  } catch (error) {
    console.error("Error getting hotel rooms:", error);
    res.status(500).json({ message: "Server error" });
  }
};
