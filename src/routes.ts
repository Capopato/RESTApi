import { Express, Response, Request } from "express";
import {createUserHandler} from './controller/user.controller'
import validate from "./middleware/validateResource"
import {createUserSchema} from './schema/user.schema'
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

    // Zod is used to check data at runtime. In this case to check if the given information at the server side is correct.
    app.post("/api/users", validate(createUserSchema), createUserHandler)
    app.post("/api/sessions", validate(createSessionSchema), createSessionHandler)
    app.get('/api/sessions', requireUser, getUserSessionsHandler)
    app.delete('/api/sessions', requireUser, deleteSessionHandler)

    // Because it uses multiple middleware the middle is put between []
    app.get('/api/products/:productId', validate(getProductSchema), getProductHandler) 
    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler) 
    app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler) 
    app.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler)  
}

export default routes
