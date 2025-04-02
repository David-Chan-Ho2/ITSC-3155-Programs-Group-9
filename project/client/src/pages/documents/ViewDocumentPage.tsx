
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDocument } from "../../app/hooks"

function ViewDocumentPage() {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const params = useParams()
    const { data: document, isLoading, error } = useDocument(Number(params.id))

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            {/* <Document file={document?.file_path} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p> */}
        </div>
    )
}

export default ViewDocumentPage