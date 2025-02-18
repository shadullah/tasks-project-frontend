import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const handleResetPass = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    for (let [key, value] of formdata.entries()) {
      console.log(key, value);
    }
    console.log(token, userId);
    console.log(formdata.get("password"));

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/reset-password",
        { token, userId, password: formdata.get("password") }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success("Password reset succussfull. Please login now!!");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error reseting password", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center h-[550px]">
        <div className="bg-gray-200/30 shadow-lg rounded-2xl p-16 w-[500px]">
          <h1 className="font-bold text-3xl mb-10 text-center leading-relaxed">
            Enter new password
          </h1>
          <div className="w-full px-3 mb-6">
            <form onSubmit={handleResetPass}>
              <label className="block uppercase tracking-wide text-violet-500 text-xs font-bold mb-2">
                password
              </label>
              <input
                className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700 outline-none"
                name="password"
                type="password"
                placeholder="Enter new password"
                required
              />
              <div className="text-center mt-6">
                <input
                  className="bg-violet-400 w-full py-3 cursor-pointer rounded-lg font-bold"
                  type="submit"
                  value="Update Password"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
