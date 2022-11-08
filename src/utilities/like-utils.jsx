import axios from 'axios';

const getLikedVideos = async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/user/likes', {
      headers: { authorization: token },
    });
    dispatch({ type: 'FETCH_LIKED_VIDEOS', payload: res.data.likes });
  } catch (error) {
    console.log(error);
  }
};

const likeVideo = async (video, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      '/api/user/likes',
      { video },
      { headers: { authorization: token } }
    );
    dispatch({ type: 'ADD_TO_LIKED-VIDEOS', payload: res.data.likes });
  } catch (error) {
    console.log(error);
  }
};

const dislikeVideo = async (video, dispatch) => {
  try {
    console.log(video);
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/api/user/likes/${video._id}`, {
      headers: { authorization: token },
    });
    console.log(res);
    dispatch({ type: 'REMOVE_FROM_LIKED-VIDEOS', payload: res.data.likes });
  } catch (error) {
    console.log(error);
  }
};

export { getLikedVideos, likeVideo, dislikeVideo };
