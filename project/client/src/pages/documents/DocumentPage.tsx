
import { NavLink } from "react-router-dom"
import { useDocuments } from "../../app/hooks"
import Button from "../../components/buttons/Button"
import UploadDocument from "../../features/documents/UploadDocument"
import Loading from "../../features/loading/Loading"
import { IDocument } from "../../types/documents.types"

function DocumentPage() {
  const { data: documents, isLoading, error } = useDocuments()

  if (isLoading) return <Loading />
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {documents.map((document: IDocument) =>
        <div className="flex gap-3">
          <p>{document.title}</p>
          <Button>
            <NavLink to={`/documents/${document.id}/download`}>Download</NavLink>
          </Button>
        </div>
      )}

      <div className="mt-10">
        <UploadDocument />
      </div>
    </>
  )
}

export default DocumentPage