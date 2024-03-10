import { useState } from "react";
import actions from "../../actions";
import { api } from "../../api";
import CheckIcon from "../../assets/icons/check.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";

const Bio = () => {
  const [editMode, setEditMode] = useState(false);
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const handleEditBio = async (e) => {
    console.log(e);
    e.preventDefault();
    console.log(2);
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(`/profile/${state?.user?.id}`, { bio });
      if (response.status === 200) {
        dispatch({ type: actions.profile.DATA_EDITED, data: response.data });
      }
      setEditMode(false);
    } catch (error) {
      error;
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      {editMode ? (
        <>
          <form className="flex items-start gap-2">
            <div className="flex-1">
              <textarea
                name="bio"
                id="bio"
                className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
                cols={55}
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex-center h-7 w-7 rounded-full"
              onClick={handleEditBio}
            >
              <img src={CheckIcon} alt="Edit" />
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="flex-1">
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio}
            </p>
          </div>
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(true)}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        </>
      )}
    </div>
  );
};

export default Bio;
