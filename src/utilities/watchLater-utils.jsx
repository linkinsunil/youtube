import axios from 'axios';

const getWatchLaterVideos = async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/user/watchlater', {
      headers: { authorization: token },
    });
    dispatch({
      type: 'FETCH_WATCH-LATER_VIDEOS',
      payload: res.data.watchlater,
    });
  } catch (error) {
    console.log(error);
  }
};

const addToWatchLater = async (video, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      '/api/user/watchlater',
      { video },
      { headers: { authorization: token } }
    );
    dispatch({ type: 'ADD_TO_WATCH-LATER', payload: res.data.watchlater });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const removeFromWatchLater = async (video, dispatch) => {
  try {
    console.log(video);
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/api/user/watchlater/${video._id}`, {
      headers: { authorization: token },
    });
    console.log(res);
    dispatch({ type: 'REMOVE_FROM_WATCH-LATER', payload: res.data.watchlater });
  } catch (error) {
    console.log(error);
  }
};

export { getWatchLaterVideos, addToWatchLater, removeFromWatchLater };
