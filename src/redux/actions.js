// redux/actions.js

// Action Types
export const SET_TREE_DATA = 'SET_TREE_DATA';
export const SET_HIGHLIGHTED_NODES = 'SET_HIGHLIGHTED_NODES';
export const SET_ADDITIONAL_DATA = 'SET_ADDITIONAL_DATA';
export const SET_THEME = 'SET_THEME';

// Action Creators
export const setTreeData = (data) => ({
  type: SET_TREE_DATA,
  payload: data,
});

export const setHighlightedNodes = (nodes) => ({
  type: SET_HIGHLIGHTED_NODES,
  payload: nodes,
});

export const setAdditionalData = (data) => ({
  type: SET_ADDITIONAL_DATA,
  payload: data,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
