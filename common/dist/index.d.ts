import z from "zod";
export declare const signupInputs: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    username?: string | undefined;
}, {
    email: string;
    password: string;
    username?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const updateuserInputs: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    username: string;
}, {
    password: string;
    username: string;
}>;
export declare const createBlogInputs: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export declare const updateBlogInputs: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodNumber;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
    published: boolean;
}, {
    title: string;
    content: string;
    id: number;
    published: boolean;
}>;
export type UpdateUserInputs = z.infer<typeof updateuserInputs>;
export type SignupInput = z.infer<typeof signupInputs>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInputs = z.infer<typeof createBlogInputs>;
export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>;
