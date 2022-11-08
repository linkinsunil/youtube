import {
  FavoriteBorder,
  HistoryOutlined,
  Search,
  WatchLaterOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styled from 'styled-components';
import { mobile } from '../utilities/responsive.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: ${({ theme }) => theme.text};

  &::before {
    content: '< ';
  }

  &::after {
    content: ' />';
  }

  ${mobile({ fontSize: '24px' })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center', flex: '2' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(false);

  const handleWishlist = () => {
    navigate('/likedVideos');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: 'grey', fontSize: '16px' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate('/')}>CoupleOfCode</Logo>
        </Center>
        <Right>
          <MenuItem>
            <HistoryOutlined
              color='action'
              onClick={() => navigate('/history')}
            />
          </MenuItem>
          <MenuItem>
            <WatchLaterOutlined
              color='action'
              onClick={() => navigate('/watchLater')}
            />
          </MenuItem>
          <MenuItem onClick={handleWishlist}>
            <FavoriteBorder color='action' />
          </MenuItem>
          <MenuItem>
            <PlaylistPlayIcon
              color='action'
              onClick={() => navigate('/playlists')}
            />
          </MenuItem>
          <MenuItem>
            {!token ? (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            ) : (
              <Link to='/feed' style={{ textDecoration: 'none' }}>
                <Button onClick={() => localStorage.clear()}>
                  <AccountCircleOutlinedIcon />
                  LOGOUT
                </Button>
              </Link>
            )}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
