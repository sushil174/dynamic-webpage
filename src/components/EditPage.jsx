import { useState } from "react"
import { useNavigate, useLoaderData } from "react-router-dom"
import { createPage, updatePage } from "../../api";
import axios from "axios";


export default function EditPage() {
    const {page} = useLoaderData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(page || {title: '', content:'',image:'',imageTitle: '',published:false})
    const [imageFile, setImageFile] = useState(null)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

    const hanfleFileChange = (e) => {
        setImageFile(e.target.files[0])
    }

    const uploadImage = async () => {
        if(!imageFile) return alert('please select an image to upload')
        try {
            const signatureResponse = await axios.get('http://localhost:5000/api/cloudinary-signature')
            console.log('Full Signature Response:', signatureResponse.data);
            const {signature, timestamp} = signatureResponse.data
            if (!signature || !timestamp) {
                throw new Error('Invalid signature or timestamp from backend');
            }
            const formDataToSend = new FormData()
            formDataToSend.append('file', imageFile)
            formDataToSend.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
            formDataToSend.append('timestamp', timestamp)
            formDataToSend.append('signature', signature)
            console.log([...formDataToSend.entries()]);
            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formDataToSend
            )
            setFormData({...formData, image: uploadResponse.data.secure_url})
        }catch (err) {
            console.error('Image upload failed', err)
        }
    }

    const handleSubmit = async () => {
        if(!page) {
            await createPage(formData)
        }
        else{
            await updatePage(page._id, formData)
        }
        navigate('/')
    }

    return (
        <div className="edit-container">
            <h1>{page ? 'Edit Page' : 'Create Page'}</h1>
            <input 
                className="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
            />
            <textarea 
                className="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Content"
            />
            
            <div className="image-upload">
                <div>
                    <input type="file" className="image" accept="image/*" onChange={hanfleFileChange}/>
                    <button type="button" onClick={uploadImage}>Upload Image</button>
                </div>

                {formData.image && (
                    <div className="image-preview">
                        <p>Uploaded Image:</p>
                        <img src={formData.image} alt="image" style={{width : '200px'}}/>
                    </div>
                )}

                <input
                    type="text"
                    className="image-title"
                    name="imageTitle"
                    value={formData.imageTitle}
                    onChange={handleInputChange}
                    placeholder="Image Title"
                />
            </div>
            <button className="save" onClick={handleSubmit}>Save</button>
        </div>
    )
}