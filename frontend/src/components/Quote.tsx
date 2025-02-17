interface Quote {
    content: string
    author: string
    reputation: string
}

export const Quote = (quote: Quote)=> {
    return (
        <div className="md:flex text-left h-screen hidden p-20 items-center justify-start">
            <div className="h-fit w-fit">
                <div className="font-semibold">
                    {quote.content}
                </div>
                <div className="font-extrabold text-3xl">
                    {quote.author}
                </div>
                <div className="font-medium">
                    {quote.reputation}
                </div>
            </div>
        </div>
    )
}