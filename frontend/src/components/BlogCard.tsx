import { format } from "date-fns";
import { Link } from "react-router-dom";

export interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    PostedOn: Date;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    PostedOn,
}: BlogCardProps) => {
    const formattedDate = format(new Date(PostedOn), "d MMMM yyyy");

    return (
        <Link to={`/blog/${id}`} className="block">
            <div className="p-6 border-b border-gray-300 bg-white w-screen max-w-screen-sm shadow-md rounded-lg transition-transform transform hover:scale-[1.001]">
                <div className="flex items-center space-x-4">
                    <Avatar name={authorName} size="small" />
                    <div className="text-sm font-semibold">{authorName}</div>
                    <Circle />
                    <div className="text-xs text-gray-500">{formattedDate}</div>
                </div>
                <h2 className="text-xl font-bold mt-3 text-gray-900">{title}</h2>
                <p className="text-md text-gray-700 mt-2 leading-relaxed">
                    {content.slice(0, 100) + "..."}
                </p>
                <div className="text-gray-500 text-sm mt-3">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
};

export function Avatar({
    name,
    size = "small",
}: {
    name: string;
    size?: "small" | "big";
}) {
    return (
        <div
            className={`relative inline-flex items-center justify-center ${
                size === "small" ? "w-8 h-8" : "w-12 h-12"
            } overflow-hidden bg-gray-500 rounded-full`}
        >
            <span
                className={`${
                    size === "small" ? "text-xs" : "text-lg"
                } text-white font-medium`}
            >
                {name[0]}
            </span>
        </div>
    );
}

function Circle() {
    return <div className="h-1.5 w-1.5 bg-gray-600 rounded-full"></div>;
}
