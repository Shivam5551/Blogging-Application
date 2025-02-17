import { verify } from "hono/jwt";
import { Hono } from "hono";
import { Bindings } from "../typeBindings";
import { blogCreateSchema, blogUpdateSchema } from "@shivamx88/comman";
import { getPrismaClient } from "../getPrismaClient";

const blogRouter = new Hono<{
    Bindings: Bindings
    Variables: {
        userID: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1]; 

    if (!token) {
        return c.json({ success: false, message: "Unauthorized: No token provided" }, 401);
    }

    try {
        const { id } = await verify(token, c.env.JWT_SECRET);
        if(!id) {
            return c.json({ success: false, message: "Unauthorized"}, 401);
        }
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const user = await prisma.user.findFirst({
            where: { id },
            select: {
                id: true
            }
        })
        if (!user) {
            return c.json({ success: false, message: "Unauthorized: User not found" }, 401);
        }

        c.set("userID", user.id);
        await next();
    } catch (error) {
        return c.json({ success: false, message: "Invalid Token"}, 401)
    }
});

blogRouter.get('/search/:id', async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) {
            return c.json({ success: false, message: "Invalid ID" }, 400);
        }

        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const post = await prisma.post.findFirst({
            where: { id },
            select: {
                id: true,
                published: true,
                publishedOn: true,
                title: true,
                content: true,
                quote: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if(!post?.published){
            return c.json({ success: false, message: "Blog not found" }, 400);
        }
        return c.json({ success: true, message: "Fetched", post }, 200);
    
    } catch (error) {
        return c.json({ success: false, message: "An error occured" }, 400)
    }
    

});

blogRouter.post('/post', async (c) => {
    try {
        const userID = c.get('userID');
        if (!userID) {
            return c.json({ success: false, message: "Unauthorized" }, 401);
        }
        const body = await c.req.json();
        const { success, error } = blogCreateSchema.safeParse(body);
        if(!success) {
            return c.json({ success: false, message: "Invalid inputs", errors: error.format() }, 400)
        }
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const post = await prisma.post.create({
            data: {
                authorID: userID,
                title: body.title,
                content: body.content,
                published: body?.published,
                quote: body?.quote
            }   
        });
        return c.json({ success: true, message: "Blog uploaded", published: post.published, postID: post.id }, 200);
        
    } catch (e) {
        return c.json({ success: false, message: "An error occured" }, 500)
    }
});

blogRouter.put('/update', async (c) => {
    try {
        const userID = c.get("userID");
        if (!userID) {
            return c.json({ success: false, message: "Unauthorized" }, 401);
        }

        const body = await c.req.json();
        const { success, error } = blogUpdateSchema.safeParse(body);
        if(!success) {
            return c.json({ success: false, message: "Invalid inputs", errors: error.format() }, 400)
        }
        const prisma = getPrismaClient(c.env?.DATABASE_URL);

        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorID: userID
            },
            data: {
                title: body?.title,
                content: body?.content,
                published: body?.published,
                quote: body?.quote
            }
        });

        return c.json({ success: true, message: "Update Successful", published: post.published, postID: post.id }, 200);
    }
    catch(e) {
        return c.json({ success: false, message: "Post not found or Unauthorized" }, 400);
    }
})


blogRouter.get('/bulk', async (c) => {

    try {

        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            select: {
                id: true,
                publishedOn: true,
                title: true,
                content: true,
                quote: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ success: true, message: "Fetched", posts: posts }, 200);
    } catch (error) {
        return c.json({ success: false, message: "An error occured" }, 400)
    }
    
});

blogRouter.get('/userblogs', async (c) => {
    try {
        const prisma = getPrismaClient(c.env?.DATABASE_URL);
        const userID = c.get('userID');
        const posts = await prisma.user.findFirst({
            where: {
                id: userID,
            },
            select: {
                posts: true,
                name: true
            }
        })
        return c.json({ success: true, posts: posts?.posts, authorName: posts?.name, message: "Fetched" }, 200);
    }
    catch (e) {
        return c.json({ success: false, message: "An error occured" }, 400)
    }
});

export default blogRouter;