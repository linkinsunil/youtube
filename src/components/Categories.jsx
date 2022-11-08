import styled from 'styled-components';
import { mobile } from '../utilities/responsive';
import CategoryItem from './CategoryItem';
import { categories } from '../backend/db/categories';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${mobile({ padding: '0px', flexDirection: 'column' })}
`;

const Text = styled.h3`
  margin-top: 20px;
`;

const Categories = () => {
  return (
    <Container>
      <Text>Categories</Text>
      <Wrapper>
        {categories.map(item => (
          <CategoryItem key={item._id} item={item} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Categories;
