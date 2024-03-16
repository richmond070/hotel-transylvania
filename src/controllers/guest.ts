import { prisma } from '../utils/db.server';
import { Request, Response } from 'express';

// CREATE GUEST 
export const createGuest = async (req: Request, res: Response) => {
    const { id, firstName, lastName, email } = req.body
    try {
        const guest = await prisma.guest.create({
            data: {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                active: false
            },
        });
        res.status(201).json({
            data: guest
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
        })
    }
}

//LIST SINGLE GUEST 
export const listGuest = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const guest = await prisma.guest.findUnique({
            where: {
                id: id
            },
            select: {
                email: true,
                firstName: true,
                lastName: true,

            },
        });
        res.status(200).json({ data: guest })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

//LIST ALL THE GUEST 
export const listAllGuest = async (req: Request, res: Response) => {
    try {
        const guest = await prisma.guest.findMany();
        res.status(200).json({ data: guest })
    }
    catch (error: any) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//UPDATE GUEST INFORMATION
export const updateGuest = async (req: Request, res: Response) => {
    try {
        const { email, id } = req.body
        const guestId = await prisma.guest.findUnique({
            where: {
                id: id
            }
        });

        if (!guestId) {
            return res.status(401).json({
                error: "Guest not found! please check am again"
            })
        }

        const guest = await prisma.guest.update({
            where: {
                id: id
            },
            data: {
                email: email
            }
        });

        res.status(200).json({
            message: "Email updated successfully",
            data: guest,
        })
    } catch (error: any) {
        console.log(error)
        message: "Information wey you dey give no sharp "
        res.status(500).json(error.message)
    }
}