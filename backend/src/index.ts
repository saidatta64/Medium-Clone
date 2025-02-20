import { Hono } from 'hono'
import { UserRoutes } from './Routes/user'
import { BlogRoutes } from './Routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
    Bindings:{
        DATABASE_URL : string;
        JWT_SECRET : string
    };
}>()
app.use(cors())
app.route("/api/v1/user",UserRoutes)
app.route("/api/v1/blog",BlogRoutes)

export default app
