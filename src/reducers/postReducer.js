import actions from "../actions";

const initialState = {
  loading: false,
  error: null,
  posts: [],
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.posts.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.posts.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    }

    case actions.posts.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.posts.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.posts.DATA_EDITED: {
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    }

    case actions.posts.DATA_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.data),
      };
    }

    default:
      return state;
  }
};

export { initialState, postReducer };
