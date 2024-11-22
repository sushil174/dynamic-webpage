import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function EditPage() {
    const page = {id:2, title:"hello", content:"nice to meet you",image:"nothing for now", published:false}
    const navigate = useNavigate();
    const [formData, setFormData] = useState(page || {
        title: '', content: '', image: '', published: false
    })

    const handleInputChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async () => {
        if(!page) {
            
        }
    }
}