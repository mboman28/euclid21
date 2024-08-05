import { 
    Content as CtxMenuContent,
    Item as CtxMenuItem,
} from "@radix-ui/react-context-menu";
import { styled } from "@mui/material";

import { NodeOperations } from "../types/types";

import { getTitle } from "../data/dataUtils";

type NodeMenuProps = {
    node: string;
    nodeOps: NodeOperations;
    highlight: (n: string) => void;
}

const NodeMenu: React.FC<NodeMenuProps> = ({ node, nodeOps, highlight }) => {
    return (
        <CtxMenuContent style={{ background: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', padding: 5 }}>
            <DisabledMenuItem disabled>{getTitle(node)}</DisabledMenuItem>
            <StyledMenuItem onSelect={() => nodeOps.displayNode(node)}>Display This Node</StyledMenuItem>
            <StyledMenuItem onSelect={() => nodeOps.displayNodeRoot(node)}>Display Root</StyledMenuItem>
            <StyledMenuItem onSelect={() => nodeOps.displayNodeBranch(node)}>Display Branch</StyledMenuItem>
            <StyledMenuItem onSelect={() => nodeOps.hideNode(node)}>Hide this Node</StyledMenuItem>
            <StyledMenuItem onSelect={() => highlight(node)}>Highlight</StyledMenuItem>
        </CtxMenuContent>
    );
}

const StyledMenuItem = styled(CtxMenuItem)({
    padding: '3px',

    ':hover': {
        backgroundColor: 'lightgray',
        cursor: 'pointer',
    },
})

const DisabledMenuItem = styled(CtxMenuItem)({
    padding: '3px',
    color: 'gray',
    cursor: 'default'
})

export default NodeMenu;