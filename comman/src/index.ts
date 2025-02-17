import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email({ message: "Enter valid email address"}),
    password: z.string().min(8, {message: "Password must be more than 8 characters"}),
    name: z.string().optional(),
})

export const signinSchema = z.object({
    email: z.string().email({ message: "Enter valid email address"}),
    password: z.string().min(8, {message: "Password must be more than 8 characters"})
});

export const blogUpdateSchema = z.object({
    id: z.number({ message: "Id required"}),
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
});

export const blogCreateSchema = z.object({
    title: z.string({ message: "Title required"}),
    content: z.string({ message: "Content required"}),
    published: z.boolean().optional(),
});


export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
export type blogUpdateInput = z.infer<typeof blogUpdateSchema>
export type blogCreateInput = z.infer<typeof blogCreateSchema>



