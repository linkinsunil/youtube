import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LikedVideo from '../components/LikedVideo';
import { useVideo } from '../context/videoContext';
import { mobile } from '../utilities/responsive';
import { useEffect } from 'react';
import axios from 'axios';
import { getLikedVideos } from '../utilities/like-utils';

const Container = styled.div``;

const Wrapper = styled.div`
  align-items: center;
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

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  ${mobile({
    // width: '75%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
  })}
`;

const LikedVideos = () => {
  const {
    state: { playlists, likedVideos },
    dispatch,
  } = useVideo();

  const navigate = useNavigate();

  useEffect(() => {
    getLikedVideos(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>VIDEOS YOU LIKED ({likedVideos?.length})</Title>
        <Top>
          <TopButton onClick={() => navigate('/feed')}>BACK TO FEED</TopButton>
          <TopTexts>
            <TopText onClick={() => navigate('/playlists')}>
              Your Playlists ({playlists.length})
            </TopText>
          </TopTexts>
        </Top>
        {likedVideos.length > 0 ? (
          <Bottom>
            {likedVideos.map(item => (
              <LikedVideo item={item} key={item._id} />
            ))}
          </Bottom>
        ) : (
          <Bottom
            style={{
              height: '60vh',
              display: 'grid',
              placeItems: 'center',
              fontSize: '30px',
            }}
          >
            You haven't liked any video 💔
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default LikedVideos;
