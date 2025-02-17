import { useEffect } from "react";

interface ErrorMessage {
    message: string
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}


export const ShowErrorMessage = ({message, setErrorMessage}: ErrorMessage)=> {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, setErrorMessage]);

    if(!message) {
        return null;
    }

    return (
        <>
            <div className="flex absolute z-20 border-2 top-3 right-3 items-center text-red-500 bg-white p-1 sm:p-2 rounded-lg shadow-2xl ">
                <span className="text-xs sm:text-sm">{message}</span>
                <div
                    onClick={() => setErrorMessage('')}
                    className="flex m-1 items-center justify-center rounded-full text-red-500 p-0.5 hover:bg-red-600 hover:text-white cursor-pointer transition-all duration-200 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </div>

        </>
    )
}