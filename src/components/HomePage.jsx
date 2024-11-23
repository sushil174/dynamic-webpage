import {Link, useLoaderData} from 'react-router-dom'
export default function HomePage() {
    const {pages} = useLoaderData()
    console.log(pages)
    return (
        <div>
            <h1>My Pages</h1>
            <Link to="/edit/new">Create New Page</Link>
            <div>
                {pages.map((page) => (
                    <div key={page._id}>
                        <h2>{page.title}</h2>
                        <Link to={`/view/${page._id}`}>View</Link>
                        <Link to={`/edit/${page._id}`}>Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}