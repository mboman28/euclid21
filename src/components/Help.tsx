import { Container } from "./shared";

type HelpProps = {
}

const Help: React.FC<HelpProps> = () => {

    return (
        <Container>
            <h4>Functionality:</h4>
            <ol>
                <li>This application represents all 13 books of Euclid’s The Elements. Each proposition is rendered visually as a circular node with arrows pointing into or out of it. For example, Book 1, Proposition 47 (The Pythagorean Theorem) appears as a yellow circle with “1.47” in black text inside of it.<br />
                    Arrows pointing into a node originate at a node which is used to prove the proposition.<br />
                    Arrows originating at node 1.47 point to propositions which cite it.</li>
                <li>Nodes are displayed as follows:
                    <ul>
                        <li>Yellow: Propositions</li>
                        <li>Blue: Axioms</li>
                        <li>Pink: Common Notions</li>
                        <li>Green: Definitions</li>
                    </ul>
                </li>
            </ol>
            <h4>Mouse interactions in the display area</h4>
            <ol>
                <li>Double-click a note to see that text</li>
                <li>Right-click for pull-down menu:
                    <ul>
                        <li><strong>Root</strong> - display graph level one up (all nodes referenced in the proof of the current node)</li>
                        <li><strong>Branch</strong> - display graph level one down (all nodes whose proof refer- ences the current node)</li>
                        <li><strong>Display This Node</strong> - display that node along with its root and branch in display area; all other nodes will disappear</li>
                        <li><strong>Hide This Node</strong> - deletes the node; the node and all its edges will disappear along with any other nodes that are no longer attached to any edges</li>
                        <li><strong>Highlight</strong> - all arrows in and out of the node are highlighted in red; if this node is currently highlighted, this reverses</li>
                    </ul>
                </li>
            </ol>
        </Container>
    );
}

export default Help;