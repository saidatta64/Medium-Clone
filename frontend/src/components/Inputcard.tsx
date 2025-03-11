import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function InputCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" bg-white  max-w-screen-sm">
      <div>
      <input
        type="text"
        placeholder="Enter title..."
        className="w-full p-2 text-lg border-gray-400 font-semibold border rounded outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      </div>
      
      
      <textarea
        placeholder="Write your blog content here..."
        className="w-full p-2 mt-2 text-md border border-gray-400 rounded outline-none min-h-[275px] resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <button
        onClick={async ()=>{
          const response = await axios.post(`${BACKEND_URL}/api/v1/blog/b`,{
                title,
                description
            },{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.postId}`)
        }}
        className="mt-4 w-full p-2 text-white bg-green-600 hover:bg-green-700 rounded-md font-semibold">
        Publish
      </button>
    </div>
  );
}
