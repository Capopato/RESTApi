import {DocumentDefinition, FilterQuery} from 'mongoose'
import userModel, {userDocument} from '../models/user.model'
import { omit } from 'lodash'

/**
 * See doc user.models.ts > interface. The values that will not be filled in by the user needs to be omitted.
 * @param input 
 * @returns 
 */

export const createUser = async (input: DocumentDefinition<Omit<userDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        const user =  await userModel.create(input)
        // return omit(user.toJSON(), 'password')
        return user
    }
    catch(e: any) {
        throw new Error(e)
    }
}

export const validatePassword = async ({email, password}:{email: string, password: string}) => {
    const user = await userModel.findOne({email})

    if (!user) {
        return false
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) return false

    return omit(user.toJSON(), 'password')
}   

/**
 * @param query Filter query to select the documents that match the query
 * @returns returms the query that matches the userModel.
 * .lean() to only returns the matches and not the whole query.
 */
export const findUser = async (query: FilterQuery<userDocument>) => {
    return userModel.findOne(query).lean()
}
