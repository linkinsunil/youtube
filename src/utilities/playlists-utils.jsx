import axios from 'axios';

const getAllPlaylists = async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/user/playlists', {
      headers: { authorization: token },
    });
    dispatch({ type: 'GET_ALL_PLAYLISTS', payload: res.data.playlists });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const createPlaylist = async (title, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      '/api/user/playlists',
      {
        playlist: { title: title, description: '' },
      },
      { headers: { authorization: token } }
    );
    dispatch({ type: 'CREATE_NEW_PLAYLIST', payload: res.data.playlists });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const deletePlaylist = async (id, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/api/user/playlists/${id}`, {
      headers: { authorization: token },
    });
    dispatch({ type: 'DELETE_PLAYLIST', payload: res.data.playlists });
  } catch (error) {
    console.log(error);
  }
};

const addVideoToPlaylist = async (id, video, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `/api/user/playlists/${id}`,
      { video },
      { headers: { authorization: token } }
    );
    dispatch({ type: 'ADD_VIDEO_TO_PLAYLIST', payload: res.data.playlist });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const deleteVideoFromPlaylist = async (id, videoId, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/api/user/playlists/${id}/${videoId}`, {
      headers: { authorization: token },
    });
    dispatch({
      type: 'DELETE_VIDEO_FROM_PLAYLIST',
      payload: res.data.playlist,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllPlaylists,
  createPlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
};
