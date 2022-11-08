import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import youtube from '../images/youtube.svg';
import {
  ReactJs,
  CssThree,
  Html5,
  Javascript,
  Nodedotjs,
  Mongodb,
} from '@icons-pack/react-simple-icons';
import HomeIcon from '@mui/icons-material/Home';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { useState } from 'react';
import {
  FavoriteBorder,
  FiberNewOutlined,
  PlaylistPlayOutlined,
  WatchLaterOutlined,
} from '@mui/icons-material';
import { useVideo } from '../context/videoContext';
import { categories } from '../backend/db/categories';

const Container = styled.div`
  flex: 1;
  min-width: 6rem;
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  width: 78%;
  flex-direction: column;
  align-items: start;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 3px;
  width: 200px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
  width: 100%;
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const token = localStorage.getItem('token');
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
      <Wrapper>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Img src={youtube} />
            CoupleOfCode
          </Logo>
        </Link>

        <Item onClick={() => navigate('/feed')}>
          <HomeIcon />
          Feed
        </Item>
        <Link
          to='/playlists'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Item>
            <PlaylistPlayOutlined />
            Playlists
          </Item>
        </Link>
        <Link
          to='/likedVideos'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Item>
            <FavoriteBorder />
            Liked Videos
          </Item>
        </Link>
        <Hr />
        <Item onClick={() => navigate('/watchLater')}>
          <WatchLaterOutlined />
          Watch Later
        </Item>
        <Item onClick={() => navigate('/history')}>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!token && (
          <>
            <Login>
              Sign in to like videos, comment and subscribe.
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>Best of CoupleOfCode</Title>
        {categories.map((item, idx) => (
          <Item key={idx} onClick={() => handleClick(item)}>
            {item.icon}
            {item.categoryName}
          </Item>
        ))}
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? 'Light' : 'Dark'} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
