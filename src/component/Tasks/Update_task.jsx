import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const Update_task = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [priority, setPriority] = useState([]);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [complete, setComplete] = useState(false);
  const [prior, setPrio] = useState("");
  const urls = [
    `https://work-notes-server.onrender.com/todo/list/${id}/`,
    // `http://localhost:8000/todo/list/${id}/`,
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
    console.log(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const getTask = async () => {
      try {
        const requests = urls.map((url) =>
          axios.get(url, {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          })
        );
        console.log(localStorage.getItem("token"));
        const res = await Promise.any(requests);
        console.log(res.data.priority);
        setTitle(res.data?.title);
        setDes(res.data?.description);
        setPrio(res.data?.priority[0]);
        setComplete(res.data?.completed);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };
    getTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const prioritySelected = e.target.priority.value;
    console.log(prioritySelected);
    // const complete = e.target.completed.value;
    const complete = e.target.querySelector('input[type="checkbox"]').checked;

    // const priorityObj = priority.find(
    //   (prio) => prio.id === parseInt(prioritySelected)
    // );
    // console.log(priorityObj);

    try {
      await axios.put(
        `https://work-notes-server.onrender.com/todo/list/${id}/`,
        {
          title: title,
          description: description,
          completed: complete,
          date: new Date(),
          priority: [prioritySelected],
          user: user,
        },
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(localStorage.getItem("token"));
      navigate(`/`);
      toast.success("Task Updated Successfully", { duration: 6000 });
    } catch (err) {
      toast.error("Task Not updated", { duration: 6000 });
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl my-12 font-bold">Update Note</h1>

      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              // wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleUpdate} className="mx-4 md:mx-14 py-6 md:py-16">
            <div>
              <div className="w-full px-3 mb-6">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700 "
                  name="title"
                  placeholder="Title"
                  type="text"
                  value={title}
                  required
                />
              </div>

              <div className="w-full px-3 mb-6">
                <textarea
                  onChange={(e) => setDes(e.target.value)}
                  className="appearance-none border-b-2 border-violet-500 w-full py-2 px-3 text-gray-700"
                  name="description"
                  type="text"
                  value={des}
                  placeholder="Write notes here..."
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
                value={prior}
                onChange={(e) => setPrio(e.target.value)}
              >
                <option className="" value="" disabled>
                  Set Priority here
                </option>
                {priority.map((prio) => (
                  <option key={prio.id} value={prio?.slug}>
                    {prio.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full px-3 mb-6">
              <label className="text-gray-600  mr-3 font-bold ml-3">
                Mark as Complete
              </label>
              <input
                type="checkbox"
                onChange={(e) => setComplete(e.target.checked)}
                checked={complete}
              />
            </div>
            <div className="text-center mt-6">
              <input
                className="bg-gray-400 w-full py-3 cursor-pointer rounded-lg font-bold"
                type="submit"
                value="Update Note"
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Update_task;
