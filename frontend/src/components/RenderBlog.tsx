import { AppBar } from "./AppBar"
import { Avatar } from "./Avatar"
import { useFetchBlog } from "../hooks/BlogHook"
import { useParams } from "react-router-dom"
import { BlogLoading } from "./Loading"
import ReactMarkdown from "react-markdown"

export const RenderBlog = ()=> {

    const { id } = useParams();

    const blogID = id || "";
    const {loading, blog} = useFetchBlog(blogID);


    if(loading) {
        return (
            <BlogLoading/>
        )
    }
    
    if(!blog) {
        return (
            <div className="flex justify-center items-center w-screen overflow-x-hidden overflow-auto bg-gray-900 h-screen">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl font-extrabold lg:text-9xl text-white">404</h1>
                        <p className="mb-4 text-3xl font-bold md:text-4xl dark:text-white">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        <a href="/blog" className="inline-flex text-white font-bold rounded-xl text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-red-600 hover:rounded-3xl transform-all duration-700 hover:text-black my-4">Back to Homepage</a>
                    </div>   
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-950 overflow-x-hidden overflow-hidden h-screen ">
            <AppBar/>
            <div className="flex md:p-8 mt-10 overflow-x-hidden h-screen justify-center w-full">
                <div className="w-full sm:w-[55%] p-5"> 
                    <div className="text-4xl italic text-amber-50 font-serif font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-sm py-2 font-extralight text-gray-500">
                        Posted On {blog.publishedOn.split('T')[0]}
                    </div>
                    <div className="text-base text-violet-100 whitespace-break-spaces font-extralight">
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                    <div className="h-12 flex"></div>
                </div>
                <div className="hidden sm:block sm:w-[20%] px-2 py-5">
                    <span className="p-2 text-zinc-300 font-semibold">Author</span>
                    <div className="flex py-2 items-center">
                        <div className="h-fit w-fit"><Avatar name={blog.author.name} /></div>
                        <div className=" text-teal-200 font-serif italic font-semibold px-1 text-2xl">
                            {blog.author.name.replace(/^./, (char) => char.toUpperCase())}
                            <div className="p-2 text-xs font-extralight text-gray-500">
                            {blog.quote || "Quote Not updated"}
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}