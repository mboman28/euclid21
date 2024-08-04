import { useRef, useEffect, useState } from "react"
import { Stage, Layer, Rect, Circle } from "react-konva";

type EuclidCanvasProps = {

}

const EuclidCanvas: React.FC<EuclidCanvasProps> = ({ }) => {
    const [nodes, setNodes] = useState<{ [key: string]: Node }>({});

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Rect draggable width={50} height={50} fill="red" />
                <Circle draggable x={200} y={200} stroke="black" radius={50} />
            </Layer>
        </Stage>
    )
}

export default EuclidCanvas;