
import { NavLink } from "react-router-dom"
import { useDocuments } from "../app/hooks"
import Button from "../components/buttons/Button"
import { IDocument } from "../types/documents.types"

function DocumentPage() {
  const { data, isLoading, error } = useDocuments()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {data.map((document: IDocument) =>
        <div className="flex gap-3">
          <NavLink to={`/documents/${document.id}`}>{document.title}</NavLink>
          <Button>
            <NavLink to={`/documents/${document.id}/view`}>View</NavLink>
          </Button>
        </div>
      )}
    </>
  )
}

export default DocumentPage