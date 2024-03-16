import { prisma } from '../utils/db.server';
import { Request, Response } from 'express';

// CREATE ROOM INDIVIDUALLY
export const createRoom = async (req: Request, res: Response) => {
    const { id, roomType, status, rate } = req.body
    try {
        const room = await prisma.room.create({
            data: {
                roomId: id,
                roomType: roomType,
                status: status,
                rate: rate
            },
        });
        res.status(201).json({
            data: room
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
        })
    }
}

//CREATE ROOMS IN BULK 
export const createRooms = async (req: Request, res: Response) => {
    const { id, roomType, status, rate } = req.body
    try {
        const { presidential, standard, regular, penthouse } = roomType;

        if (!presidential || !standard || !regular || !penthouse) {
            return res.status(401).json({
                error: "Room type cannot exist!!"
            })
        }

        const room = await prisma.room.createMany({
            data: {
                roomId: id,
                roomType: roomType,
                status: status,
                rate: rate
            },
        });
        res.status(201).json({
            data: room
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
        })
    }
}

//LIST SINGLE ROOM
export const listRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const room = await prisma.room.findUnique({
            where: {
                roomId: id
            },
            select: {
                roomType: true,
                rate: true,
                status: true
            },
        });
        res.status(200).json({ data: room })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

//LIST ALL THE Rooms
export const listRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await prisma.room.findMany();
        res.status(200).json({ data: rooms })
    }
    catch (error: any) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//UPDATE ROOM INFORMATION
export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { rate, id, status } = req.body
        const guestId = await prisma.room.findUnique({
            where: {
                roomId: id
            }
        });

        if (!guestId) {
            return res.status(401).json({
                error: "Room not found! please check am again"
            })
        }

        const guest = await prisma.room.update({
            where: {
                roomId: id
            },
            data: {
                rate: rate,
                status: status
            }
        });

        res.status(200).json({
            message: "Room updated successfully",
            data: guest,
        })
    } catch (error: any) {
        console.log(error)
        message: "Information wey you dey give no sharp "
        res.status(500).json(error.message)
    }
}

//update as many rooms as possible
export const updateRooms = async (req: Request, res: Response) => {
    try {
        const { rate, id, status } = req.body

        const guestId = await prisma.room.findUnique({
            where: {
                roomId: id
            }
        });

        if (!guestId) {
            return res.status(401).json({
                error: "Room not found! please check am again"
            })
        }

        const guest = await prisma.room.updateMany({
            where: {
                roomId: id
            },
            data: {
                rate: rate,
                status: status
            }
        });

        res.status(200).json({
            message: "Room updated successfully",
            data: guest,
        })
    } catch (error: any) {
        console.log(error)
        message: "Information wey you dey give no sharp "
        res.status(500).json(error.message)
    }
}

//delete room 
export const deleteRoom = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const room = await prisma.room.delete({
            where: {
                roomId: id
            }
        });

        res.status(204).json({
            message: "Room has been removed from list ",
            data: null
        })
    } catch (error: any) {
        console.log(error)
        message: "Problem dey oh! This room no wan clear "
        res.status(500).json(error.message)
    }
}

// remove rooms in bulk from list 
export const deleteRooms = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const room = await prisma.room.deleteMany({
            where: {
                roomId: id
            }
        });

        res.status(204).json({
            message: "Rooms have been removed from list ",
            data: null
        })
    } catch (error: any) {
        console.log(error)
        message: "Problem dey oh! This rooms no wan clear "
        res.status(500).json(error.message)
    }
}