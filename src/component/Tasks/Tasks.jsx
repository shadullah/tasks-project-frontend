import SingleTask from "./SingleTask";
import Infomation from "../Home/Home/Infomation/Infomation";
import useTasks from "../../hooks/useTasks";
import { CgGoogleTasks } from "react-icons/cg";
import Tips from "../Tips/Tips";
import { BsThreeDotsVertical } from "react-icons/bs";
import KeenSlider from "../Home/Home/Infomation/KeenSlider";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import load from "../../assets/load2.gif";

const Tasks = () => {
  const [tasks, setTasks, setQuery, setCompleted, loading] = useTasks();
  const [searchQ, setSearchQ] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.search.value.trim().toLowerCase();
    console.log(searchInput);
    setSearchQ(searchInput);
    filterTasks(searchInput);
  };

  const filterTasks = (searchInput) => {
    if (!searchInput) {
      setFilteredTasks([]);
      return;
    }
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchInput) ||
        task.description.toLowerCase().includes(searchInput) ||
        task.priority[0].toLowerCase().includes(searchInput)
    );
    setFilteredTasks(filtered);
  };

  return (
    <>
      <div className="bg-gray-800 text-white px-6 md:px-12 pt-3 pb-12">
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
        ) : tasks?.length !== 0 || filteredTasks?.length !== 0 ? (
          <>
            <div className="flex md:flex-row flex-col-reverse justify-between">
              <div className="w-full">
                <div className="block md:flex">
                  <div className="w-full md:w-1/2">
                    <Infomation />
                  </div>
                  <div className="w-full md:w-1/2">
                    <KeenSlider setQuery={setQuery} />{" "}
                  </div>
                </div>

                <div className="mt-6 md:mt-12 block md:flex justify-between">
                  <div>
                    <h1 className="text-4xl italic flex items-center">
                      All Tasks{" "}
                      <span className="ml-3 text-3xl text-gray-400">
                        <CgGoogleTasks />
                      </span>
                    </h1>
                    <p className="mt-3">
                      Managing your all tasks with easy task management
                    </p>
                  </div>
                  <div>
                    <form onSubmit={handleSearch} className="">
                      <div className="flex items-center px-6 py-3 rounded-lg mt-6">
                        <input
                          type="text"
                          className="bg-transparent border-b-2 bg-gray-300 p-[2.5px] outline-none w-full"
                          placeholder="Search Here..."
                          name="search"
                        />
                        <button type="submit" className="">
                          <BiSearchAlt2 className="text-3xl border-b-2 p-1 " />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg my-6 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {searchQ && filteredTasks.length != 0 ? (
                    filteredTasks.map((task, index) => (
                      <SingleTask key={index} task={task} />
                    ))
                  ) : searchQ && filteredTasks.length == 0 ? (
                    <>
                      <h1 className="bg-red-600 p-6 rounded-lg flex justify-center items-center">
                        Sorry, No tasks Found !!
                      </h1>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <h1 className="bg-gray-800 font-bold p-3 rounded-full text-red-400">
                            Urgent{" "}
                            <span className="bg-red-400 text-white p-2 rounded-full">
                              {loading ? (
                                <>Loading....</>
                              ) : (
                                <>
                                  {
                                    tasks?.filter(
                                      (task) => task?.priority[0] === "urgent"
                                    ).length
                                  }
                                </>
                              )}
                            </span>
                          </h1>
                          <p>
                            <BsThreeDotsVertical />
                          </p>
                        </div>
                        {tasks.length !== 0 ? (
                          tasks
                            .filter((task) => task?.priority[0] == "urgent")
                            .map((task, index) => (
                              <SingleTask key={index} task={task} />
                            ))
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="">
                        <div className="flex items-center justify-between">
                          <h1 className="bg-gray-800 font-bold p-3 rounded-full text-indigo-400">
                            Important{" "}
                            <span className="bg-indigo-400 text-white p-2 rounded-full">
                              {
                                tasks.filter(
                                  (task) => task?.priority[0] === "important"
                                ).length
                              }
                            </span>
                          </h1>
                          <p>
                            <BsThreeDotsVertical />
                          </p>
                        </div>
                        {tasks.length !== 0 ? (
                          tasks
                            .filter((task) => task?.priority[0] == "important")
                            .map((task, index) => (
                              <SingleTask key={index} task={task} />
                            ))
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="">
                        <div className="flex items-center justify-between">
                          <h1 className="bg-gray-800 font-bold p-3 rounded-full text-cyan-400">
                            Regular{" "}
                            <span className="bg-cyan-400 text-white p-2 rounded-full">
                              {
                                tasks.filter(
                                  (task) => task?.priority[0] === "regular"
                                ).length
                              }
                            </span>
                          </h1>
                          <p>
                            <BsThreeDotsVertical />
                          </p>
                        </div>
                        {tasks.length !== 0 ? (
                          tasks
                            .filter((task) => task?.priority[0] == "regular")
                            .map((task, index) => (
                              <SingleTask key={index} task={task} />
                            ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/3 text-white">
                <h2 className="text-2xl mb-6 ml-6">Tips</h2>
                <Tips setCompleted={setCompleted} />
              </div>
            </div>
          </>
        ) : (
          <h1>No Tasks Found</h1>
        )}
      </div>
    </>
  );
};

export default Tasks;
