import { prisma } from '../utils/db.server';
import { Request, Response } from 'express';


// Create staff
export const createStaff = async (req: Request, res: Response) => {
    const { id, fullName, userName, position } = req.body
    try {
        const staff = await prisma.staff.create({
            data: {
                staffId: id,
                fullName: fullName,
                userName: userName,
                position: position
            }
        });
        res.status(201).json({
            data: staff,
            message: "Staff has been added"
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
        })
    }
}

// list single staff 
export const listStaff = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const staff = await prisma.staff.findUnique({
            where: {
                staffId: id
            },
            select: {
                position: true,
                fullName: true,
                staffId: true
            },
        });
        res.status(200).json({ data: staff })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

//find all staff 
export const list_staff = async (req: Request, res: Response) => {
    try {
        const staff = await prisma.staff.findMany();
        res.status(200).json({ data: staff })
    }
    catch (error: any) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

// update a staff position 
export const updateStaff = async (req: Request, res: Response) => {
    const { id, position } = req.body
    let { General_manager, Front_desk, House_keeping } = position
    try {
        const verifyStaff = await prisma.staff.findUnique({
            where: {
                staffId: id
            }
        });

        if (!verifyStaff) {
            return res.status(401).json({
                error: "Room not found! please check am again"
            })
        }

        const staff = await prisma.staff.update({
            where: {
                staffId: id
            },
            data: {
                position: position
            }
        })

        if (!General_manager || !Front_desk || !House_keeping) {
            return res.status(401).json({
                error: "no such position exist in this database!"
            })
        }

        res.status(200).json({
            data: staff,
            message: "Staff position update successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
        })
    }
}

// delete a staff records 
export const deleteStaff = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const room = await prisma.staff.delete({
            where: {
                staffId: id
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