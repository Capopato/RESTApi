import mongoose from "mongoose";
import config from 'config'
import bcrypt from 'bcrypt'

/**
 * Interface of the user that extends mongoose.Document.
 */
export interface userDocument extends mongoose.Document{
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword (candidatePassword: string): Promise<boolean>
}

/**
 * Schema for the user that is the blueprint for the db
 */
const userSchema = new mongoose.Schema<userDocument>(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true}

    },{
        timestamps: true
    }
)

/**
 * Check if the password is changed. If not > next.
 * If password has been changed then encrypt the password using salt.
 */
userSchema.pre<userDocument>('save', async function(next) {
    let user = this as userDocument

    if (!user.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash
    
    return next()
})

/**
 * @param candidatePassword 
 * @returns boolean to check if password match
 */
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as userDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const userModel = mongoose.model<userDocument>('User', userSchema)

export default userModel