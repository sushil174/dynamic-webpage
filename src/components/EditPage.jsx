import { useState } from "react"
import { useNavigate, useLoaderData } from "react-router-dom"
import { createPage, updatePage } from "../../api";

export default function EditPage() {
    const {page} = useLoaderData();
    const navigate = useNavigate();
    cont [formData, setFormData] = useState(page || {title: '', content:'',image:'',imageTitle: '',published:false})

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async () => {
        if(!page) {
            await createPage(formData)
        }else {
            await updatePage(page.id, formData)
        }
        navigate('/')
    }

    return (
        <div>
            <h1>{page ? 'Edit Page' : 'Create Page'}</h1>
            <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
            />
            <textarea 
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Content"
            />
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
            />
            <input
                type="text"
                name="imageTitle"
                value={formData.imageTitle}
                onChange={handleInputChange}
                placeholder="Image Title"
            />
            <button onClick={handleSubmit}>Publish</button>
        </div>
    )
}