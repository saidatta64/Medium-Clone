import z from "zod";

export const signupInputs = z.object({
    email : z.string().email(),
    password : z.string().min(8),
    username: z.string().optional()
})


export const signinInput = z.object({
    email :z.string().email(),
    password : z.string().min(8),
})

export const updateuserInputs = z.object({
    username : z.string(),
    password : z.string().min(8)
})


export const createBlogInputs = z.object({
    title : z.string(),
    description : z.string()
})


export const updateBlogInputs = z.object({
    title : z.string(),
    content : z.string(),
    id : z.number(),
    published : z.boolean()
})

export type UpdateUserInputs = z.infer<typeof updateuserInputs>
export type SignupInput = z.infer<typeof signupInputs>
export type SigninInput = z.infer<typeof signinInput> 
export type CreateBlogInputs = z.infer<typeof createBlogInputs>
export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>

