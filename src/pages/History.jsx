import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HistoryItem from '../components/HistoryItem';
import { useVideo } from '../context/videoContext';
import { mobile } from '../utilities/responsive.js';
import { useEffect } from 'react';
import { getHistoryVideos } from '../utilities/history-utils';

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

const History = () => {
  const {
    state: { history },
    dispatch,
  } = useVideo();

  const navigate = useNavigate();

  useEffect(() => {
    getHistoryVideos(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR WATCH HISTORY ({history?.length})</Title>
        <Top>
          <TopButton onClick={() => navigate('/feed')}>BACK TO FEED</TopButton>
          <TopTexts>
            <TopButton onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}>
              CLEAR HISTORY
            </TopButton>
          </TopTexts>
        </Top>
        {history?.length > 0 ? (
          <Bottom>
            {history.map(item => (
              <HistoryItem item={item} key={item._id} />
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
            You don't have any watch history
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default History;
