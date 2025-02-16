import { Link } from "react-router-dom";

const SingleTask = ({ task }) => {
  const { title, date, description, completed, user } = task;

  const sliceDescrip = description.slice(0, 50);

  return (
    <>
      <div className="my-6 bg-gray-800 p-6 rounded-lg">
        <p className="mb-6">
          Status:{" "}
          {completed ? (
            <>
              <span className="text-green-400">Completed</span>
            </>
          ) : (
            <>
              <span className="text-red-600">Not Completed</span>
            </>
          )}
        </p>
        <h1 className="text-2xl mb-6 font-bold text-justify ">{title}</h1>
        <p className="text-gray-400">
          {sliceDescrip}...{" "}
          <Link to={`/${task.id}`}>
            <button className="bg-indigo-600 text-white px-2 py-1 text-sm rounded-full">
              See more
            </button>
          </Link>{" "}
        </p>
        <div className="block md:flex justify-between mt-6">
          <p>
            Author: <span className="uppercase">{user.username}</span>
          </p>
          <p>{date}</p>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
