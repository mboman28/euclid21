import { useContext, useState } from "react";
import EuclidCanvas from "./EuclidCanvas";
import NavBar from "./NavBar";
import DataContext from "../providers";
import { DataContextType, Node } from "../types/types";
import { getDeps } from "../data/dataUtils";

function App() {
  const { data } = useContext(DataContext) as DataContextType;
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  const [edges, setEdges] = useState<Set<string>>(new Set<string>());

  const displayNode = (node: string) => {
    let [nodes, edges] = getDeps(data, node, 700, 400);
    setNodes(nodes);
    setEdges(edges);
  }

  const nodeOps = {
    displayNode: displayNode,
    displayNodeRoot: displayNode,
    displayNodeBranch: displayNode,
    removeNode: displayNode,
  }

  return (
    <>
      <NavBar updateDisplay={displayNode} />
      <EuclidCanvas nodes={nodes} edges={edges} nodeOperations={nodeOps} setNodes={setNodes} />
    </>
  );
}

export default App;
