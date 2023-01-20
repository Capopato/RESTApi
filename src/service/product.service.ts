import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import productModel, { productDocument } from "../models/product.model"

/**
 * 
 * @param input input is the productdocument but with the createdAt and updatedAt value omitted because there are created on it self.
 * @returns 
 */
export const createProduct = async (input: DocumentDefinition<Omit<productDocument, 'createdAt' | 'updatedAt'>>) => {
    // .create() = type from mongoose
    return productModel.create(input)
}

/**
 * find product with the query and set lean to true so that only the matched values are returned instead of the whole query.
 */
export const findProduct = async (query: FilterQuery<productDocument>, options: QueryOptions = {lean: true}) => {
    return productModel.findOne(query, {}, options)
}

/**
 * Find the query and update it with UpdateQuery.
 */
export const updateProduct = async (query: FilterQuery<productDocument>, update: UpdateQuery<productDocument>, options: QueryOptions) => {
    return productModel.findOne(query, update, options)   
}

/**
 * Find the query and delete it with the query.
 */
export const deleteProduct = async (query: FilterQuery<productDocument> ) => {
    return productModel.deleteOne(query)
}