import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get<String>('privateKey')
const publicKey = config.get<String>('publicKey')

/**
 * The session will be signed using jwt. It receives and object (the session) and it will be signed using the private key
 * @returns the object signed with privateKey as string (as string is added because TS was complaining about type secret can't be a string)
 * (options && options) is to verify that it is not undefined
 */
export const signJwt = (object: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey as string, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

/**
 * Function receives a token as string.
 * Use of try/catch block. Try to validate the private key with the public key.
 * If not a match > return some params (valed, expired, decoded.)
 */
export const validateJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey as string)
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    }catch(error: any) {
        return {
            valid: false,
            expired: error.message == 'jwt expired',
            decoded: null
        }
    }
}