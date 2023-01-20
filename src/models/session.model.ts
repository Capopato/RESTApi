import mongoose from "mongoose";
import { userDocument } from "./user.model";

/**
 * FILL IN
 */
export interface sessionDocument extends mongoose.Document{
    user: userDocument['_id'],
    valid: Boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date,
}

/**
 * FILL IN
 */
const sessionSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        valid: {type: Boolean, default: true},
        userAgent: {type: String}
    },{
        timestamps: true
    }
)

// type: model<sessionDocument> is very important. Otherwise it session id in session.controller.ts will give an error.
// The dubble mongoose.model means: If the schema does not exist > create it. Otherwise > use it. 
// When || mongoose.model.session is left out it gives a compile error. 
const sessionModel = mongoose.model<sessionDocument>('session', sessionSchema) || mongoose.model.session

export default sessionModel