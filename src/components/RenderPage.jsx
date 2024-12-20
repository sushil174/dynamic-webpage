import { UNSAFE_decodeViaTurboStream, useLoaderData } from "react-router-dom"

export default function RenderPage() {
    const {page} = useLoaderData();
    if(!page) return <p>Loading...</p>
    return (
        <div className="render-container">
            <h1>{page.title}</h1>
            <p>{page.content}</p>
            <figure>
                <img src={page.image} alt={page.title} />
                <figcaption>{page.imageTitle}</figcaption>
            </figure>
        </div>
    )
}