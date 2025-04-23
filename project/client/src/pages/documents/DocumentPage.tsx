
import { NavLink } from "react-router-dom"
import { useDocuments } from "../../app/hooks"
import Button from "../../components/buttons/Button"
import EmptyState from "../../components/empty-state/EmptyState"
import UploadDocument from "../../features/documents/UploadDocument"
import { IDocument } from "../../types/documents.types"

function DocumentPage() {
  const { data: documents, isLoading, error } = useDocuments()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  if (!documents) {
    return <EmptyState title="document" />
  }

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