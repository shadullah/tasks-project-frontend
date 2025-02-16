// import Link from "n";
import { useState } from "react";
import { CiUnlock } from "react-icons/ci";
import { LuListTodo } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const NavNext = () => {
  const [nav, setNav] = useState(false);
  //   const [clr, setClr] = useState("transparent");
  //   const [txtclr, setTxtclr] = useState("white");
  const urls = [
    // "https://work-notes-server.onrender.com/todo/logout/",
    // "http://localhost:8000/todo/logout/",
    "http://localhost:8000/auth/logout",
  ];
  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const requests = urls.map((url) =>
        axios.post(url, {
          headers: {
            Authorization: `Token ${localStorage.getItem("refreshToken")}`,
          },
        })
      );
      const res = await Promise.any(requests);
      if (res.status == 200) {
        console.log("logout successfull");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
      }
      toast.success("Logout Success");
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  //   useEffect(() => {
  //     setCartItemsCnt(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  //   }, [cart.cartItems]);

  //   useEffect(() => {
  //     const changeClr = () => {
  //       if (window.scrollY >= 90) {
  //         setClr("#ffffff");
  //         setTxtclr("#000000");
  //       } else {
  //         setClr("transparent");
  //         setTxtclr("#ffffff");
  //       }
  //     };
  //     window.addEventListener("scroll", changeClr);
  //   }, []);

  return (
    <div>
      <div
        // style={{ backgroundColor: `${clr}` }}
        className="bg-gray-800 fixed left-0 top-0 w-full z-10 ease-in duration-300"
      >
        <div className="m-auto flex justify-between items-center py-4 px-6 md:px-12 text-white">
          <div>
            <Link onClick={() => window.location.reload()} href="/">
              <span className="text-2xl flex items-center text-white font-bold">
                <LuListTodo />
                <h1 className="ml-3">Work Notes</h1>
              </span>
            </Link>
          </div>
          <div className="">
            <ul
              // style={{ color: `${txtclr}` }}
              className="hidden sm:flex items-center"
            >
              <li className="mx-4 my-6 md:my-0">
                <Link to="/">Home</Link>
              </li>

              {localStorage.getItem("userId") ? (
                <>
                  <li className="mx-4 my-6 md:my-0">
                    <Link
                      className="flex items-center bg-pink-400 p-3 rounded-full"
                      to="/addTask"
                    >
                      Add Task <FaPlus className="ml-2" />
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link to={`/profile/${localStorage.getItem("userId")}`}>
                      <div className="flex items-center">
                        <RxAvatar className="text-3xl mr-3" />
                        <div>
                          {/* <p className="text-xl italic">{users1.username}</p> */}
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <button onClick={handleLogout}>
                      <MdLogout title="Logout" className="text-xl mt-2" />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mx-4 my-6 md:my-0">
                    <Link
                      className="flex items-center bg-pink-400 p-3 rounded-full"
                      to="/login"
                    >
                      Login <CiUnlock className="ml-2 text-2xl font-bold" />
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* mbl btn */}
          <div onClick={handleNav} className="block sm:hidden z-10">
            {nav ? (
              <div className="w-6 h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  // style={{ color: `${txtclr}` }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            ) : (
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  // style={{ color: `${txtclr}` }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* mbl menu */}
          <div
            className={
              nav
                ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center text-center items-center w-full h-screen bg-black ease-in duration-300"
                : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
            }
          >
            <ul>
              <li className="mx-4 my-6 md:my-0">
                <Link className="text-xl" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <>
                  <li className="mx-4 my-6 md:my-0">
                    <Link
                      className="flex items-center bg-pink-400 p-3 rounded-full"
                      to="/addTask"
                    >
                      Add Task <FaPlus className="ml-2" />
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link to="/profile">
                      <div className="flex items-center">
                        <RxAvatar className="text-3xl mr-3" />
                        <div>
                          {/* <p className="text-xl italic">{users1.username}</p> */}
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <button
                      className="flex items-center"
                      onClick={handleLogout}
                    >
                      <MdLogout title="Logout" className="text-xl mr-2" />
                      <p className="text-xl">Logout</p>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mx-4 my-6 md:my-0">
                    <Link
                      className="flex items-center bg-pink-400 p-3 rounded-full"
                      to="/login"
                    >
                      Login <CiUnlock className="ml-2 text-2xl font-bold" />
                    </Link>
                  </li>
                  <li className="mx-4 my-6 md:my-0">
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-10"></div>
    </div>
  );
};

export default NavNext;
