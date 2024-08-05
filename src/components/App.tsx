import { useState } from "react";
import EuclidCanvas from "./EuclidCanvas";
import NavBar from "./NavBar";

function App() {
  const [node, setNode] = useState<string>('P1.1');
  // const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  // // TODO: Edges should be... a set? of string? (format 'A0.3, P1.1')? so we're not drawing the same edge twice?
  // const [edges, setEdges] = useState<Edge[]>([]);

  return (
    <>
      <NavBar setNode={setNode} />
      <EuclidCanvas startNode={node} />
    </>
  );
}

export default App;
