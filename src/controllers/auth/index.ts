import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { db } from "../../app";
import { errorsInputs, errorsServer, errorsUnauthorized } from "../../helpers/error";
import { earnTurns } from "../../cron-jobs/earn-turns";

export const registerUser = async (req: Request, res: Response) => {
    const {
        email,
        name,
        password
    } = req.body;

    if (name === '') {
        return res.status(400).json({
            success: false,
            message: errorsInputs.name
        })
    } else if (email === '') {
        return res.status(400).json({
            success: false,
            message: errorsInputs.name
        })
    } else if (password === '') {
        return res.status(400).json({
            success: false,
            message: errorsInputs.password
        })
    } else {
        const salt = genSaltSync(10);
        try {
            const existUser = await db.collection('users').where('email', '==', email).get()

            if (existUser.docs.length === 0) {
                const objUser = {
                    name,
                    email,
                    turns: 5,
                }
                const jsontoken = sign({ result: objUser }, `${process.env.SECRET}`, {
                    expiresIn: "1h",
                });

                const { id } = await db.collection('users').add({
                    name,
                    email,
                    password: hashSync(password, salt),
                    turns: 5
                })

                return res.json({
                    success: true,
                    data: {
                        id,
                        name,
                        email,
                        turns: 5
                    },
                    token: jsontoken
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

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (email === "") {
        return res.status(400).json({
            success: false,
            message: errorsInputs.email
        });
    } else {
        if (password === "") {
            return res.status(400).json({
                success: false,
                message: errorsInputs.password
            });
        }
    }

    const user = await db.collection('users').where('email', '==', email).get()

    try {
        if (user.docs.length !== 0) {
            const parseUser: FirebaseFirestore.DocumentData = user.docs[0].data();
            const documentID: string = user.docs[0].id;

            const result = compareSync(password, parseUser.password);

            if (result) {
                parseUser.password = '';
                parseUser.id = documentID;
                const jsontoken = sign({ result: parseUser }, `${process.env.SECRET}`, {
                    expiresIn: "1h",
                });

                earnTurns(parseUser, true)

                return res.json({
                    success: true,
                    data: {
                        id: parseUser.id,
                        name: parseUser.name,
                        email: parseUser.email,
                        turns: parseUser.turns
                    },
                    token: jsontoken,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: errorsInputs.credentials
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: errorsInputs.credentials
            });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: errorsServer.server
        })
    }
}

export const logout = async (req: Request, res: Response) => {

    earnTurns({}, false)


    return res.json({
        success: true
    });

}