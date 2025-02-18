import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/man-hands-hold-touch-tablet-pc-with-login-box-travel-concept.jpg";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urls = [
    // "https://work-notes-server.onrender.com/todo/login/",
    // "http://localhost:8000/todo/login/",
    "http://localhost:8000/auth/login",
  ];

  const from = location.state?.form?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    try {
      const requests = urls.map((url) =>
        axios.post(url, {
          email: email,
          password: password,
        })
      );
      const response = await Promise.any(requests);

      // await axios.post("http://localhost:8000/todo/login/", {
      //   email: email,
      //   password: password,
      // });
      console.log(response.data);
      if (response.data?.data?.refreshToken) {
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("userId", response.data.data.user._id);

        navigate(from, { replace: true });
        toast.success("Logged In successfully", { duration: 6000 });
        console.log("Login successful", response.data);
      } else {
        console.error("No refreshToken returned from API");
      }
    } catch (error) {
      toast.error("Login information is Not correct", { duration: 6000 });

      console.error(
        "Login failed",
        error.response ? error.response.data : error
      );
    }
  };
  return (
    <div>
      <div className="w-full h-screen block md:flex">
        <div className="w-full md:w-1/2 h-48 md:h-full">
          <img src={loginImg} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-sm text-nowrap md:text-xl font-bold ml-6 md:ml-16 text-violet-600 my-6 md:my-12">
            Welcom To Work Notes
          </h1>

          <h1 className="text-2xl md:text-3xl text-gray-700 font-bold ml-6 md:ml-16 mt-6 md:mt-12">
            LOGIN
          </h1>
          <p className="text-xs md:text-sm text-nowrap text-gray-700 font-bold ml-6 md:ml-16">
            Work Notes wants you to be Login
          </p>

          <form onSubmit={handleLogin} className="mx-4 md:mx-14 py-6 md:py-16">
            <div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-violet-600 text-xs font-bold mb-2">
                  email
                </label>
                <input
                  className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700 "
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-violet-500 text-xs font-bold mb-2">
                  password
                </label>
                <input
                  className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <input
                className="bg-violet-400 w-full py-3 cursor-pointer rounded-lg font-bold"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <div className="flex justify-between px-14">
            <p className="">
              New Here?{" "}
              <Link to="/signup" className="underline">
                Signup here
              </Link>
            </p>
            <p className="">
              <Link to="/forgot-password" className="underline">
                Fogot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
