import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeletons";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Appbar />
                <div className="flex justify-center">
                    <div className="w-screen max-w-screen-sm bg-white shadow-md rounded-lg">
                        <Skeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="flex justify-center">
                <div className="w-screen max-w-screen-sm bg-white shadow-md rounded-lg justify-center">
                    {blogs.map((post) => (
                        <BlogCard
                            key={post.id}
                            id={post.id}
                            authorName={post.Author.username || "Unknown"}
                            title={post.title}
                            content={post.description}
                            PostedOn={post.PostedOn}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
