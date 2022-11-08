import { v4 as uuidv4 } from 'uuid';

export const videoReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ALL_VIDEOS':
      return { ...state, allVideos: action.payload };

    case 'FETCH_HISTORY_VIDEOS':
      return { ...state, history: action.payload };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: action.payload,
      };

    case 'REMOVE_FROM_HISTORY':
      return {
        ...state,
        history: action.payload,
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: action.payload,
      };

    case 'FETCH_LIKED_VIDEOS':
      return { ...state, likedVideos: action.payload };

    case 'ADD_TO_LIKED-VIDEOS':
      return {
        ...state,
        likedVideos: action.payload,
      };

    case 'REMOVE_FROM_LIKED-VIDEOS':
      return {
        ...state,
        likedVideos: action.payload,
      };

    case 'FETCH_WATCH-LATER_VIDEOS':
      return { ...state, watchLater: action.payload };

    case 'ADD_TO_WATCH-LATER':
      return {
        ...state,
        watchLater: action.payload,
      };

    case 'REMOVE_FROM_WATCH-LATER':
      return {
        ...state,
        watchLater: action.payload,
      };

    case 'GET_ALL_PLAYLISTS':
      return { ...state, playlists: action.payload };

    case 'CREATE_NEW_PLAYLIST':
      return {
        ...state,
        playlists: action.payload,
      };

    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlists: action.payload,
      };

    case 'ADD_VIDEO_TO_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(el =>
          el._id === action.payload._id ? action.payload : el
        ),
      };

    case 'DELETE_VIDEO_FROM_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(el =>
          el._id === action.payload._id ? action.payload : el
        ),
      };

    case 'FILTER_BY_CURRENT-CATEGORY':
      return {
        ...state,
        currentCategory: action.payload,
      };

    case 'FILTER_BY_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};
