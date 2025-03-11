import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string;
    title: string;
    description: string;
    PostedOn: Date;
    Authorid: string;
    Author: {
        username: string;
    };
}

const defaultBlog: Blog = {
    id: "",
    title: "",
    description: "",
    PostedOn: new Date(),
    Authorid: "",
    Author: {
        username: "",
    },
};

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>(defaultBlog); 

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.data?.post) {
                    setBlog(response.data.post);
                }
            })
            .catch(() => {
                setBlog(defaultBlog); 
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blog,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.data?.post) {
                    setBlogs(response.data.post);
                }
            })
            .catch(() => {
                setBlogs([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
    };
};
