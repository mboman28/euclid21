import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { AppBar, Button, IconButton, styled, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import ReactModal from "react-modal";
import { Document, Page } from 'react-pdf';

import CloseIcon from '@mui/icons-material/Close';
import { getTitle } from "../data/dataUtils";

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
        <ReactModal isOpen={node !== ''} style={{ content: { padding: 0 } }} >
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Title variant="h6">
                        {getTitle(node)}
                    </Title>
                    <StyledButton onClick={closeModal}>
                        <CloseIcon />
                    </StyledButton>
                </Toolbar>
            </AppBar>
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

const Title = styled(Typography)({
    flexGrow: '1',
})

const StyledButton = styled(IconButton)({
    color: 'white',
});

const DocumentViewer = styled(Document)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
});

const PageViewer = styled(Page)({
    height: 'fit-content',
    width: 'fit-content',
});

export default NoteTextModal;