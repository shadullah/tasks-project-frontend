import axios from "axios";
import toast from "react-hot-toast";

const PasswordForgotPage = () => {
  const handleForgotReq = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // console.log(formData);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email: formData.get("email") }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success("Email sent successfully!!");
      }
    } catch (error) {
      console.log("Error email sending", error);
      //   const errorMessage = error.response?.data || "";
      toast.error("Email couldn't be sent");
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-center h-[550px]">
        <div className="bg-gray-200/30 shadow-lg rounded-2xl p-16 w-[500px]">
          <h1 className="font-bold text-3xl mb-10 text-center leading-relaxed">
            Enter your email to Reset password
          </h1>
          <div className="w-full px-3 mb-6">
            <form onSubmit={handleForgotReq}>
              <label className="block uppercase tracking-wide text-violet-500 text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700 outline-none"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
              <div className="text-center mt-6">
                <input
                  className="bg-violet-400 w-full py-3 cursor-pointer rounded-lg font-bold"
                  type="submit"
                  value="Reset Password"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForgotPage;
