import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
export const Appbar = () =>{
    return <div className="border-b flex justify-between py-4 px-10">
        <Link to={'/blogs'}>
        <div className=" flex justify-center flex-col font-bold text-3xl font-serif">
            Medium
        </div>
        </Link>
        <div>
            <Link to={'/publish'}> 
            <button type="button" className="focus:outline-none cursor-pointer text-white bg-green-700 hover:bg-green-800 300 font-medium rounded-lg text-sm px-5 py-2 me-12 mb-2">Write</button>
            </Link>    
     <Avatar size= {"big"} name="Harkirat"/>
        </div>
    </div>
}