import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Playlist from '../components/Playlist';
import Navbar from '../components/Navbar';
import { useVideo } from '../context/videoContext';
import { mobile } from '../utilities/responsive';
import { useEffect } from 'react';
import { getAllPlaylists } from '../utilities/playlists-utils';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === 'filled' && 'none'};
  background-color: ${props =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${props => props.type === 'filled' && 'white'};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;

  ${mobile({
    // width: '75%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
  })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const Playlists = () => {
  const {
    state: { playlists },
    dispatch,
  } = useVideo();

  const navigate = useNavigate();

  useEffect(() => {
    getAllPlaylists(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR PLAYLISTS ({playlists?.length})</Title>
        <Top>
          <TopButton onClick={() => navigate('/feed')}>BACK TO FEED</TopButton>
        </Top>
        {playlists?.length > 0 ? (
          <Bottom>
            <Playlist />
          </Bottom>
        ) : (
          <SummaryTitle
            style={{
              height: '60vh',
              display: 'grid',
              placeItems: 'center',
              fontWeight: '400',
            }}
          >
            You haven't created any playlist yet!
          </SummaryTitle>
        )}
      </Wrapper>
    </Container>
  );
};

export default Playlists;
