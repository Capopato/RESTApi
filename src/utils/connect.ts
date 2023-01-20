import mongoose from "mongoose";
import config from 'config'
import logger from './logger'

/**
 * Function that use try/catch to connect to mongodb with mongoose.
 * Function is exported as default.
 */
const connect = async () => {
    const dbUri = config.get<string>('dbUri')
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(dbUri)
        logger.info('db connected')
    } catch(error) {
        logger.error(error)
        logger.error('Could not connect to db')
        process.exit(1)
    }
}

export default connect