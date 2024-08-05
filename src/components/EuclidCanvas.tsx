import { useContext, useEffect, useRef, useState } from "react"
import { Stage, Layer, Circle, Group, Text, Arrow, KonvaNodeComponent, Line } from "react-konva";

import DataContext from "../providers";

import { DataContextType, Edge, Node } from '../types/types'

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

type NodeComponentProps = {
    nodeName: string;
    x: number;
    y: number;
    dragFunc: (e: any, node: string) => void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({ nodeName, x, y, dragFunc }) => {
    const color = getColor(nodeName[0]);
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
                fill={color}
                radius={25}
            />
            <Text fill='black' text={nodeName} x={-10} y={-3} />
        </Group>
        // </ContextMenu>
    );
}

type EuclidCanvasProps = {
    nodes: { [key: string]: Node };
    edges: Set<string>;
    setNodes: (n: { [key: string]: Node }) => void;
}

const EuclidCanvas: React.FC<EuclidCanvasProps> = ({ nodes, edges, setNodes }) => {

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
                stroke='black'
                fill='black'
            />
        );
    });

    return (
        <>
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