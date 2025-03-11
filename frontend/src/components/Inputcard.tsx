import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import EditorExtension from "./EditorExtension";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
// import Heading from '@tiptap/extension-heading'

export default function InputCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Highlight.configure({
        multicolor: true
      })
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none'
      }
    },
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    }
  });

  return (
    <div className=" bg-white  max-w-screen-sm">
      <div>
      <input
        // <EditorExtension/>
        type="text"
        placeholder="Enter title..."
        className="w-full p-2 text-lg border-gray-400 font-semibold border rounded outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      </div>
      
      <EditorExtension editor={editor} />
      
      <EditorContent 
        editor={editor} 
        className="w-full p-2 mt-2 text-md border border-gray-400 rounded outline-none min-h-[275px] prose max-w-none"
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
