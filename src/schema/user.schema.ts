import { z, object, string, TypeOf } from "zod";

/**
 * Middleware to check the input of the user with zod.
 */
 export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        }).min(6, 'Password should be at least 6 characters'),
        passwordConfirmation: z.string({
            required_error: 'Password confirmation is required'
        }),
        email: z.string({
            required_error: 'Email is required',
        }).email('Please enter a valid email')
    })
    .refine((data) => data.password == data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
    })
})

export type CreateUserInput = TypeOf <typeof createUserSchema>
// export type CreateUserInput = Omit<TypeOf <typeof createUserSchema>,'body.passwordConfirmation'>