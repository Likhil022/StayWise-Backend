import { Room } from "../Models/room.model.js";

const getAllRooms = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const rooms = await Room.find({ hotel: hotelId });
    if (!rooms) {
      return res.status(404).json({ message: "No rooms found" });
    }
    res.status(200).json({ rooms });
  } catch (error) {
    console.log("Error getting rooms", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getRoomById = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ message: "No room found" });
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log("Error getting room", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const updateRoomDetails = async (req, res) => {
  const { roomId } = req.params;
  const { roomNumber, roomType, price, isAvailable, ac } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      roomId,
      {
        roomNumber,
        roomType,
        price,
        isAvailable,
        ac,
      },
      { new: true }
    );
    if (!room) {
      return res.status(400).json({ message: "No room found" });
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log("Error updating room", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const blockRoom = async (req, res) => {
  const { roomId } = req.params;
  const { isAvailable } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      roomId,
      { isAvailable },
      { new: true }
    );
    if (!room) {
      return res.status(400).json({ message: "No room found" });
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log("Error blocking room", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "No room found" });
    }
    await room.remove();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log("Error deleting room", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const createRoom = async (req, res) => {
  const { roomNumber, roomType, price, isAvailable, ac, hotel } = req.body;
  try {
    const existingRoom = await Room.findOne({ roomNumber, hotel });
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }
    const newRoom = new Room({
      roomNumber,
      roomType,
      price,
      isAvailable,
      ac,
      hotel,
    });
    await newRoom.save();
    res.status(201).json({ message: "Room created successfully", newRoom });
  } catch (error) {
    console.log("Error creating room", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
