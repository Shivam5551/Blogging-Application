"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogCreateSchema = exports.blogUpdateSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter valid email address" }),
    password: zod_1.z.string().min(8, { message: "Password must be more than 8 characters" }),
    name: zod_1.z.string().optional(),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter valid email address" }),
    password: zod_1.z.string().min(8, { message: "Password must be more than 8 characters" })
});
exports.blogUpdateSchema = zod_1.z.object({
    id: zod_1.z.number({ message: "Id required" }),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
});
exports.blogCreateSchema = zod_1.z.object({
    title: zod_1.z.string({ message: "Title required" }),
    content: zod_1.z.string({ message: "Content required" }),
    published: zod_1.z.boolean().optional(),
});
