import {Request, Response} from 'express'
import {omit} from 'lodash'
import {createUser} from '../service/user.service'
import logger from '../utils/logger'
import { CreateUserInput } from '../schema/user.schema'

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput["body"]>, 
    res: Response
    ) => {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), 'password'))
    } 
    catch(e) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}