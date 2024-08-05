import { useContext, useState } from "react";
import EuclidCanvas from "./EuclidCanvas";
import NavBar from "./NavBar";
import DataContext from "../providers";
import { DataContextType, Node } from "../types/types";
import { getDeps } from "../data/dataUtils";

function App() {
  const { data } = useContext(DataContext) as DataContextType;
  // const [node, setNode] = useState<string>('P1.1');
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  // TODO: Edges should be... a set? of string? (format 'A0.3, P1.1')? so we're not drawing the same edge twice?
  const [edges, setEdges] = useState<Set<string>>(new Set<string>());

  const updateVisibleNodes = (node: string) => {
    let [nodes, edges] = getDeps(data, node, 700, 400);
    setNodes(nodes);
    setEdges(edges);
  }

  return (
    <>
      <NavBar chooseNodes={updateVisibleNodes} />
      <EuclidCanvas nodes={nodes} edges={edges} setNodes={setNodes} />
    </>
  );
}

export default App;
