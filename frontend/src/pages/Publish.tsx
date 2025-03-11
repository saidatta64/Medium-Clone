import InputCard from "../components/Inputcard";
import { Appbar } from "../components/Appbar";


export function Publish() {
  return (
    <div>
        <Appbar></Appbar>
        <div className="flex justify-center pt-2">
            <div className="p-6 shadow shadow-gray-400 rounded bg-white w-screen max-w-screen-sm">
                <h1 className="text-2xl font-bold mb-4 font-2">Create a Blog Post</h1>
                <InputCard />
            </div>
         </div>
    </div>);
}
