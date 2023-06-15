/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";
import { useState } from "react";
import { SlDislike, SlLike } from "react-icons/sl";

const Blog = ({ blog }) => {
  const [like, setLike] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleLike = () => {
    setLike(like + 1);
    setSelected(true);
  };
  console.warn(selected);

  return (
    <div className="blog-container">
      <div className="blog-box">
        <h2 className="blog-title">{blog.name}</h2>
        <p className="blog-text">{blog.movies_details}</p>
        <div className="blog-like_box">
          <SlDislike
            className={selected ? "blog-like-selected" : "blog-like"}
            size={40}
            onClick={handleLike}
          />
          <SlLike className="blog-like" size={40} onClick={handleLike} />
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    movies_details: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
