import { StarRate, StarRateOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const Container = styled.div``;

const Rating = ({ rating, onClick, style }) => {
  return (
    <Container>
      {[...Array(5)].map((_, i) => (
        <span onClick={() => onClick(i)} style={style} key={i}>
          {rating > i ? (
            <StarRate style={{ fontSize: '15px', color: 'orange' }} />
          ) : (
            <StarRateOutlined style={{ fontSize: '15px' }} />
          )}
        </span>
      ))}
    </Container>
  );
};

export default Rating;
