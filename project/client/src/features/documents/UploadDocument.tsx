import { ChangeEvent, useState } from 'react'
import { useCreateDocument } from '../../app/hooks'

function UploadDocument() {
    const [file, setFile] = useState<File | null>(null)
    const create = useCreateDocument()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first.")
            return
        }

        const formData = new FormData()
        formData.append('file_path', file)

        create.mutate(formData)
    }

    return (
        <>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </>
    )
}

export default UploadDocument
