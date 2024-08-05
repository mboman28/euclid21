import { useState } from "react";
import { Stage, Layer, Circle, Group, Text, Arrow } from "react-konva";
import {
    Root as CtxMenuRoot,
    Trigger as CtxMenuTrigger,
    Content as CtxMenuContent,
    Item as CtxMenuItem
} from "@radix-ui/react-context-menu";

import { Node, NodeOperations } from '../types/types'

import { getColor, getNode } from "../data/dataUtils";


function createConnectionPoints(from: Node, to: Node) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    const radius = 25;

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
    ];
}

type NodeMenuProps = {
    node: string;
    nodeOps: NodeOperations;
}

const NodeMenu: React.FC<NodeMenuProps> = ({ node, nodeOps }) => {
    return (
        <CtxMenuContent style={{ background: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', padding: 5 }}>
            <CtxMenuItem onSelect={() => nodeOps.displayNode(node)}>Display This Node</CtxMenuItem>
            <CtxMenuItem onSelect={() => nodeOps.displayNodeRoot(node)}>Display Root</CtxMenuItem>
            <CtxMenuItem onSelect={() => nodeOps.displayNodeBranch(node)}>Display Branch</CtxMenuItem>
            <CtxMenuItem onSelect={() => nodeOps.hideNode(node)}>Hide this Node</CtxMenuItem>
        </CtxMenuContent>
    );
}

type NodeComponentProps = {
    nodeName: string;
    x: number;
    y: number;
    dragFunc: (e: any, node: string) => void;
    selectCtxMenu: () => void;
    displayDoc: (n: string) => void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({ nodeName, x, y, dragFunc, selectCtxMenu, displayDoc }) => {
    const color = getColor(nodeName[0]);
    return (
        <Group
            key={nodeName}
            draggable
            x={x}
            y={y}
            onDragMove={(e) => { dragFunc(e, nodeName) }}
            onContextMenu={selectCtxMenu}
            onDblClick={() => displayDoc(nodeName)}
        >
            <Circle
                fill={color}
                radius={25}
            />
            <Text fill='black' text={nodeName} x={-25} y={-25} width={50} height={50} align="center" verticalAlign="middle" />
        </Group>
    );
}

type EuclidCanvasProps = {
    nodes: { [key: string]: Node };
    edges: Set<string>;
    nodeOperations: NodeOperations;
    setNodes: (n: { [key: string]: Node }) => void;
}

const EuclidCanvas: React.FC<EuclidCanvasProps> = ({ nodes, edges, nodeOperations, setNodes }) => {
    const [selected, setSelected] = useState<string>('');

    function handleStepDrag(e: any, key: string) {
        const position = e.target.position();
        setNodes({
            ...nodes,
            [key]: {
                ...nodes[key],
                ...position
            }
        });
    }

    const nodeObjs = Object.keys(nodes).map((nodeName: string) =>
        <NodeComponent
            nodeName={nodeName}
            dragFunc={handleStepDrag}
            x={nodes[nodeName].x}
            y={nodes[nodeName].y}
            selectCtxMenu={() => setSelected(nodeName)}
            displayDoc={(n: string) => nodeOperations.showNodeText(n)}
        />)

    const edgeObjs = Array.from(edges).map((edge) => {
        const [from, to] = edge.split(',')
        const fromNode = nodes[from];
        const toNode = nodes[to];
        const lineEnd = {
            x: toNode.x - fromNode.x,
            y: toNode.y - fromNode.y
        };
        const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
        return (
            <Arrow
                key={edge}
                x={fromNode.x}
                y={fromNode.y}
                points={points}
                strokeWidth={1}
                stroke='black'
                fill='black'
            />
        );
    });

    return (
        <CtxMenuRoot>
            <CtxMenuTrigger>
                <Stage width={window.innerWidth} height={window.innerHeight} onClick={() => setSelected('')}>
                    <Layer>
                        {edgeObjs}
                        {nodeObjs}
                    </Layer>
                </Stage>
            </CtxMenuTrigger>
            {selected ? <NodeMenu node={selected} nodeOps={nodeOperations} /> : null}
        </CtxMenuRoot>
    )
}

export default EuclidCanvas;