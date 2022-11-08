import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { videoReducer } from './videoReducer';

const VideoContext = createContext();

const initialState = {
  allVideos: [],
  playlists: [],
  likedVideos: [],
  watchLater: [],
  history: [],
  category: 'All',
};

const VideoProvider = ({ children }) => {
  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const { data, status } = await axios.get('/api/videos');
        status === 200 &&
          dispatch({ type: 'FETCH_ALL_VIDEOS', payload: data.videos });
      } catch (error) {
        console.log(error);
      }
    };
    getAllVideos();
  }, []);

  const [state, dispatch] = useReducer(videoReducer, initialState);
  console.log('state', state);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
