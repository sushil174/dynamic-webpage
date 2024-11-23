const API_URL = 'http://localhost:5000/api/pages';

export const getPages = async () => {
    const response = await fetch(API_URL)
    return response.json()
}

export const getPageById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    return response.json()
}

export const createPage = async (pageData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pageData)
    })
    return response.json();
}

export const updatePage = async (id, pageData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(pageData)
    })
    console.log("response", response)
    return response.json()
}


export const deletePage = async (id) => {
    await fetch(`${API_URL}/${id}`, {method:'DELETE'})
}