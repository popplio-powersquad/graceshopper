import axios from 'axios';

const SET_MEME = 'SET_MEME';
const EDIT_MEME = 'EDIT_MEME';

const setMeme = (meme) => ({
  type: SET_MEME,
  meme,
});

const updateMeme = (meme) => ({
  type: EDIT_MEME,
  meme,
});

export const getMeme = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get(`/api/memes/${id}`,{headers:{Authorization:token}});
      dispatch(setMeme(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const editMeme = (meme) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")
      const { data: memeEdit } = await axios.put(`/api/memes/${meme.id}`, meme, {headers:{Authorization:token}});
      dispatch(updateMeme(memeEdit));
    } catch (error) {
      console.error(error);
    }
  };
};

const singleMemeReducer = (meme = {}, action) => {
  switch (action.type) {
    case SET_MEME:
      return action.meme;
    case EDIT_MEME:
      return { ...meme, ...action.meme };
    default:
      return meme;
  }
};

export default singleMemeReducer;
