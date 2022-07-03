import { Request, Response } from "express";
import { errorsInputs, errorsServer, errorsUnauthorized } from "../../helpers/error";
import { db } from "../../app";

export const getInfoUser = async (req: Request, res: Response) => {
    const {
        id
    } = req.params;

    if (id === '') {
        return res.status(400).json({
            success: false,
            message: errorsInputs.id
        })
    } else {
        try {
            const existUser = await db.collection('users').doc(id).get()

            if (existUser.data()) {
                const parseUser = existUser.data()
                const objUser = {
                    id,
                    name: parseUser?.name,
                    email: parseUser?.email,
                    turns: parseUser?.turns,
                }
                return res.json({
                    success: true,
                    data: objUser
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: errorsUnauthorized.unauthorized
                })
            }
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: errorsServer.server
            })
        }
    }

}

export const updateTurns = async (req: Request, res: Response) => {
    const {
        id
    } = req.params;

    if (id === '') {
        return res.status(400).json({
            success: false,
            message: errorsInputs.id
        })
    } else {
        try {
            const existUser = await db.collection('users').doc(id).get()

            if (existUser.data()) {
                const parseUser = existUser.data()
                const objUser = {
                    id,
                    name: parseUser?.name,
                    email: parseUser?.email,
                    turns: parseUser?.turns - 1,
                }
                await db.collection('users').doc(id).update(objUser);
                return res.json({
                    success: true,
                    data: objUser
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: errorsUnauthorized.unauthorized
                })
            }
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: errorsServer.server
            })
        }
    }

}

export const claimRewards = async (req: Request, res: Response) => {
    const {
        id,
        qty
    } = req.params;

    if (id === '') {
        return res.status(400).json({
            success: false,
            message: errorsInputs.id
        })
    } else {
        try {
            const existUser = await db.collection('users').doc(id).get()

            if (existUser.data()) {
                const parseUser = existUser.data()
                const objUser = {
                    id,
                    name: parseUser?.name,
                    email: parseUser?.email,
                    turns: parseUser?.turns + parseInt(qty),
                }
                await db.collection('users').doc(id).update(objUser);
                return res.json({
                    success: true,
                    data: objUser
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: errorsUnauthorized.unauthorized
                })
            }
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: errorsServer.server
            })
        }
    }

}