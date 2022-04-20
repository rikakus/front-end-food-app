import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../css/recipe.css";
import Step from "../components/stepVideo";
import axios from "axios";

export default function Recipe() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const validation = () => {
      if (!token) {
        alert("you must login");
        navigate("/login");
      }
    };

    const getDataRecipe = async () => {
      return await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/recipe/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          const data = response.data.data === null? {ingredients: ""} : response.data.data
          setRecipe({ ...data, ingredients: data.ingredients.split("\n") });
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getDataRecipe();
    validation();
  }, []);
  const photo = process.env.REACT_APP_BACKEND_URL + "/" + recipe.photo;
  const ingridients = recipe.ingredients;
  return (
    <>
      <Navbar />

      <section>
        <div className="container">
          <h1 className="title">{recipe.title}</h1>
          <div className="content-img">
            <img src={photo} alt="Food Image" />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="ingridients">
            <h2>Ingriedients</h2>

            <ul>
              {ingridients === undefined
                ? "loading!"
                : ingridients.map((data, index) => <li key={index}>{data}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Video Step</h2>
          <Step />
          <Step />
        </div>
      </section>
      <section>
        <div className="container">
          <form action="/#">
            <textarea placeholder="Comment :" name="comment"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Comment</h2>
          <div className="comment">
            <div className="comment-img">
              <img src="/assets/images/comment-image.png" alt="Comment Image" />
            </div>
            <div className="comment-text">
              <p>Ayudia</p>
              <p>Nice Recipe</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
