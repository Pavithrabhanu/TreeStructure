// redux/reducers.js
import { SET_TREE_DATA, SET_HIGHLIGHTED_NODES, SET_ADDITIONAL_DATA, SET_THEME } from './actions';

const initialState = {
  treeData: [],
  highlightedNodes: [],
  additionalData: null,
  theme: 'light', // default theme
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TREE_DATA:
      return { ...state, treeData: action.payload };
    case SET_HIGHLIGHTED_NODES:
      return { ...state, highlightedNodes: action.payload };
    case SET_ADDITIONAL_DATA:
      return { ...state, additionalData: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload }; // Set theme directly from payload
    default:
      return state;
  }
};

export default reducer;
