// // import express, { Request, Response, NextFunction } from "express";
// import { z, AnyZodObject, string, TypeOf } from "zod";
// import express, { Express, Response, Request, NextFunction} from "express";
// import {createUserHandler} from './controller/user.controller'
// import config from 'config'
// import connect from './utils/connect'
// import logger from './utils/logger'
// import routes from './routes'

// const port: number = config.get<number>('port')


// // import validate from "./middleware/validateResource"
// // import {createUserSchema} from './schema/user.schema'

// const app = express();

// app.use(express.json());

// const createUserSchema = z.object({
//     body: z.object({
//         name: z.string({
//             required_error: 'Name is required'
//         }),
//         password: z.string({
//             required_error: 'Password is required'
//         }).min(6, 'Password should be at least 6 characters'),
//         confirm: z.string({
//             required_error: 'Password confirmation is required'
//         }),
//         email: z.string({
//             required_error: 'Email is required',
//         }).email('Please enter a valid email')
//     }),
//     })
//     .refine((data) => data.password == data.confirm, {
//         message: "Passwords don't match",
//         path: ["confirm"], // path of error
//     })

// export const createUserSchemaa = z.object({
//     name: z.string({
//         required_error: 'Name is required'
//     }),
//     password: z.string({
//         required_error: 'Password is required'
//     }).min(6, 'Password should be at least 6 characters'),
//     confirm: z.string({
//         required_error: 'Password confirmation is required'
//     }),
//     email: z.string({
//         required_error: 'Email is required',
//     }).email('Please enter a valid email')
// })
// .refine((data) => data.password == data.confirm, {
//     message: "Passwords don't match",
//     path: ["confirm"], // path of error
// })

// export type CreateUserInput = Omit<
// TypeOf <typeof createUserSchema>,
// 'body.passwordConfirmation'
// >

// const validate = 
//     (schema: AnyZodObject) => 
//     async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         await schema.parseAsync({
//             body: req.body,
//             query: req.query,
//             params: req.params
//         })
//         return next()
//     }
//     catch(error: any){
//         return res.status(400).send(error.errors)
//     }
// }

// app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

// // Zod is used to check data at runtime. In this case to check if the given information at the server side is correct.
// // app.post('/api/users', createUserHandler)
// app.post("/api/users",
//     validate(createUserSchema), createUserHandler)


// app.listen(port, async () => { 
//     logger.info(`App is running at http://localhost:${port}`)
//     await connect()

//     routes(app)
// })

