import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Button, styled, Toolbar } from "@mui/material";
import { useState } from "react";
import ReactModal from "react-modal";
import { Document, Page } from 'react-pdf';

type NoteTextModalProps = {
    node: string;
    closeModal: () => void;
}

const NoteTextModal: React.FC<NoteTextModalProps> = ({ node, closeModal }) => {
    const [numPages, setNumPages] = useState(null);

    //@ts-ignore
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <ReactModal isOpen={node !== ''}>
            <Toolbar variant="dense">
                <Button onClick={closeModal}>Close</Button>
            </Toolbar>
            <DocumentViewer
                file={`../docs/${node}.pdf`}
                onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <PageViewer
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    ),
                )}
            </DocumentViewer>
        </ReactModal>
    );
}

const DocumentViewer = styled(Document)({
    display: "flex",
})

const PageViewer = styled(Page)({
    width: 'fit-content',
})

export default NoteTextModal;