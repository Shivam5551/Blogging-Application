import { BeatLoader } from "react-spinners"

export const Avatar = ({ name }: { name: string })=> {
    return (
        <div className="relative mx-2 inline-flex  items-center justify-center p-2 w-8 h-8 overflow-hidden hover:text-white text-gray-500 transform-all duration-500 hover:bg-red-500 bg-blue-100 rounded-full">
            {!name ? <BeatLoader/> : 
            <span className="hover:cursor-pointer sm:text-base text-xs font-semibold ">{name[0].toUpperCase()}</span>}
        </div>
    )
}
