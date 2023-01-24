import {Request, Response, NextFunction} from 'express'
import {AnyZodObject} from 'zod'

/**
 * @param schema Zod is used to check data at runtime. In this case to check if the given information at the
 * server side is correct.
 * @returns 
 */
const validate = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
    try{
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    }
    catch(error){
        return res.status(400).send(error.errors)
    }
}

export default validate