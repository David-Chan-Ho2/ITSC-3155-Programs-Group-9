import axios from 'axios'
import { ChangeEvent, useState } from 'react'

function UploadDocument() {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.")
            return
        }

        const formData = new FormData()
        formData.append('title', file.name)
        formData.append('file', file)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/documents/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            console.log('Uploaded:', response.data)
        } catch (error) {
            console.error('Upload failed:', error)
        }
    }

    return (
        <>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </>
    )
}

export default UploadDocument
