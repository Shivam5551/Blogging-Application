import { useEffect, useState } from "react"
import { Avatar } from "./Avatar"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config";

export const AppBar = ()=> {
    const [username, setUsername] = useState('');
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    useEffect(()=> {
        const handleResize = ()=> {
            setMenu(false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    useEffect(()=> {
        const handleClickOutside = (event: MouseEvent) => {
            if (!document.getElementById("menu-dropdown")?.contains(event.target as Node)) {
                setMenu(false);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    
    }, [])
    
    
    useEffect(()=> {
        
        const fetchUserDetails = async ()=> {
            try {
                const res = await axios.get(`${apiUrl}/user/details`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                if(res) {
                    setUsername(res.data.username);
                }
            } catch (e) {
                if(axios.isAxiosError(e) && e.response?.status === 401){
                    navigate('/signin');
                }
                else {
                    navigate('/signup');
                }
                
            }
        }

        fetchUserDetails();

    }, [navigate]);


    return (
        <div className="flex fixed w-screen z-10 items-center max-h-14 bg-black text-white justify-between border-amber-50 border-b-2 py-2 *:px-1 sm:px-10">
            <Link to={'/blog'} className="truncate text-base sm:text-xl font-extrabold font-mono">Blog application</Link>
            <div className="flex">
                <div className="hidden sm:flex"><MyblogButton/></div>
                <div className="hidden sm:flex"><NewBlogButton/></div>
                <button id="menu-dropdown" onClick={()=> setMenu(!menu)}><Avatar name={username} /></button>
                {menu ? <div className="absolute justify-center flex flex-col items-center right-3 top-11 m-1 sm:right-12 backdrop-blur-2xl border-2 text-white p-2 rounded-2xl">
                    <ul className="sm:hidden w-full m-1 flex"><MyblogButton/></ul>
                    <ul className="sm:hidden w-full m-1 flex"><NewBlogButton/></ul>
                    <ul className="w-full m-1 flex"><button className="bg-red-500 w-full inline-flex text-white hover:bg-red-700 mx-1 rounded-md hover:rounded-2xl transform-all duration-500 justify-center text-sm p-2 items-center " onClick={handleLogOut}>Log Out</button></ul>
                </div>: ""}
            </div>
        </div>
    )
}

const MyblogButton = ()=> {
    return (
        <button className="inline-flex mx-1"><Link className="bg-green-500 w-full inline-flex hover:bg-green-600 p-2 text-sm rounded-lg hover:rounded-2xl transform-all duration-500 justify-center items-center" to={'/blog/myblogs'}>My Blogs</Link></button>
    )
}

const NewBlogButton = ()=> {
    return (
        <button className="inline-flex mx-1"><Link className="bg-blue-500 w-full inline-flex text-white hover:bg-blue-700 rounded-md hover:rounded-2xl transform-all duration-500 justify-center text-sm p-2 items-center" to={'/blog/upload'}>New Blog</Link></button>
    )
}