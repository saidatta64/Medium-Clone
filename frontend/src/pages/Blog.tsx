import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/Skeletons";


export const Blog = () =>{
            const {id} = useParams();
            const {loading , blog} = useBlog({
                id : id || "",
            });
            if(loading){
                return <div>
                     <FullBlogSkeleton/>
                </div>
            }
            return <div>
            <FullBlog blog={blog}/>
            </div>
        }