
import { NavLink, useParams } from "react-router-dom"
import { useAppSelector, useDocuments } from "../../app/hooks"
import { selectProject } from "../../app/slices/projectSlice"
import Button from "../../components/buttons/Button"
import EmptyState from "../../components/empty-state/EmptyState"
import UploadDocument from "../../features/documents/UploadDocument"
import { IDocument } from "../../types/documents.types"

function DocumentPage() {
  const { id } = useParams()
  const { data: documents, isLoading, error } = useDocuments()
  const { projectId } = useAppSelector(selectProject)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  if (!documents) {
    return <EmptyState title="document" />
  }

  return (
    <>
      {documents.map((document: IDocument) =>
        <div className="flex gap-3">
          <NavLink to={`/documents/${document.id}`}>{document.title}</NavLink>
          <Button>
            <NavLink to={`/documents/${document.id}/view`}>View</NavLink>
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