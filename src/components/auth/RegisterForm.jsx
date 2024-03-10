import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import useAuth from "../../hooks/useAtuh";
import Field from "../common/Field";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      const response = await api.post("/auth/register", formData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
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
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name is required" })}
          className={`auth-input ${errors.firstName && "border-red-500"}`}
          name="firstName"
          type="text"
          id="firstName"
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          className={`auth-input`}
          name="lastName"
          type="text"
          id="lastName"
        />
      </Field>
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
