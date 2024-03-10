import { useForm } from "react-hook-form";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "../common/Field";

const ManagePost = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const attachFile = async (e) => {
    e.target.files;
    const file = e.target.files[0];
  };

  const submitForm = (formData) => {
    console.log(formData, 2);
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div class="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
        <div class="flex items-center gap-3">
          <img
            class="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
            alt="avatar"
          />
          <div>
            <h6 class="text-lg lg:text-xl">
              {user.firstName} {user.lastName}
            </h6>

            <span class="text-sm text-gray-400 lg:text-base">Public</span>
          </div>
        </div>

        <label
          class="btn-primary cursor-pointer !text-gray-100"
          htmlFor="image"
        >
          <img src={AddPhoto} alt="Add Photo" />
          Add Photo
        </label>
        <input
          {...register("image")}
          type="file"
          name="image"
          id="image"
          class="hidden"
          onChange={attachFile}
        />
      </div>

      <Field label="" error={errors.content}>
        <textarea
          {...register("content", {
            required: "Adding some content is required!",
          })}
          name="content"
          id="content"
          placeholder="Share your thoughts..."
          class={`h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px] ${
            errors.content && "border-red-500"
          }`}
        ></textarea>
      </Field>
      <div class="border-t border-[#3F3F3F] pt-4 lg:pt-6">
        <button
          class="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default ManagePost;
