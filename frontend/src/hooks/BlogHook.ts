import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";


interface BLOG {
    id: string
    title: string
    content: string
    quote: string
    published?: boolean
    publishedOn: string
    author: {
        name: string
    }
}


export const useBlogs = ()=> {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BLOG[]>([]);
    const navigate = useNavigate();
    useEffect(()=> {
        const getBlogs = async ()=> {
            try {
                const res = await axios.get(`${apiUrl}/blog/bulk`, 
                    {
                        headers: {
                            "Authorization": `${localStorage.getItem('token')}`
                        }
                    }
                );
                if(res) {
                    setBlogs(res.data.posts);
                    console.log(res.data.posts)
                    setLoading(false);
                }
            }
            catch(e) {
                if(axios.isAxiosError(e)){
                    if(!e.response?.data?.success){
                        navigate('/signin');
                    }
                }
                console.log(e);
            }
        }

        if(loading) {
            getBlogs();
        }
    }, [loading, navigate]);

    return {
        loading, 
        blogs
    }
}


export const useFetchBlog = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BLOG>();
    const navigate = useNavigate();
    
    useEffect(()=> {
        const fetchBlog = async ()=> {
            try {
                const res = await axios.get(`${apiUrl}/blog/search/${id}`,
                    {
                        headers: {
                            "Authorization": `${localStorage.getItem('token')}`
                        }
                    }
                );
                if(res) {
                    setBlog(res.data.post);
                    console.log(res.data.post)
                    setLoading(false);
                }
            }
            catch(e) {
                setLoading(false);
                console.log(e);
                if(axios.isAxiosError(e)){
                    if(!e.response?.data?.success){
                        navigate('/signin');
                    }
                }
            }
        }

        if(loading) {
            fetchBlog();
        }
    }, [navigate, id, loading]);

    return {
        loading, 
        blog
    }

}

export const useMyBlogs = ()=> {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BLOG[]>([]);
    const [authorName, setAuthorName] = useState('')
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchBlogs = async ()=> {
            try {
                const res = await axios.get(`${apiUrl}/blog/userblogs`,
                    {
                        headers: {
                            "Authorization": `${localStorage.getItem('token')}`
                        }
                    }
                );
                if(res) {
                    setBlogs(res.data.posts);
                    setAuthorName(res.data.authorName);
                    // console.log(res.data.posts)
                    setLoading(false);
                }
            }
            catch(e) {
                setLoading(false);
                console.log(e);
                if(axios.isAxiosError(e)){
                    if(!e.response?.data?.success){
                        navigate('/signin');
                    }
                }
            }
        }
        if(loading) {
            fetchBlogs();
        }
        
    }, [loading, navigate]);

    return {
        loading,
        blogs,
        authorName,
        setBlogs
    }
}