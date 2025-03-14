import { verify } from "hono/jwt";

export default async function authMiddleware(c: any ,next :()=>void){
    const jwtToken = c.req.header("authorization") || "";
    try{
        const token = jwtToken.split(" ")[1];
        const user = await verify(token,c.env.JWT_SECRET);
        if(user){
            c.set("userID" ,user.id);
            return await next();
        }
    }catch(e :any){
        if(e == "JwtTokenInvalid"){
            c.status(405)
            return c.json({
                message: "You are not Authorized"
            });
        }
        console.log("Error",e);
        c.status(400)
        return c.json({
            message:"Internal Server Error" + e,
        });
    }
}