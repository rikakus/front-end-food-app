import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../css/landingPage.css";
import HeroImage1 from "../assets/landingpage.png";
import HeroImage2 from "../assets/landingpage2.png";
import HeroImage3 from "../assets/landingpage3.png";
import Hero from "../components/Hero";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../components/Card";
import axios from "axios";

export default function LandingPage() {
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState({ key: "" });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipe-news`)
      .then((response) => {
        setRecipe(response.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`search/?search=${search.key}`)
    }
  };
  return (
    <>
      <div className="navibar">
        <Navbar />
        <div className="login">
          <ul>
            <li className="icon-user"></li>
            <li className="text">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
      <section>
        <div className="background">
          <div className="left">
            <h1>Discover Recipe & Delicious Food</h1>
            <div className="form-search">
              <div className="icon"></div>
              <input
                type="text"
                className="input"
                placeholder="Search Restaurant, Food"
                onChange={(e) => setSearch({ ...search, key: e.target.value })}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          <div className="right">
            <img src={HeroImage1} alt="Food Image" />
          </div>
        </div>
      </section>
      <Hero
        title="For You Recipe!"
        subTitle="Healthy Bone Broth Ramen (Quick & Easy)"
        image={HeroImage2}
        desc="Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!"
      />
      <Hero
        title="New Recipe!"
        isBorder
        subTitle="Healthy Bone Broth Ramen (Quick & Easy)"
        image={HeroImage3}
        desc="Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!"
      />
      <section>
        <div className="container">
          <h4>Recipe</h4>
          <div className="row list-recipe">
            {recipe.map((data, index) => {
              const url = process.env.REACT_APP_BACKEND_URL + "/" + data.photo;
              return (
                <Card
                  key={index}
                  image={url}
                  caption={data.title}
                  id={data.id}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
