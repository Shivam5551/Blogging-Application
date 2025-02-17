import { AppBar } from "./AppBar"
import { BlogCard } from "./BlogCard"
import { useMyBlogs } from "../hooks/BlogHook";
import { BlogLoading } from "./Loading";
import { useState } from "react";
import axios from "axios";
import { ShowErrorMessage } from "./ShowMessage";
import { Link } from "react-router-dom";
import { apiUrl } from "../config";

export const MyBlogs = ()=> {
    const {loading, blogs, authorName, setBlogs} = useMyBlogs();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    if(loading) {
        return(
            <BlogLoading/>
        )
    }


    if (!blogs || blogs.length === 0) {
        return (
            <div className="bg-slate-950 items-center justify-center h-screen text-white">
                <AppBar/>
                <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-lg font-semibold">You haven't uploaded any blogs yet.</p>
                    <Link to="/blog/upload" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all">
                        Upload a Blog
                    </Link>
                </div>
            </div>
        );
    }

    
    const handleSubmit = (condition: boolean , id: string)=> {
        console.log('Button clicked');
        if(isSubmitting) return;
        setIsSubmitting(true);
        const changeVisiblity =  async ()=> {
            try {
                const res = await axios.put(`${apiUrl}/blog/update`,
                    { id, published: !condition },
                    {
                        headers: { 
                            Authorization: localStorage.getItem('token') || '' 
                        } 
                    }
                );
                if(res.data.success) {
                    setMessage(res.data?.message);
                    setBlogs((prevBlogs) =>
                        prevBlogs.map((blog) =>
                            blog.id === id ? { ...blog, published: !condition } : blog
                        )
                    );
                }
                
            } catch (e) {
                if(axios.isAxiosError(e)){
                    setMessage(e.response?.data.message);
                }
            } finally {
                setIsSubmitting(false);
            }
        }

        changeVisiblity();
    }



    return (
        <div className="bg-black h-screen overflow-auto">
            <AppBar/>
            <ShowErrorMessage message={message} setErrorMessage={setMessage}/>
            <div className="flex mt-12 bg-slate-950 justify-center">   
                <div className="w-full sm:w-[50%]">
                    {blogs.map((b, key) => {
                        return (
                            <div key={key} className="flex w-full flex-col">
                                <BlogCard 
                                id={b.id}
                                authorName={authorName || "Anonymous"}
                                title={b.title}
                                content={b.content}
                                publishedDate={b.publishedOn}
                                />
                                <div className="justify-end flex">
                                    <button onClick={()=> handleSubmit(b?.published || false, b?.id)} disabled={isSubmitting} className="text-white relative w-fit p-1 px-2 transform-all duration-300 rounded-md m-0.5 hover:cursor-pointer hover:rounded-2xl bg-blue-500 hover:bg-blue-600 right-0 bottom-0">{b.published ? "Unpublish" : "Publish"}</button>
                                </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}