import config from 'config'
import { FilterQuery, UpdateQuery } from 'mongoose';
import sessionModel, {sessionDocument} from '../models/session.model'
import { verify } from 'crypto';
import { validateJwt, signJwt } from '../utils/jwt.utils';
import {get} from 'lodash'
import { findUser } from './user.service';


// export const createSession = async (userId: string, userAgent: string) => {
//     const session = await sessionModel.create({user: userId, userAgent})

//     return session.toJSON()
// }

// export async function createSession(userId: string, userAgent: string) {
export const  createSession = async (userId: string, userAgent: string) => {
    const session = await sessionModel.create({ user: userId, userAgent });
  
    return session.toJSON();
  }

/**
 * Query so we can find the sessions
 * Pass in the sessionDocument so the data from session is passed.
 */
export const findSessions = async (query: FilterQuery<sessionDocument>) => {
    return sessionModel.find(query).lean()
}


/**
 * Query so we can find the session that needs to be updated.
 * Pass in the sessionDocument so the data from session is passed.
 * Pass in update as well wil the UpdateQuery to update the session
 */
export const updateSession = (query: FilterQuery<sessionDocument>, update: UpdateQuery<sessionDocument>) => {
    return sessionModel.updateOne(query, update)
}

/**
 * Function to reissue the accesstoken when it is expired.
 */
export const reissueAccessToken = async ({refreshToken}:{refreshToken: string}) => {
// export async function reissueAccessToken({refreshToken,}: {refreshToken: string;})  {
    const {decoded} = validateJwt(refreshToken)

    // If it is not decoded or the session is not valid. Return false
    if (!decoded || !get(decoded, 'session')) return  ""

    const session = await sessionModel.findById(get(decoded, 'session'))

    // If there is no session or if valid = false. Return false
    if(!session || !session.valid) return  ""

    // use the findUser function to find the session through the id.
    const user = findUser({_id: session.user})

    if(!user) return  ""

    const accesToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accesTokenTtl')} // 15 minutes
    ) 

    return accesToken
}