import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { mobile } from '../utilities/responsive';
import { useParams } from 'react-router-dom';
import { useVideo } from '../context/videoContext';
import { useState, useEffect } from 'react';
import {
  DeleteOutline,
  Favorite,
  FavoriteBorder,
  WatchLater,
  WatchLaterOutlined,
} from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from 'axios';
import {
  addToWatchLater,
  removeFromWatchLater,
} from '../utilities/watchLater-utils';
import { dislikeVideo, likeVideo } from '../utilities/like-utils';
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  deleteVideoFromPlaylist,
} from '../utilities/playlists-utils';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;

  ${mobile({ padding: '10px', flexDirection: 'column' })}
`;

const Info = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: 700;
`;

const Options = styled.div`
  display: flex;
`;

const PlaylistsContainer = styled.div`
  position: fixed;
  top: 0;

  box-sizing: border-box;
  height: 100%;
  width: 90%;
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

const Desc = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;

const Category = styled.p`
  padding: 5px 10px;
  width: fit-content;
  font-weight: 300;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgLighter};
  border: 0.5px solid ${({ theme }) => theme.textSoft};
  border-radius: 99px;
`;

const VideoDetail = () => {
  const {
    state: { likedVideos, watchLater, playlists, allVideos },
    dispatch,
  } = useVideo();
  const [selectedVideo, setSelectedVideo] = useState({});
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [show, setShow] = useState(false);

  console.log('allVideos', allVideos);

  let { videoId } = useParams();
  console.log('videoId', videoId);

  useEffect(() => {
    const getVideo = async () => {
      const res = await axios.get(`/api/video/${videoId}`);
      console.log('🟠videoDetail res', res);
    };

    getVideo();
  }, [videoId]);

  const video = allVideos?.find(item => item._id === videoId);
  console.log('video', video);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <iframe
          width='100%'
          height='415'
          src={`https://www.youtube.com/embed/${video?._id}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <Info>
          <TitleContainer>
            <Title>{video.title}</Title>
            <Options>
              {watchLater.some(el => el._id === video._id) ? (
                <MenuItem>
                  <WatchLater
                    color='action'
                    onClick={() => removeFromWatchLater(video, dispatch)}
                  />
                </MenuItem>
              ) : (
                <MenuItem>
                  <WatchLaterOutlined
                    color='action'
                    onClick={() => addToWatchLater(video, dispatch)}
                  />
                </MenuItem>
              )}

              {likedVideos.some(el => el._id === video._id) ? (
                <MenuItem>
                  <Favorite
                    type='secondary'
                    color='action'
                    onClick={() => dislikeVideo(video, dispatch)}
                  />
                </MenuItem>
              ) : (
                <MenuItem>
                  <FavoriteBorder
                    type='secondary'
                    color='action'
                    onClick={() => likeVideo(video, dispatch)}
                  />
                </MenuItem>
              )}

              <MenuItem>
                <PlaylistAddIcon
                  color='action'
                  onClick={() => {
                    setShow(!show);
                    setSelectedVideo(video);
                  }}
                />
              </MenuItem>
            </Options>
            <PlaylistsContainer
              style={{ display: show === true ? 'flex' : 'none' }}
            >
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
          </TitleContainer>
          <Desc>{video.description}</Desc>
          <Category>{video.category}</Category>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default VideoDetail;
