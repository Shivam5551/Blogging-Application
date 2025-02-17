import { Fragment } from "react/jsx-runtime"
import { Circle } from "./Circle"
import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom"

interface Blog {
    id: string
    authorName: string
    title: string
    content: string
    publishedDate?: string
}

export const BlogCard = ({ id, authorName, title, content, publishedDate }: Blog)=> {

    const navigate = useNavigate();

    return (
        <div id={id} className="border-b-1 border-slate-200 mt-2 p-2 flex justify-center flex-col">             
            <div className="items-center flex ">
                <Avatar name={authorName}/>
                <span className="font-extrabold text-white text-lg">{authorName.replace(/^./, (char) => char.toUpperCase())}</span>
                <Circle/>
                <div className="font-extralight text-gray-200">{publishedDate?.split('T')[0] || "Not Set"}</div>
            </div>
            <Title onClick={()=> {navigate(`/blog/${id}`)}} title={title}/>
            <Content content={content}/>
            
        </div>
    )
}





const Title = ({ onClick, title }: {onClick: ()=> void, title : string })=> {
    return (
        <div onClick={onClick} className="text-3xl text-white font-serif italic mt-2 hover:cursor-pointer font-extrabold">
                {title.slice(0,50) + "..."}
        </div>
    )
}

const Content = ({ content } : { content: string }) => {
    return (
        <Fragment>
            <div className=" pt-2 text-slate-400 text-base font-thin ">
                {content.slice(0, 250) + "..."}
            </div>
            <div className="pl-2 pt-1 text-gray-400">
                {Math.ceil(content.length/100) + " min read"}
            </div>
        </Fragment>
    )
}

