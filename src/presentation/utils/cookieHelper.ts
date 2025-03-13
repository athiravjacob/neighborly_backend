import { Response } from "express";

export const setRefreshTokenCookie = (res: Response, refreshToken: String): void => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:7 * 24 * 60 * 60 * 1000,
    })
}

export const clearRefreshCookie = (res:Response): void => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })
}