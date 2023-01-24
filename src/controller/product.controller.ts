import {Request, Response} from 'express'
import { createProductInput, updateProductInput, getProductInput, deleteProductInput } from '../schema/product.schema'
import { createProduct, deleteProduct, findProduct, updateProduct } from '../service/product.service'

// request got no params, no response body and only the body of createProductInput
export const createProductHandler = async (req: Request<{}, {}, createProductInput['body']>, res: Response) => {
    try{
        const userId = res.locals.user._id
        const body = req.body
    
        // Spread the body
        const product = await createProduct({...body, user: userId})
    
        return res.send(product)
    }
    catch(error) {
        return res.sendStatus(400).send('Invalid product')
    }
}

// request got params from the updateProductInput
export const updateProductHandler = async (req: Request<updateProductInput['params']>, res: Response) => {
    try{
        const userId = res.locals.user._id
        const productId = req.params.productId
        
        // update is the body of the request
        const update = req.body
        const product = await findProduct({productId})
    
        // If there is no product return 404 status
        if(!product){
            return res.sendStatus(404)
        }
    
        // If the user that tries to update the product is not the user that created the product. Return 403.
        if(product.user != userId){
            return res.sendStatus(403)
        }
    
        const updatedProduct = await updateProduct({productId}, update, {new: true})
    
        return res.send(updatedProduct)
    }
    catch(error) {
        res.sendStatus(400).send('Update invalid')
    }
}

export const getProductHandler = async (req: Request<getProductInput['params']>, res: Response) => {
    try{
        const productId = req.params.productId
        const product = await findProduct({productId})

        // If there is no product return 404 status
        if(!product){
            return res.sendStatus(404)
        }

        return res.send(product)
    }
    catch(error) {
        res.sendStatus(400).send('Get request invalid')
    }
}

export const deleteProductHandler = async (req: Request<deleteProductInput['params']>, res: Response) => {
    try{
        const userId = res.locals.user._id
        const productId = req.params.productId
        const product = await findProduct({productId})
    
        // If there is no product return 404 status
        if(!product){
            return res.sendStatus(404)
        }
    
        // If the user that tries to update the product is not the user that created the product. Return 403.
        if(String(product.user) != userId){
            return res.sendStatus(403)
        }
    
        await deleteProduct({productId})
    
        return res.sendStatus(200)
    }
    catch(error) {
        res.sendStatus(400).send('Delete invalid')
    }
}