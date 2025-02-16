import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { RiMenuFill } from "react-icons/ri";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import useUsers from "../../../hooks/useUsers";
import { CiUnlock } from "react-icons/ci";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  const [users1] = useUsers();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "https://work-notes-server.onrender.com/todo/logout/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 200) {
        console.log("logout successfull");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };
  return (
    <div>
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 text-white bg-gray-800">
        <div className="flex justify-between items-center">
          <Link to="/">
            <span className="text-2xl flex items-center text-white font-bold">
              <LuListTodo />
              <h1 className="ml-3">Work Notes</h1>
            </span>
          </Link>
        </div>
        <div
          className="md:hidden block cursor-pointer ml-12"
          onClick={toggleMenu}
        >
          <RiMenuFill className="text-xl " />
        </div>
        <div className="">
          <ul
            className={`md:flex md:items-center text-sm md:static absolute w-full md:w-auto left-0 py-6 md:py-0 pl-7 md:pl-0 opacity-0 md:opacity-100 transition-all ease-in duration-500  text-white font-semibold ${
              isMenuOpen ? "opacity-100 top-[80px] bg-gray-300" : "opacity-0"
            }  `}
          >
            <li className="mx-4 my-6 md:my-0">
              <Link to="/">Home</Link>
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
                        <p className="text-xl italic">{users1.username}</p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="mx-4 my-6 md:my-0">
                  <button onClick={handleLogout}>
                    <MdLogout title="Logout" className="text-xl" />
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
      </nav>
    </div>
  );
};

export default Navbar;
