import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import Videos from '../components/Videos';

const Container = styled.div``;

const Main = styled.div`
  display: flex;
`;

const Feed = () => {
  return (
    <Container>
      <Navbar />
      <Main>
        <Menu />
        <Videos />
      </Main>
      <Footer />
    </Container>
  );
};

export default Feed;
