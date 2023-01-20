import {Request, Response} from 'express'
import { validatePassword } from '../service/user.service'
import { createSession, findSessions, updateSession } from '../service/session.service'
import { signJwt } from '../utils/jwt.utils'
// import { config } from 'process'
import config from 'config'

/**
 * The handler checks if there is a user and creates a session user the id from the user.
 * When a session is made it also creates the access and refreshtoken and returns these.
 * @returns 
 */
export const createSessionHandler = async (req: Request, res: Response) =>{
    /**
     * Validate users password
     */
    const user = await validatePassword(req.body)
    
    if(!user) {
        return res.status(401).send('Incorrect email or password')
    }

    /**
     * Create a session. This is gonna get the user agent from the req object or an empty string.
     */
    const session = await createSession(user._id, req.get('user-agent') || '')

    /**
     * Create an access token
     * signJwt function receives an object (the user) and the session id.
     * Also the function receives some options (expires in)
     */
    const accesToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accesTokenTtl')} // 15 minutes
    ) 

    // create a refresh token
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('refreshTokenTtl')} // 15 minutes
    ) 

    // return acces & refresh token
    return res.send({accesToken, refreshToken})
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    // user is attached to res.locals.user in the decentralizeUser.ts file. 
    // Now we can get the _id.
    // Without requireUser.ts user is undefined. Thats why the 3th part of middleware is needed.
    const userId = res.locals.user._id

    const sessions = await findSessions({user: userId, valid: true})
    return res.send(sessions)
}

export const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session

    // Update the id to false so that the session can't be used again. Because the session has been updated.
    await updateSession({_id: sessionId}, {valid: false})

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}