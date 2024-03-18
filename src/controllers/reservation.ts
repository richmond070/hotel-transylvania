import { Guest } from '@prisma/client';
import { prisma } from '../utils/db.server';
import { Request, Response } from 'express';

// create a reservation 
export const reservation = async (req: Request, res: Response) => {
    const { id, guestId, roomId, checkIn, checkOut, amount, status } = req.body

    try {
        const reservation = prisma.reservation.create({
            data: {
                reservationID: id,
                guestId: guestId,
                roomNumber: roomId,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                totalAmount: amount,
                reservationStatus: status
            }
        })
        res.status(201).json({
            message: "Reservation has been made, cannot wait to have you!!",
            data: reservation
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

//list reservations made by a single guest 
export async function listReservation(req: Request, res: Response) {
    const { firstName, lastName } = req.body
    try {
        let guestId: number | undefined

        // Concatenate first name and last name
        const fullName = `${firstName} ${lastName}`;


        //search for the guest based on their firstName, lastName or email
        const guest: Guest | null = await prisma.guest.findFirst({
            where: {
                fullName: fullName
            }
        });

        //if any of the details is provided 
        if (guest) {
            guestId = guest.id;

            // find reservations made by the guest using guestId
            const reservation = await prisma.reservation.findMany({
                where: {
                    guestId
                }
            });

            res.json(reservation);
        } else {
            res.status(404).json({ message: "Guest not found" });
        }
    } catch (error) {
        console.error("Error retrieving reservation:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

// search all the reservations made in the hotel 
export async function listReservations(req: Request, res: Response) {
    try {
        const reservation = await prisma.reservation.findMany();
        res.status(200).json({ data: reservation })
    }
    catch (error: any) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

// update the reservation made by a guest. only a staff can make this changes 
export async function updateReservation(req: Request, res: Response) {
    const { firstName, lastName, checkInDate, checkOutDate, reservationStatus } = req.body

    try {
        const guest = await prisma.guest.findFirst({
            where: {
                fullName: `${firstName} ${lastName}`
            }
        });

        if (!guest) {
            return res.status(400).json({ message: "Guest does not exist" })
        }

        // check if guest has any reservations made 
        const reservation = await prisma.reservation.findMany({
            where: {
                guestId: guest.id
            }
        });

        if (reservation.length === 0) {
            return res.status(404).json({ message: "Guest has no reservations" });
        };

        // Update the first reservation found (assuming only one reservation per guest for simplicity)
        const reservationToUpdate = reservation[0];
        const updatedReservation = await prisma.reservation.update({
            where: {
                reservationID: reservationToUpdate.reservationID
            },
            data: {
                checkInDate: checkInDate || reservationToUpdate.checkInDate,
                checkOutDate: checkOutDate || reservationToUpdate.checkOutDate,
                reservationStatus: reservationStatus || reservationToUpdate.reservationStatus
            }
        });

        res.json(updatedReservation);
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

// delete a reservation made by a guest 
export async function deleteReservation(req: Request, res: Response) {
    const { reservationID } = req.body
    try {
        const reservation = await prisma.reservation.delete({
            where: {
                reservationID: reservationID
            }
        });

        res.status(204).json({
            message: "Reservation has been canceled ",
            data: null
        })
    } catch (error: any) {
        console.log(error)
        message: "Problem dey oh! Be like say we too like you for here but wait first "
        res.status(500).json(error.message)
    }
}