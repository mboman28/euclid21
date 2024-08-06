import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router";

import { Container } from "./shared"

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
                <Button onClick={() => {navigate('/?p=A0.1')}}>Axiom 1</Button>
                <Button onClick={() => {navigate('/?p=A0.2')}}>Axiom 2</Button>
                <Button onClick={() => {navigate('/?p=A0.3')}}>Axiom 3</Button>
                <Button onClick={() => {navigate('/?p=A0.4')}}>Axiom 4</Button>
                <Button onClick={() => {navigate('/?p=A0.5')}}>Axiom 5</Button>
            </ButtonContainer>
        </HomeContainer>
    );
}

const ButtonContainer = styled('div')({
    display: 'flex',
})

const HomeContainer = styled(Container)({
    backgroundImage: 'url("./img/PythThm.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    height: 650,
})

export default Home;