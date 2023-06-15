/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./InputArticle.css";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";

const InputArticle = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [mainText, setMainText] = useState("");

  const api = useApi();
  const { user } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      name: movieTitle,
      movies_details: mainText,
      user_id: user.id,
    };
    api
      .post(`/blogs`, postData)
      .then(() => {
        setMovieTitle("");
        setMainText("");
      })
      .catch((error) => {
        console.error("Error sending post", error);
      });
  };

  return (
    <div className="input-article_container">
      {user ? (
        <form className="input-article_form" onSubmit={handleSubmit}>
          <TextField
            label="Movie Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Main Text"
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      ) : (
        <h3 className="input-article_alert">
          You need to register to view content !
        </h3>
      )}
    </div>
  );
};

export default InputArticle;
