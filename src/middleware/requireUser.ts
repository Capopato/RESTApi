import {Request, Response, NextFunction} from 'express'


const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    // This middleware is only used when a user is required so it is safe to send status 403.
    if(!user) {
        return res.sendStatus(403)
    }
    // If the code get here it means there is a user
    return next()
}

export default requireUser