import { useContext, useState } from "react";

import DataContext from "../providers";
import { DataContextType, Node } from "../types/types";
import EuclidCanvas from "./EuclidCanvas";
import NavBar from "./NavBar";
import { getBranch, getDeps, getRoot, removeNode } from "../data/dataUtils";
import NodeTextModal from "./NodeTextModal";

function App() {
  const { data } = useContext(DataContext) as DataContextType;
  const [openNode, setOpenNode] = useState<string>('');
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  const [edges, setEdges] = useState<Set<string>>(new Set<string>());

  const updateNodes = (nodes: { [key: string]: Node }) => {
    for (const nodeName in nodes) {
      let node = nodes[nodeName];
      node.x = node.x < 50 ? 50 : node.x;
      node.x = node.x > window.innerWidth - 50 ? window.innerWidth - 50 : node.x
      node.y = node.y < 50 ? 50 : node.y;
      node.y = node.y > window.innerWidth - 50 ? window.innerHeight - 50 : node.y
      nodes[nodeName] = node;
    }
    setNodes(nodes)
  }

  const displayNode = (node: string) => {
    const [nodes, edges] = getDeps(data, node, 700, 400);
    updateNodes(nodes);
    setEdges(edges);
  }

  const displayNodeRoot = (node: string) => {
    const [rootNodes, rootEdges] = getRoot(data, node, nodes[node].x, nodes[node].y);
    const edgesList: string[] = Array.from(edges).concat(Array.from(rootEdges))
    updateNodes({ ...nodes, ...rootNodes });
    setEdges(new Set<string>(edgesList));
  }

  const displayNodeBranch = (node: string) => {
    const [rootNodes, rootEdges] = getBranch(data, node, nodes[node].x, nodes[node].y);
    const edgesList: string[] = Array.from(edges).concat(Array.from(rootEdges))
    updateNodes({ ...nodes, ...rootNodes });
    setEdges(new Set<string>(edgesList));
  }

  const hideNode = (node: string) => {
    const [newNodes, newEdges] = removeNode(data, node, nodes, edges);
    updateNodes({ ...newNodes });
    setEdges(newEdges);
  }

  const showNodeText = (node: string) => {
    setOpenNode(node);
  }

  const nodeOps = {
    displayNode: displayNode,
    displayNodeRoot: displayNodeRoot,
    displayNodeBranch: displayNodeBranch,
    hideNode: hideNode,
    showNodeText: showNodeText,
  }

  // TODO: react router + about page
  return (
    <>
      <NodeTextModal node={openNode} closeModal={() => setOpenNode('')} />
      <NavBar updateDisplay={displayNode} />
      <EuclidCanvas nodes={nodes} edges={edges} nodeOperations={nodeOps} setNodes={setNodes} />
    </>
  );
}

export default App;
