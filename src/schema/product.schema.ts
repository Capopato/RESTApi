import {z, TypeOf, object, number, string,} from 'zod'

/**
 * Middleware to check the input of the user with zod.
 */
const payload = ({
    body: z.object({
        title: z.string({
            required_error: 'Title is required'
        }),
        description: z.string({
            required_error: 'Description is required'
        }).min(10, 'Description should be at least 120 characters long'),
        price: z.number({
            required_error: 'Price is required'
        }),
        image: z.string({
            required_error: 'Image is required'
        })
    })
})

// /**
//  * Middleware to check the input of the user with zod.
//  */
const params = ({
    params: z.object({
        productId: z.string({
            required_error: 'productId is required'
        }),

    })
})

// create createProductSchema from the payload. Take everything over.
export const createProductSchema = object({
    ...payload
})

// create updateProductSchema from payload and the params.
export const updateProductSchema = object({
    ...payload,
    ...params
})

// create deleteProductSchema from the params 
export const deleteProductSchema = object({
    ...params
})

// create getProductSchema from the params 
export const getProductSchema = object({
    ...params
})

// Make types from the schema's
export type createProductInput = TypeOf<typeof createProductSchema>
export type updateProductInput = TypeOf<typeof updateProductSchema>
export type deleteProductInput = TypeOf<typeof deleteProductSchema>
export type getProductInput = TypeOf<typeof getProductSchema>