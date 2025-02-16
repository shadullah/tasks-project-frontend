import { Link } from "react-router-dom";
import useUsers from "../../../hooks/useUsers";
import CountUp from "react-countup";
import { Audio, TailSpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import useMyTask from "../../../hooks/useMyTask";

const Profile = () => {
  const [users1, loading] = useUsers();
  const [tass] = useMyTask();
  const [pic, setPic] = useState(null);
  const [load, setloading] = useState(true);

  const pending = tass.filter(
    (task) => task.status == "pending" && task.userId == users1._id
  ).length;
  const completedtask = tass.filter(
    (task) => task.status == "completed" && task.userId == users1._id
  ).length;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `https://work-notes-server.onrender.com/todo/profiles/`,
          // `http://localhost:8000/auth/${user_id}`,
          ``,
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          }
        );
        const profiles = res.data;
        const userProfile = profiles.find(
          (profile) => profile.user === users1.id
        );
        if (userProfile) {
          setPic(userProfile.img);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };
    getProfile();
  }, [users1]);

  return (
    <div className="bg-gray-800 text-white">
      <div className="block md:flex justify-center items-center p-6 md:p-12">
        {loading ? (
          <>
            <div className="flex justify-center items-center h-screen">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="gray"
                ariaLabel="three-dots-loading"
              />
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-700 w-full md:w-1/3 p-3 md:p-6 rounded-lg">
              <div>
                {load ? (
                  <>
                    <div className="flex justify-center items-center h-64">
                      <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="gray"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  </>
                ) : (
                  <img
                    src={pic || ""}
                    className="h-44 md:h-64 w-64 mx-auto border-2 rounded-full"
                    alt="#"
                  />
                )}
              </div>
              <div className="mt-3 md:mt-6">
                <div className="block md:flex items-center justify-between">
                  <h1 className="text-xl md:text-3xl">My Profile</h1>
                  <div className="block md:flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                    <p>Active Now </p>
                    <div className="bg-green-600 h-3 w-3 rounded-full ml-1"></div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-xl mt-3 underline">
                    Username:{" "}
                    <span className="text-white">{users1.username}</span>
                  </p>
                </div>
                <p className="underline">Email: {users1.email}</p>
              </div>
              <div className="text-center mt-3">
                <Link
                  to={`/profile/${users1?.id}/edit`}
                  className="py-2 px-3 rounded-lg bg-cyan-500"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            <div className="w-full">
              <div>
                <h1 className="text-3xl m-6">Task Progress</h1>
                <div className="m-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-400 p-2 md:p-4 rounded-md">
                    <h4 className="text-xs md:text-xl mb-3">Completed</h4>
                    <p>
                      <span className="text-sm md:text-4xl">
                        <CountUp start={0} end={completedtask} duration={5} />{" "}
                      </span>{" "}
                      Tasks
                    </p>
                  </div>
                  <div className="bg-cyan-400 p-2 md:p-4 rounded-md">
                    <h4 className="text-xs md:text-xl mb-3">In progress</h4>
                    <p>
                      <span className="text-sm md:text-4xl">
                        <CountUp start={0} end={pending} duration={5} />{" "}
                      </span>{" "}
                      Tasks
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl m-6">My Tasks</h1>
                <div className="bg-gray-600 mx-3 md:mx-12 p-3 md:p-6 rounded-lg">
                  {tass.filter((tas) => console.log(tas))}
                  {/* {tasks.filter((task) => task.user.id == users1.id) != 0 ? ( */}
                  {tass.filter((tas) => tas.userId === users1._id) != 0 ? (
                    <>
                      {tass
                        .filter((tas) => tas.userId == users1._id)
                        .map((tas) => (
                          <>
                            <div className="flex justify-between items-center m-3 p-2 bg-indigo-600 rounded-lg">
                              <p className="font-bold">{tas.title}</p>
                              <Link to={`/${tas.id}`}>
                                <button className="bg-lime-600 p-2 rounded-md">
                                  View
                                </button>
                              </Link>
                            </div>
                          </>
                        ))}
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold">
                        Hey, You have not added any notes yet.{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
