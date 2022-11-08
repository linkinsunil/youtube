import axios from 'axios';

const getHistoryVideos = async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/user/history', {
      headers: { authorization: token },
    });
    dispatch({ type: 'FETCH_HISTORY_VIDEOS', payload: res.data.history });
  } catch (error) {
    console.log(error);
  }
};

const addToHistory = async (video, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      '/api/user/history',
      { video },
      { headers: { authorization: token } }
    );
    dispatch({ type: 'ADD_TO_HISTORY', payload: res.data.history });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const removeFromHistory = async (video, dispatch) => {
  try {
    console.log(video);
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/api/user/history/${video._id}`, {
      headers: { authorization: token },
    });
    console.log(res);
    dispatch({ type: 'REMOVE_FROM_HISTORY', payload: res.data.history });
  } catch (error) {
    console.log(error);
  }
};

const clearHistory = async (video, dispatch) => {
  try {
    console.log(video);
    const token = localStorage.getItem('token');
    const res = await axios.delete('/api/user/history/all', {
      headers: { authorization: token },
    });
    console.log(res);
    dispatch({ type: 'CLEAR_HISTORY', payload: res.data.history });
  } catch (error) {
    console.log(error);
  }
};

export { getHistoryVideos, addToHistory, removeFromHistory, clearHistory };
