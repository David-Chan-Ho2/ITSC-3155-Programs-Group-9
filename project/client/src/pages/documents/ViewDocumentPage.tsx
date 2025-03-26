import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { useDocuments } from "../../app/hooks"

function ViewDocumentPage() {
    const { data } = useDocuments()

    const docs = data.map((d) => ({ uri: d.filePath }))

    return (
        <DocViewer
            documents={docs}
            initialActiveDocument={docs[1]}
            pluginRenderers={DocViewerRenderers}
        />
    )
}

export default ViewDocumentPage