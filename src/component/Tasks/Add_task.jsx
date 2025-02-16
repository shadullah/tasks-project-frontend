import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Add_task = () => {
  const [priority, setPriority] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const urls = [
    "https://work-notes-server.onrender.com/todo/list/",
    // "http://localhost:8000/todo/list/",
  ];

  useEffect(() => {
    fetch(`https://work-notes-server.onrender.com/todo/priority_choice/`)
      .then((res) => res.json())
      .then((data) => setPriority(data));

    axios
      .get("https://work-notes-server.onrender.com/todo/users/", {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const prioritySelected = e.target.priority.value;
    console.log(prioritySelected);

    const priorityObj = priority.find(
      (prio) => prio.id === parseInt(prioritySelected)
    );
    console.log(title, description, priorityObj);

    for (const url of urls) {
      try {
        await axios.post(
          url,
          {
            user: user,
            title: title,
            description: description,
            completed: false,
            date: new Date().getTime(),
            priority: [priorityObj.slug],
          },
          // {
          //   user: 1,
          //   title: "Complete assignment",
          //   description: "Finish the project before the deadline",
          //   priority: ["important"],
          // },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        // setPriority(priorityArr);
        // console.log(priority);
        navigate("/");
        toast.success("Task Added Successfully", { duration: 6000 });
      } catch (error) {
        toast.error("Task could not be added", { duration: 6000 });

        console.log("add post Failed", error);
      }
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-center text-3xl my-6 md:my-12 font-bold">Add Note</h1>
      <div className="w-full md:w-1/3 mx-auto">
        <form onSubmit={handleSubmit} className="mx-4 md:mx-14 py-6 md:py-16">
          <div>
            <div className="w-full px-3 mb-6">
              <input
                className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700 "
                name="title"
                placeholder="Title"
                type="text"
                required
              />
            </div>
            <div className="w-full px-3 mb-6">
              <textarea
                className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700"
                name="description"
                type="text"
                placeholder="Write notes here..."
                rows="4"
                required
              />
            </div>
          </div>
          <div className="w-full px-3 mb-6">
            <select
              required
              className="border-b-2 border-violet-500 w-full py-2 px-3 text-gray-400 font-bold"
              name="priority"
              id="priority"
              defaultValue=""
            >
              <option className="" value="" disabled>
                Set Priority here
              </option>
              {/* {priority.map((prio) => console.log(prio.id))} */}
              {priority.map((prio) => (
                <option key={prio.id} value={prio.id}>
                  {prio.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mt-6">
            <input
              className="bg-gray-400 w-full py-3 cursor-pointer rounded-lg font-bold"
              type="submit"
              value="Add Note"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_task;
