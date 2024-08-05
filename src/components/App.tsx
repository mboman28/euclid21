import { useContext, useState } from "react";
import ReactModal from 'react-modal';

import DataContext from "../providers";
import { DataContextType, Node } from "../types/types";
import EuclidCanvas from "./EuclidCanvas";
import NavBar from "./NavBar";
import { getBranch, getDeps, getRoot, removeNode } from "../data/dataUtils";

function App() {
  const { data } = useContext(DataContext) as DataContextType;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  const [edges, setEdges] = useState<Set<string>>(new Set<string>());

  const displayNode = (node: string) => {
    const [nodes, edges] = getDeps(data, node, 700, 400);
    setNodes(nodes);
    setEdges(edges);
  }

  const displayNodeRoot = (node: string) => {
    const [rootNodes, rootEdges] = getRoot(data, node, nodes[node].x, nodes[node].y);
    const edgesList: string[] = Array.from(edges).concat(Array.from(rootEdges))
    setNodes({...nodes, ...rootNodes});
    setEdges(new Set<string>(edgesList));
  }

  const displayNodeBranch = (node: string) => {
    const [rootNodes, rootEdges] = getBranch(data, node, nodes[node].x, nodes[node].y);
    const edgesList: string[] = Array.from(edges).concat(Array.from(rootEdges))
    setNodes({...nodes, ...rootNodes});
    setEdges(new Set<string>(edgesList));
  }
  
  const hideNode = (node: string) => {
    const [newNodes, newEdges] = removeNode(data, node, nodes, edges);
    setNodes({...newNodes});
    setEdges(newEdges);
  }

  const nodeOps = {
    displayNode: displayNode,
    displayNodeRoot: displayNodeRoot,
    displayNodeBranch: displayNodeBranch,
    hideNode: hideNode,
    showNodeText: (n: string) => {}
  }

  return (
    <>
      <ReactModal isOpen={modalOpen}></ReactModal>
      <NavBar updateDisplay={displayNode} />
      <EuclidCanvas nodes={nodes} edges={edges} nodeOperations={nodeOps} setNodes={setNodes} />
    </>
  );
}

export default App;
