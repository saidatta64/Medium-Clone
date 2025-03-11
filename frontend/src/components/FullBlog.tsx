import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { format } from "date-fns";
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="flex justify-center py-10">
        <div className="grid grid-cols-12 gap-8 px-6 md:px-10 max-w-screen-lg w-full">
          <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <div className="text-sm text-gray-500 mt-2">
              Posted on {format(new Date(blog.PostedOn), "d MMMM yyyy")}
            </div>
            <hr className="my-4" />
            <p className="text-lg leading-relaxed text-gray-700">
              {blog.description}
            </p>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 w-full">
              <div>
                <div className="text-slate-600 font-medium pb-2">
                Author
                </div>
                <div className="flex justify-start">
                <Avatar size= {"big"} name={blog.Author.username}/>
                <h2 className="text-2xl font-bold text-gray-800 pl-2">
                  {blog.Author.username || "Anonymous"}
                </h2>
                </div>
              
                <p className="pt-2 text-gray-600">
                  Random catchphrase about the author's ability to grab the
                  user's attention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
