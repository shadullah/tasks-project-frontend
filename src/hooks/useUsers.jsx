import axios from "axios";
import { useEffect, useState } from "react";

const useUsers = () => {
  const user_id = localStorage.getItem("userId");
  const [users1, setusers1] = useState([]);
  const [loading, setLoading] = useState(true);
  const urls = [
    // `https://work-notes-server.onrender.com/todo/users/${user_id}/`,
    // `http://127.0.0.1:8000/todo/users/${user_id}/`,
    `http://localhost:8000/auth/${user_id}`,
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const requests = urls.map((url) =>
          axios.get(url, {
            headers: {
              Authorization: `token ${localStorage.getItem("refreshToken")}`,
            },
          })
        );
        const res = await Promise.any(requests);
        console.log(res.data.data);
        setusers1(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [user_id]);

  return [users1, loading];
};

export default useUsers;
