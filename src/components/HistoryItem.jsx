import {
  DeleteOutline,
  Favorite,
  FavoriteBorder,
  WatchLater,
  WatchLaterOutlined,
} from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useVideo } from '../context/videoContext';
import {
  addToWatchLater,
  removeFromWatchLater,
} from '../utilities/watchLater-utils';
import { mobile } from '../utilities/responsive.js';
import { likeVideo, dislikeVideo } from '../utilities/like-utils';
import { removeFromHistory } from '../utilities/history-utils';
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  deleteVideoFromPlaylist,
} from '../utilities/playlists-utils';

const Container = styled.div``;

const Wrapper = styled.div`
  flex: 1;
  margin: 5px;
  width: 280px;
  height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Image = styled.img`
  min-width: 100%;
  height: 60%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

const Title = styled.p`
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const Bottom = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: space-around;
  align-content: flex-end;
  padding-bottom: 10px;

  ${mobile({ justifyContent: 'center', flex: '2' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  padding: 10px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 1px 2px 0px,
      rgba(3, 102, 214, 0.3) 0px 2px 6px 2px;
  }

  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const PlaylistsContainer = styled.div`
  position: fixed;

  box-sizing: border-box;
  height: 100%;
  width: 80%;
  background-color: black;
  color: #fff;
  font-size: 12px;
  opacity: 0.9;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaylistsWrapper = styled.div`
  padding: 1rem;
  background-color: black;
  color: #fff;
  opacity: 0.7;
  display: flex;
  border: 0.5px solid lightgray;
  border-radius: 5px;
`;

const Playlist = styled.div`
  width: 73%;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const Right = styled.div``;

const Close = styled.p`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ffffff46;
    font-weight: bold;
  }
`;

const InputItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  /* background-color: lightblue; */
`;

const Input = styled.input`
  background-color: transparent;
  color: white;
  caret-color: white;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 4px;
  outline: none;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 2px 9px;
  font-size: 20px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #ffffff;
    color: black;
    font-weight: bold;
  }
`;

const HistoryItem = ({ item }) => {
  const [selectedVideo, setSelectedVideo] = useState({});
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [show, setShow] = useState(false);

  const {
    state: { likedVideos, watchLater, playlists },
    dispatch,
  } = useVideo();

  return (
    <Container>
      <Wrapper key={item._id}>
        <Image
          src={`https://i.ytimg.com/vi/${item._id}/maxresdefault.jpg`}
          onClick={() => Navigate(`/video/${item._id}`)}
        />
        <Title>{item.title}</Title>
        <Bottom>
          {watchLater.some(el => el._id === item._id) ? (
            <MenuItem>
              <WatchLater
                color='action'
                onClick={() => removeFromWatchLater(item, dispatch)}
              />
            </MenuItem>
          ) : (
            <MenuItem>
              <WatchLaterOutlined
                color='action'
                onClick={() => addToWatchLater(item, dispatch)}
              />
            </MenuItem>
          )}

          {likedVideos.some(el => el._id === item._id) ? (
            <MenuItem>
              <Favorite
                type='secondary'
                color='action'
                onClick={() => dislikeVideo(item, dispatch)}
              />
            </MenuItem>
          ) : (
            <MenuItem>
              <FavoriteBorder
                type='secondary'
                color='action'
                onClick={() => likeVideo(item, dispatch)}
              />
            </MenuItem>
          )}

          <MenuItem>
            <PlaylistAddIcon
              color='action'
              onClick={() => {
                setShow(!show);
                setSelectedVideo(item);
              }}
            />
          </MenuItem>

          <MenuItem>
            <DeleteOutline
              color='action'
              onClick={() => removeFromHistory(item, dispatch)}
            />
          </MenuItem>
        </Bottom>
      </Wrapper>
      <PlaylistsContainer style={{ display: show === true ? 'flex' : 'none' }}>
        <PlaylistsWrapper>
          <Left>
            {playlists.map(playlist => {
              return (
                <Playlist key={playlist._id}>
                  <InputItem>
                    <Input
                      type='checkbox'
                      onChange={event => {
                        console.log(event.target.checked);
                        event.target.checked
                          ? addVideoToPlaylist(
                              playlist._id,
                              selectedVideo,
                              dispatch
                            )
                          : deleteVideoFromPlaylist(
                              playlist._id,
                              selectedVideo._id,
                              dispatch
                            );
                      }}
                    />
                    <Label>{playlist.title}</Label>
                  </InputItem>
                  <DeleteOutline
                    style={{ cursor: 'pointer' }}
                    onClick={() => deletePlaylist(playlist._id, dispatch)}
                  />
                </Playlist>
              );
            })}
            <InputItem>
              <Input
                placeholder='add new playlist'
                value={playlistTitle}
                onChange={e => setPlaylistTitle(e.target.value)}
              />
              <Button
                onClick={() => {
                  createPlaylist(playlistTitle, dispatch);
                  setPlaylistTitle('');
                }}
              >
                +
              </Button>
            </InputItem>
          </Left>
          <Right>
            <Close onClick={() => setShow(!show)}>X</Close>
          </Right>
        </PlaylistsWrapper>
      </PlaylistsContainer>
    </Container>
  );
};

export default HistoryItem;
