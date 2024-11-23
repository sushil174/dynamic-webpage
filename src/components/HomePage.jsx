import {Link, useLoaderData} from 'react-router-dom'
import view from '../assets/open-in-new.svg'
import edit from '../assets/edit.svg'
import defaultImg from '../assets/spiderpunk.jpg'

export default function HomePage() {
    const {pages} = useLoaderData()
    console.log(pages)
    return (
        <div className='home-container'>
            <div className='home-heading'>
                <h1>Best Solutions.</h1>
                <Link to="/edit/new">Create New Page</Link>
            </div>
            <div className='home-main-content'>
                <h1>My Pages</h1>
                <div className='card-container'>
                    {pages.map((page) => (
                        <div key={page._id} className='card'>
                            <div className='image'>
                                <img src={page.image || defaultImg} alt="image" />
                            </div>
                            <div className='info'>
                                <p>{page.title}</p>
                                <div className='links'>
                                    <Link to={`/view/${page._id}`}><img src={view} alt='View'/></Link>
                                    <Link to={`/edit/${page._id}`}><img src={edit} alt='Edit'/></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}