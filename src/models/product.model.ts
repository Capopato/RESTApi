import mongoose from "mongoose";
import { userDocument } from "./user.model";
import {customAlphabet} from 'nanoid'

const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

/**
 * FILL IN
 */
export interface productDocument extends mongoose.Document{
    // id is the userId who created the product
    user: userDocument['_id'],
    title: string,
    description: string,
    price: number,
    image: string,
    createdAt: Date,
    updatedAt: Date,
}

/**
 * FILL IN
 */
const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () => `product_${nanoId}`
        },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
    },{
        timestamps: true
    }
)

// type: model<sessionDocument> is very important. Otherwise it session id in session.controller.ts will give an error.
// The dubble mongoose.model means: If the schema does not exist > create it. Otherwise > use it. 
// When || mongoose.model.session is left out it gives a compile error. 
const productModel = mongoose.model<productDocument>('Session', productSchema) || mongoose.model.session

export default productModel