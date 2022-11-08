import styled from 'styled-components';
import { useVideo } from '../context/videoContext';
import { useNavigate } from 'react-router-dom';
import { mobile } from '../utilities/responsive.js';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  height: 30vh;
`;

const Image = styled.img`
  width: 50%;
  height: 50%;
  padding: 1rem;
  transition: 0.4s ease;
  cursor: pointer;

  &:hover {
    border: 1.5px solid black;
  }

  ${mobile({ height: '20vh' })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  border: 1.5px solid black;
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border: 1.5px solid black;
    background-color: black;
    color: white;
  }
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  const { dispatch } = useVideo();

  const handleClick = item => {
    dispatch({
      type: 'FILTER_BY_CATEGORY',
      payload: item.categoryName.toLowerCase(),
    });
    navigate('/feed');
  };

  return (
    <Container>
      <Image src={item.img} onClick={() => handleClick(item)} />
    </Container>
  );
};

export default CategoryItem;
