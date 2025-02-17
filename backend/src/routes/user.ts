import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { Bindings } from "../typeBindings";
import { signinSchema, signupSchema } from "@shivamx88/comman";
import { getPrismaClient } from "../getPrismaClient";
import { hashSync, compareSync } from 'bcrypt-edge';

const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post('/signup', async (c) => {
    const start = Date.now();
    
    try {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const body = await c.req.json();

        const { success, error } = signupSchema.safeParse(body);
        if (!success) {
            return c.json({ success: false, message: "Invalid inputs", errors: error.format() }, 400);
        }

        const hashedPassword = hashSync(body.password, 8);
        
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body?.name
            },
            select: { id: true }
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        const timeTaken = Date.now() - start;
        return c.json({ success: true, message: 'User created', userID: user.id, timeTaken, token });
    } catch (error) {
        return c.json({ success: false, message: "User Already exists" }, 400);
    }
});

userRouter.post('/signin', async (c) => {
    const start = Date.now();
    
    try {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const body = await c.req.json();
        console.log(body);
        const { success, error } = signinSchema.safeParse(body);
        if (!success) {
            return c.json({ success: false, message: "Invalid inputs", errors: error.format() }, 400);
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email },
            select: { id: true, password: true }
        });

        const timeTaken = Date.now() - start;

        if (!user) {
            return c.json({ success: false, message: "User not found" }, 404);
        }

        const isValidPassword = compareSync(body.password, user.password);
        if (!isValidPassword) {
            return c.json({ success: false, message: "Invalid Credentials" }, 401);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ success: true, message: "User logged in", userID: user.id, timeTaken, token });
    } catch (error) {
        console.error("Signin Error:", error);
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
});

userRouter.get('/details', async (c) => {
    try {
        const authHeader = c.req.header('Authorization');
        const token = authHeader?.split(" ")[1]; 

        if (!token) {
            return c.json({ success: false, message: "Unauthorized: No token provided" }, 401);
        }

        const { id } = await verify(token, c.env?.JWT_SECRET);
        if(!id) {
            throw new Error("Unauthorized");
        }
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const user = await prisma.user.findFirst({
            where: {
                id
            },
            select: {
                name: true,
                email: true,
            }
        });
        if (!user) {
            return c.json({ success: false, message: "Unauthorized: User not found" }, 401);
        }

        return c.json({ success: true, message: "Fetched user Details", username: user?.name, emailID: user?.email }, 200);
        
    } catch (e) {
        return c.json({ success: false, message: "Unauthorized"}, 401);
    }
})

export default userRouter;
