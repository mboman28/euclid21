import { Button, styled } from "@mui/material";

import { Container } from "./shared"

type HomeProps = {
}

const Home: React.FC<HomeProps> = () => {

    return (
        <HomeContainer >
            <h1>Euclid<sup>21</sup>: Euclid's Elements for the 21st Century</h1>
            <p>To get started, choose a proposition from the menu on the left.</p>
            {/* <p>Or, start with one of the axioms:</p>
            <div>
                <Button></Button>
            </div> */}
        </HomeContainer>
    );
}

const HomeContainer = styled(Container)({
    backgroundImage: 'url("./img/PythThm.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    height: 650,
})

export default Home;