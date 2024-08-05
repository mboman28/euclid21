import { useContext, useEffect, useRef, useState } from "react"
import { Stage, Layer, Circle, Group, Text, Arrow, KonvaNodeComponent, Line } from "react-konva";

import DataContext from "../providers";

import { DataContextType, Edge, Node } from '../types/types'

import { getNode } from "../data/dataUtils";

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

type NodeComponentProps = {
    nodeName: string;
    x: number;
    y: number;
    dragFunc: (e: any, node: string) => void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({ nodeName, x, y, dragFunc }) => {
    return (
        // <ContextMenu menu={<div>Hello</div>}>

        <Group
            key={nodeName}
            draggable
            x={x}
            y={y}
            onDragMove={(e) => { dragFunc(e, nodeName) }}
        // onContextMenu={(e) => console.log('hello')}
        >
            <Circle
                fill='yellow'
                radius={25}
            />
            <Text fill='black' text={nodeName} x={-10} y={-3} />
        </Group>
        // </ContextMenu>
    );
}

type EuclidCanvasProps = {
    startNode: string;
}

const EuclidCanvas: React.FC<EuclidCanvasProps> = ({ startNode }) => {
    // const ref = useRef<HTMLDivElement>(null);
    const { data } = useContext(DataContext) as DataContextType;
    const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
    // TODO: Edges should be... a set? of string? (format 'A0.3, P1.1')? so we're not drawing the same edge twice?
    const [edges, setEdges] = useState<Edge[]>([]);

    // TODO: useeffect here is temp for testing. ultimately, initial state should be passed with props
    // Using useEffect here and enabling it to update state breaks drag and drop.
    // must fix state next. App needs to own and manage state (visible nodes & edges)
    useEffect(() => {
        let startNodes: { [key: string]: Node } = {}
        let startEdges: Edge[] = []
        startNodes[startNode] = { x: 700, y: 200 }

        const nodeData = getNode(data, startNode)

        let x = 400;
        for (const rootNode of nodeData.root) {
            startNodes[rootNode] = { x: x, y: 100 }
            startEdges.push({ from: rootNode, to: startNode })
            x += 75;
        }

        x = 400
        for (const branchNode of nodeData.branch) {
            startNodes[branchNode] = { x: x, y: 300 }
            startEdges.push({ from: startNode, to: branchNode })
            x += 75;
        }

        setNodes(startNodes)
        setEdges(startEdges)

    }, [])

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
        />)
    const edgeObjs = edges.map((edge) => {
        const fromStep = nodes[edge.from];
        const toStep = nodes[edge.to];
        const lineEnd = {
            x: toStep.x - fromStep.x,
            y: toStep.y - fromStep.y
        };
        const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
        return (
            <Arrow
                key={edge.from + ' -> ' + edge.to}
                x={fromStep.x}
                y={fromStep.y}
                points={points}
                stroke='black'
                fill='black'
            />
        );
    });

    return (
        <>
            {/* <div ref={ref}>HELLO</div> */}
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {edgeObjs}
                    {nodeObjs}
                </Layer>
            </Stage>
        </>
    )
}

export default EuclidCanvas;