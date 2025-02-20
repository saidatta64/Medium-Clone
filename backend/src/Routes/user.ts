import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import {withAccelerate } from "@prisma/extension-accelerate";
import { SigninInput, signinInput, SignupInput, signupInputs, updateuserInputs } from "@saidatta64/medium-common";
import { sign } from "hono/jwt";
import authMiddleware from "../middlewareAuth";

export const UserRoutes = new Hono<{
Bindings :{
    DATABASE_URL : string,
    JWT_SECRET : string
    },
Variables : {
    userID : string
    }
}>();

    UserRoutes.post("/signup", async (c)=>{
        try{
            const body : SignupInput = await c.req.json();
            const {success} = signupInputs.safeParse(body);
            if(!success){
                c.status(411)
                return  c.json({
                    message:"Invalid Inputs!!"
                })
            }
            const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const Finduser = await prisma.user.findUnique({
            where:{
                email : body.email,
            }
        })
        if(Finduser){
            c.status(411)
            return c.json({
                message:"User with this email already exists try Logging-in"
            });
        }
        console.log(Finduser);
        const user = await prisma.user.create({
            data:{
                email: body.email,
                password : body.password,
                username : body.username
            }
        })
        const jwtoken = await sign({id : user.id},c.env.JWT_SECRET);
        return c.json({
            jwt : `Bearer ${jwtoken}`
        })
    }catch(e){
        c.status(403)
        console.log(e,"Error")
       return c.json({
            message : "Error while Signing-up"
        })
    }
});

    UserRoutes.post("/signin", async (c)=>{ //login
        try{
            const body : SigninInput = await c.req.json();
            const prisma = new PrismaClient({
                datasourceUrl : c.env?.DATABASE_URL
            }).$extends(withAccelerate())
            const {success} = signinInput.safeParse(body);
            if(!success){
                c.status(403)
                return c.json({
                    message: "Invalid Inputs"
                })
            }
            const user = await prisma.user.findFirst({
                where:{
                    email : body.email,
                    password : body.password
                }
            })
            if(!user){
                c.status(403)
                return c.json({
                    message : "Unauthorized"
                })
            }
            const jwtoken = await sign({id : user.id},c.env.JWT_SECRET);
            return c.json({
                jwt : `Bearer ${jwtoken}`
            })
        }catch(e){
            c.status(403)
            return c.json({
                message : "Error while Signing-In"
            })
        }
    })

    UserRoutes.put("/update",authMiddleware, async(c)=>{
          const body = await c.req.json();

          const {success} = updateuserInputs.safeParse(body);
          if(!success){
            c.status(411)
            return c.json({
                message : "Invalid Inputs",
            });
          }

          const prisma = new PrismaClient({
            datasourceUrl : c.env?.DATABASE_URL,
          }).$extends(withAccelerate())

          try{
            const res = await prisma.user.update({
            where:{
                id : c.get("userID"),
            },
            data : body,
          });
        return c.json({
            message : "Details Updated!!"
            });
        }catch(e){
            c.status(403);
            return c.json({
                message:"Internal server Error"
            })
        }
    })

    UserRoutes.get("/:id",authMiddleware, async(c)=>{
        try{
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl:c.env?.DATABASE_URL
        }).$extends(withAccelerate());
        const user = await prisma.user.findUnique({
            where:{
                id : id
            },
            select:{
                id : true,
                username : true,
                email : true,
                blog : {
                    where : {
                        published : true,
                    },
                },
            },
        });

        console.log(user);

        return c.json({
            user
        })}catch(e){
            c.status(403);
            return c.json({
                message : "internal Server Error",
            });
        }
    });