import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router";

import { Container } from "./shared"
import { Link } from "react-router-dom";

type HomeProps = {
}

const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer >
            <h1>Euclid<sup>21</sup>: Euclid's Elements for the 21st Century</h1>
            <p>To get started, choose a proposition from the menu on the left.</p>
            <p>Or, start with one of the axioms:</p>
            <ButtonContainer>
                <AxiomButton onClick={() => {navigate('/?p=A0.1')}}>Axiom 1</AxiomButton>
                <AxiomButton onClick={() => {navigate('/?p=A0.2')}}>Axiom 2</AxiomButton>
                <AxiomButton onClick={() => {navigate('/?p=A0.3')}}>Axiom 3</AxiomButton>
                <AxiomButton onClick={() => {navigate('/?p=A0.4')}}>Axiom 4</AxiomButton>
                <AxiomButton onClick={() => {navigate('/?p=A0.5')}}>Axiom 5</AxiomButton>
            </ButtonContainer>
            <p>Or Common Notions:</p>
            <ButtonContainer>
                <CNButton onClick={() => {navigate('/?p=N0.1')}}>Common Notion 1</CNButton>
                <CNButton onClick={() => {navigate('/?p=N0.2')}}>Common Notion 2</CNButton>
                <CNButton onClick={() => {navigate('/?p=N0.3')}}>Common Notion 3</CNButton>
                <CNButton onClick={() => {navigate('/?p=N0.4')}}>Common Notion 4</CNButton>
                <CNButton onClick={() => {navigate('/?p=N0.5')}}>Common Notion 5</CNButton>
            </ButtonContainer>
            <p>To learn how to use this app, visit the <Link to='/help'>help page</Link>.</p>
            <p>For more information on this project, visit the <Link to='/about'>about page</Link>.</p>
            <p>Copyright © 2024 Mary Boman. Free to distribute under the <a href='https://www.gnu.org/licenses/#GPL'>GNU General Public License</a>.</p>
        </HomeContainer>
    );
}

const NodeButton = styled(Button)({
    color: 'black',
    textTransform: 'none',

    margin: '0 10px',
    padding: '5px 10px',
});

const AxiomButton = styled(NodeButton)({
    backgroundColor: 'lightblue',
});

const CNButton = styled(NodeButton)({
    backgroundColor: 'pink',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    width: 'fit-content',
})

const HomeContainer = styled(Container)({
    backgroundImage: 'url("./img/PythThm.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    height: 650,
})

export default Home;