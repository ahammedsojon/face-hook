import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import useAuth from "../../hooks/useAtuh";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData);
      if (response.status === 200) {
        const { user, token } = response.data;
        const authToken = token?.token;
        const refreshToken = token?.refreshToken;
        setAuth({ user, authToken, refreshToken });
        console.log(`Login time auth token ${authToken}`);
        console.log(user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with ${formData.email} is not found!`,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is required" })}
          className={`auth-input ${errors.email && "border-red-500"}`}
          name="email"
          type="email"
          id="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`auth-input ${errors.email && "border-red-500"}`}
          name="password"
          type="password"
          id="password"
        />
      </Field>
      <div role="alert" className="text-red-600 mb-2">
        {errors?.root?.random?.message}
      </div>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
