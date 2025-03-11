import { SignupInput } from "@saidatta64/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const AuthComponent = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        username: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const token = response.data.jwt;
            localStorage.setItem("token", token);
            navigate("/blogs");
        } catch (e) {
            alert("Error while signing");
        }
    }
    


    return (    
        <div className="h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-lg rounded-2xl p-8 border-2 bg-white shadow-md">
                <div className="text-center">
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>
                    <div className="text-slate-400 mt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                        <Link className="ml-1 underline hover:text-gray-600" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign Up" : "Login"}
                        </Link>
                    </div>
                </div>
                <div className="py-4">
                    <LabelledInput label="EMAIL" placeholder="Email" onChange={(e) => {
                        setPostInputs({ ...postInputs, email: e.target.value });
                    }} />
                    {type === "signup" && (
                        <LabelledInput label="USERNAME" placeholder="Username" onChange={(e) => {
                            setPostInputs({ ...postInputs, username: e.target.value });
                        }} />
                    )}
                    <LabelledInput label="PASSWORD" placeholder="Password" type="password" onChange={(e) => {
                        setPostInputs({ ...postInputs, password: e.target.value });
                    }} />
                </div>
                <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
                    {type === "signin" ? "SIGN IN" : "SIGN UP"}
                </button>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="w-full">
            <div className="pt-2">
                <label className="block mb-2 text-xs font-semibold text-black text-left px-2">{label}</label>
                <input onChange={onChange} type={type || "text"} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 text-left" placeholder={placeholder} required />
            </div>
        </div>
    );
}
