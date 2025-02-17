import { Fragment } from "react/jsx-runtime"
import { AppBar } from "./AppBar"
import { BlogCard } from "./BlogCard"
import { useBlogs } from "../hooks/BlogHook"
import { Link } from "react-router-dom"
import { BlogRendering } from "./Loading"

export const Blog = ()=> {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return (
            <div className="bg-slate-950 overflow-auto h-screen flex flex-col">
                <AppBar />
                <div className="mt-14 flex flex-col">
                    <BlogRendering/>
                    <BlogRendering/>
                    <BlogRendering/>
                </div>
            </div>
        );
    }


    if (!blogs || blogs.length === 0) {
        return (
            <div className="bg-slate-950 items-center justify-center h-screen text-white">
                <AppBar/>
                <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-lg font-semibold">No Blog Found</p>
                    <Link to="/blog/upload" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all">
                        Upload a Blog
                    </Link>
                </div>
            </div>
        );
    }

    

    return (
        <Fragment>
            <AppBar/>
            <div className="flex bg-slate-950 justify-center">   
                <div className="max-w-xl mt-14 text-wrap overflow-hidden">
                    {blogs.map((blog, key) => {
                        return (
                            <BlogCard 
                            id={blog?.id}
                            key={key}
                            authorName={blog?.author.name || "Anonymous"}
                            title={blog?.title}
                            content={blog?.content}
                            publishedDate={blog?.publishedOn}
                            />
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}