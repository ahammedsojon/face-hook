import actions from "../../actions";
import { api } from "../../api";
import EditIcon from "../../assets/icons/edit.svg";
import Avatar from "../../assets/images/avatars/profile.png";
import useProfile from "../../hooks/useProfile";

const Image = () => {
  const { state, dispatch } = useProfile();
  const avatarUrl =
    state?.user?.avatar &&
    `${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`;
  const avatar = avatarUrl || Avatar;
  const handleAvatar = async (e) => {
    e.target.files;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.post(
        `/profile/${state?.user?.id}/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (error) {
      error;
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full max-h-[180px] rounded-full object-contain"
        src={avatar}
        alt={state?.user?.fistName}
      />

      <label
        htmlFor="uploadAvatar"
        className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
      >
        <img src={EditIcon} alt="Edit" />
        <input
          type="file"
          id="uploadAvatar"
          accept="image/*"
          hidden
          onChange={(e) => handleAvatar(e)}
        />
      </label>
    </div>
  );
};

export default Image;
