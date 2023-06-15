/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
import { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";
import Blog from "./Blog";
import "./BlogsBox.css";

const BlogsBox = () => {
  const [blogs, setBlogs] = useState([]);

  const api = useApi();
  const { user } = useUser();

  useEffect(() => {
    api
      .get("/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {user ? (
        <div className="blogs-container">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BlogsBox;
