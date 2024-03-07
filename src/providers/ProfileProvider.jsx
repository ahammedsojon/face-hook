/* eslint-disable react/prop-types */

import { useReducer } from "react";
import { ProfileContext } from "../context";
import { initialState, profileReducer } from "../reducers/profileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  console.log(state, dispatch);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
