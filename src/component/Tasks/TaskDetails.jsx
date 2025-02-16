import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { ImPower } from "react-icons/im";
import { MdOutlineDelete } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import load from "../../assets/load2.gif";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("userId");
  const urls = [
    `https://work-notes-server.onrender.com/todo/list/${id}/`,
    // `http://127.0.0.1:8000/todo/list/${id}/`,
  ];

  const handleDelete = async () => {
    for (const url of urls) {
      try {
        await axios.delete(url, {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        });
        navigate("/");
        toast.success("Task Deleted Successfully", { duration: 6000 });
      } catch (err) {
        toast.error("Task not deleted", { duration: 6000 });

        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getTask = async () => {
      for (const url of urls) {
        try {
          const res = await axios.get(url);
          console.log(res.data);
          setTask(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    getTask();
  }, []);

  return (
    <div className="bg-gray-800 text-white pb-12">
      <div className="">
        <h1 className="text-center text-3xl font-bold py-12">Task Details</h1>

        {loading ? (
          <>
            <div>
              <img
                className="mx-auto mix-blend-multiply my-32"
                src={load}
                alt=""
              />
            </div>
          </>
        ) : (
          <>
            <div className="my-3 md:my-12 px-6 md:px-12">
              <p className="flex">
                Priority:
                <span className="ml-2">
                  {task.priority && task.priority.length > 0 ? (
                    task.priority[0] == "urgent" ? (
                      <span className="text-orange-400 uppercase flex items-center">
                        {task.priority[0]}{" "}
                        <span className="ml-2">
                          <FaTemperatureArrowUp />
                        </span>
                      </span>
                    ) : task.priority[0] == "important" ? (
                      <span className="text-orange-400 flex items-center">
                        {task.priority[0]}{" "}
                        <span className="ml-2">
                          <ImPower />
                        </span>
                      </span>
                    ) : (
                      <>
                        <span className="text-lime-300">
                          {task.priority[0]}
                        </span>
                      </>
                    )
                  ) : (
                    <span>No Priorirty Found</span>
                  )}
                </span>
              </p>
              <h1 className="text-2xl md:text-5xl font-extrabold text-justify my-6">
                {task.title}
              </h1>
              <p>
                Author:{" "}
                <span className="uppercase">{task?.user?.username}</span>{" "}
              </p>
              <p>Posted Date: {task.date}</p>

              <p className="text-sm md:text-2xl my-12">{task.description}</p>
              <p className="mb-6">
                Status:{" "}
                {task.completed ? (
                  <>
                    <span className="text-green-400">Completed</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600">Not Completed</span>
                  </>
                )}
              </p>
              {user_id == task.user?.id ? (
                <>
                  <div className="my-6 flex items-center">
                    <button
                      onClick={handleDelete}
                      className="text-2xl mx-3 flex items-center px-3 py-2 bg-red-600 rounded-lg"
                    >
                      <MdOutlineDelete />
                      <span className="text-xl ml-3">Delete</span>
                    </button>
                    <Link to={`/${task.id}/update`}>
                      <button className="text-2xl mx-3 flex items-center px-3 py-2 bg-cyan-400 rounded-lg">
                        <FaEdit /> <span className="text-xl ml-3">Edit</span>
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
