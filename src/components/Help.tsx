import { Container } from "./shared";

type HelpProps = {
}

const Help: React.FC<HelpProps> = () => {

    return (
        <Container>
            <h4>Functionality</h4>
            <ol>
                <li>This application represents all 13 books of Euclid’s <i>The Elements.</i> Each proposition is rendered visually as a circular node with arrows pointing into or out of it. For example, Book 1, Proposition 47 (The Pythagorean Theorem) appears as a yellow circle with “1.47” in black text inside of it.<br />
                    <ul>
                        <li>Arrows pointing into a node originate at a node which is used to prove the proposition.</li>
                        <li>Arrows originating at a node point to propositions which cite it.</li>
                    </ul>
                </li>
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
                <li>Double-click a node to see that text</li>
                <li>Right-click for dropdown menu:
                    <ul>
                        <li><b>Root</b> - display graph level one up (all nodes referenced in the proof of the current node)</li>
                        <li><b>Branch</b> - display graph level one down (all nodes whose proof references the current node)</li>
                        <li><b>Display This Node</b> - display that node along with its root and branch in display area; all other nodes will disappear</li>
                        <li><b>Hide This Node</b> - deletes the node; the node and all its edges will disappear along with any other nodes that are no longer attached to any edges</li>
                        <li><b>Highlight</b> - all arrows in and out of the node are highlighted in red; if this node is currently highlighted, this reverses</li>
                    </ul>
                </li>
            </ol>
            <p>Copyright © 2024 Mary Boman. Free to distribute under the <a href='https://www.gnu.org/licenses/#GPL'>GNU General Public License</a>.</p>
        </Container>
    );
}

export default Help;