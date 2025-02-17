import { useEffect, useState } from "react"
import { SubmitButton } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";
import { ShowErrorMessage } from "./ShowMessage";
import { apiUrl } from "../config";

export const UploadBlog = ()=> {
    const [postInputs, setPostInputs] = useState({
        title: '',
        quote: '',
        content: '',
        published: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=> {
        const postBlog = async ()=> {
            if(!postInputs.title || !postInputs.content || !postInputs.quote ){
                setErrorMessage("Fill all feilds");
                setIsSubmitting(false);
                return;
            }
            try {
                const res = await axios.post(`${apiUrl}/blog/post`, 
                    postInputs,
                    {
                        headers: {
                            "Authorization": `${localStorage.getItem('token')}`
                        }
                    }
                );
                if(res.data.success) {
                    // console.log(res.data.postID)
                    setIsSubmitting(false);
                    if(!res.data.published) {
                        navigate('/blog/myblogs')
                    }
                    else {
                        navigate(`/blog/${res.data.postID}`)
                    }
                }
            }
            catch(e) {
                setErrorMessage('Failed To submit post');
                setIsSubmitting(false);
                console.log(e);
            }
        }

        if(isSubmitting) {
            postBlog();
        }
    }, [isSubmitting, navigate, postInputs]);

    
    const submitPost = (publishStatus: boolean) => {
        setPostInputs((prev) => ({ ...prev, published: publishStatus }));
    };


    return (
        <div className="w-full bg-slate-800 overflow-y-scroll h-screen text-white">
            <AppBar/>
            <ShowErrorMessage message={errorMessage} setErrorMessage={setErrorMessage}/>
            <div className="flex m-2 mt-12 justify-center items-center">
                <div className="flex-col w-full sm:w-[70%] m-2 sm:p-8">
                <div className="flex">
                    <span className="py-2 mx-2 text-lg sm:text-3xl font-bold">Title: </span>
                    <input onChange={(e) => setPostInputs(c=> ({
                        ...c,
                        title: e.target.value
                    }))} value={postInputs.title} placeholder="Enter title of the blog post" maxLength={50} className="bg-black w-full border-gray-500 p-2 mx-2 border-2 resize-none whitespace-break-spaces rounded-2xl"></input>
                </div>
                <div className="flex justify-center my-2">
                    <span className="py-2 pr-2 text-base sm:text-2xl font-bold">Quote: </span>
                    <textarea onChange={(e) => setPostInputs(c=> ({
                        ...c,
                        quote: e.target.value
                    }))} value={postInputs.quote} placeholder="Write a quote related to this blog post" maxLength={100} rows={1} className="bg-black w-screen border-gray-500 p-2 mx-2 border-2 resize-none whitespace-break-spaces rounded-xl"></textarea>
                </div>
                <div className="flex my-2 justify-center">
                    <span className="py-2 text-base sm:text-xl font-bold">Content: </span>
                    <textarea onChange={(e) => setPostInputs(c=> ({
                        ...c,
                        content: e.target.value
                    }))} value={postInputs.content} placeholder="Write content of the blog and not more than 500 words" rows={8}  className="bg-black w-screen border-gray-500 p-2 mx-2 border-2 resize-none whitespace-break-spaces rounded-2xl"></textarea>
                </div>
                <div className="flex justify-end my-2">
                    <div className="flex gap-5 w-full sm:w-[50%]">
                        <SubmitButton title="Save as Draft" isSubmitting={isSubmitting} onClick={()=> {
                            setPostInputs(c=> {
                                return {
                                    ...c,
                                    published: false
                                }
                            })
                            setIsSubmitting(true)
                            submitPost(false)
                            }}
                        />
                        <SubmitButton title="Publish" isSubmitting={isSubmitting} onClick={()=> {
                            setPostInputs(c=> {
                                return {
                                    ...c,
                                    published: true
                                }
                            })
                            setIsSubmitting(true)
                            submitPost(true)
                            }}
                        />
                    </div>
                </div>
            </div> 
    
            </div>
       </div>
        
    )
}