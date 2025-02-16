import axios from "axios";
import { useEffect, useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState("");
  const urls = [
    "https://work-notes-server.onrender.com/todo/list/",
    // "http://localhost:8000/todo/list/",
  ];

  useEffect(() => {
    const getTasks = async () => {
      // let fetchedData = [];
      for (const url of urls) {
        try {
          let endpoint = url;
          if (query) {
            endpoint = endpoint + `?search=${query}`;
          } else if (completed) {
            endpoint += `?completed=${completed}`;
          }
          // const endpoint = query ? `${url}?search=${query}` : url;
          const res = await axios.get(endpoint, {
            // headers: {
            //   Authorization: `token ${localStorage.getItem("token")}`,
            // },
          });
          console.log(res.data);
          setTasks(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
      // setTasks(fetchedData);
      // setLoading(false);
    };
    getTasks();
  }, [query, completed]);

  return [tasks, setTasks, setQuery, setCompleted, loading];
};

export default useTasks;
