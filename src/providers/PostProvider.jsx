/* eslint-disable react/prop-types */

import { useReducer } from "react";
import { PostContext } from "../context";
import { initialState, postReducer } from "../reducers/postReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  state, dispatch;
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default ProfileProvider;
