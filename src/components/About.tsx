import { Container } from "./shared";

type AboutProps = {
}

const About: React.FC<AboutProps> = () => {
    return (
        <Container>
            <h2>About</h2>
            This was originally created as a standalone Java application between January 2012 to April 2014 by:
            <ul>
                <li>Dr. Eugene Boman, Associate Professor of Mathematics, Penn State, Harrisburg</li>
                <li>Students at Penn State, Harrisburg:
                    <ul>
                        <li>Tyler Brown</li>
                        <li>Siddharth Dahiya</li>
                        <li>Joseph Roberge</li>
                        <li>Alexandra Milbrand</li>
                    </ul>
                </li>    
                <li>Mary Boman, Student, Bryn Mawr College</li>
            </ul>

            <p>The original paper, including a link to the original Java code, can be found here: <a href='https://old.maa.org/press/periodicals/convergence/euclid21-euclids-elements-for-the-21st-century'>Euclid<sup>21</sup>: Euclid's Elements for the 21st Century</a>.</p>

            <p>Updated version written in React for the web by Mary Boman and hosted with GitHub Pages. Source code can be found in the <a href="https://github.com/mboman28/euclid21">GitHub repository</a>.</p>

            <p>Copyright © 2024 Mary Boman. Free to distribute under the <a href='https://www.gnu.org/licenses/#GPL'>GNU General Public License</a>.</p>
        </Container>
    );
}

export default About;