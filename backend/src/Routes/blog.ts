import { Hono } from "hono";
import authMiddleware from "../middlewareAuth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { CreateBlogInputs, updateBlogInputs } from "@saidatta64/medium-common";

export const BlogRoutes = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userID : string
    }
}>()

    BlogRoutes.use("/*",authMiddleware);

    BlogRoutes.post("/", async (c)=>{
        try{
            const body : CreateBlogInputs =  await c.req.json();
            const id = c.get("userID")
            const prisma = new PrismaClient({
                datasourceUrl : c.env?.DATABASE_URL,
            }).$extends(withAccelerate())
            const post = await prisma.blog.create({ 
                data: {
                    title: body.title,
                    description: body.description,
                    Authorid : id
                },
            });
            return c.json({
                message:"Blog Created: " + post.id,
            })
        }catch(e){
            c.status(404)
            return c.json({
                message : "Internal Server Error!"
            })
        }
    })
    BlogRoutes.put("/",async (c)=>{
        try{
        const body = await c.req.json();
        const {success} = updateBlogInputs.safeParse(body);
        if(!success){
            c.status(403)
            return c.json({
                message: "Invalid Inputs"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl : c.env?.DATABASE_URL
        }).$extends(withAccelerate())

        const post = await prisma.blog.update({
            where:{
                id : body.id,
                Authorid : body.Authorid
            },
            data:{
                title: body.title,
                description:body.description,
                published:body.published
            }
        })
        return c.json({
            message:"Blog Updated: " + post.id,
        })
        }catch(e){
            c.status(404)
            c.json({
                message : "Invalid Inputs!"
            })
        }
    })
BlogRoutes.get("/bulk",async (c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl : c.env?.DATABASE_URL
        }).$extends(withAccelerate())

        const post = prisma.blog.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                PostedOn :true,
                Authorid : true,
                Author:{
                    select:{
                        username : true
                    },
                },
            },
        });
        return c.json({
            post,
        })
    }catch(e){
        console.log("error: " +e)
        c.status(403)
        return c.json({
            message : "Internal Server Error"
        })
    }
})
BlogRoutes.get("/:id",async (c)=>{
    const id = c.req.param("id");
    try{
        const prisma = new PrismaClient({
            datasourceUrl : c.env?.DATABASE_URL
        }).$extends(withAccelerate())
        const post = prisma.blog.findUnique({
            where:{
                id : id
            },select:{
                id:true,
                title:true,
                description:true,
                PostedOn :true,
                Authorid : true,
                Author:{
                    select:{
                        username : true
                    },
                },
            },
        });
        return c.json({
            post
        })
    }
    catch(e){
        console.log("error" + e);
        c.status(403)
        return c.json({
            message : "Internal Server Error"
        })
    }
})
BlogRoutes.delete("/:id" , async (c)=>{
    try{
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl:c.env?.DATABASE_URL
        }).$extends(withAccelerate())
        const res = prisma.blog.delete({
            where:{
                id : id,
                Authorid : c.get("userID")
            },
        })
        console.log(res);
        return c.json({
            message : "Post deleted Successfully!!",
        })
    }catch (error) {
		console.log("Error: ", error);
		c.status(403);
		return c.json({
			message: "Internal Server Error",
		});
	}
})