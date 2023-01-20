import {Request, Response, NextFunction} from 'express'
import {get} from 'lodash' // Use the function to get a property when it is uncertain if the property exists.
import { validateJwt } from '../utils/jwt.utils'
import { reissueAccessToken } from '../service/session.service'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    // Get the access token from the headers.authorization in the request.
    // The headers.authorization starts with the word Bearer (that gets access to the system) and we want to replace it with an empty string.
    const accesToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
    // get refreshToken from the headers of the request.
    const refreshToken = get(req, 'headers.x-refresh')?.toString()


    if (!accesToken) {
        return next()
    }
    
    // use the validateJwt to verify the accessToken. 
    const {decoded, expired} = validateJwt(accesToken)

    // If decoded = true. Attach the user to res.locals.user so it can be used in session.controller.ts (to get the user sessions)
    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    // If accesToken is expired but there is a refreshtoken. Reissue the accesstoken using the reissueAccessToken function.
    if (expired && refreshToken) {
        const newAccessToken = await reissueAccessToken({refreshToken})

        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken)
        }

            const result = validateJwt(newAccessToken)
            res.locals.user = result.decoded
            
            return next()
    }

    return next()
}
export default deserializeUser