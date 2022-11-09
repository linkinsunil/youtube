import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useVideo } from '../context/videoContext';
import { sliderItems } from '../utilities/data';
import { mobile } from '../utilities/responsive.js';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  ${mobile({ display: 'none' })}
`;

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: #eaeaea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ direction }) => direction === 'left' && '10px'};
  right: ${({ direction }) => direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translate(${({ slideIndex }) => slideIndex * -100}vw);
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${({ bg }) => bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 60%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  flex: 1;
  font-size: 70px;
`;
const Desc = styled.p`
  flex: 1;
  font-size: 20px;
  letter-spacing: 3px;
  margin: 50px 0;
`;
const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Slider = () => {
  const navigate = useNavigate();

  const [slideIndex, setSlideIndex] = useState(0);
  const { dispatch } = useVideo();

  const handleArrow = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  const handleClick = item => {
    dispatch({
      type: 'FILTER_BY_CATEGORY',
      payload: item.categoryName.toLowerCase(),
    });
    navigate('/feed');
  };

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleArrow('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map(item => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.categoryName}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={() => handleClick(item)}>WATCH NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleArrow('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
