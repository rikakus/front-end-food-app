import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import style from "../css/search.module.css";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [queryParams] = useSearchParams();
  const key = queryParams.get("search");

  const getContent = async (queryKey) => {
    if (queryKey) {
      queryKey = `?search=${queryKey}`;
    }
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipe/${queryKey}`)
      .then((response) => {
        setRecipe(response.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (key) {
      setSearch(key);
      getContent(key);
    } else {
      getContent();
    }
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/?search=${search}`);
      getContent(search);
    }
  };

  const check = recipe === null? "Data Not Found" : "Your Search !"

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className={style.formSearch}>
            <div className={style.icon}></div>
            <input
              type="text"
              className={style.input}
              placeholder="Search Recipe"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <h4 style={style.h4}>{check}</h4>
          <div className="row list-recipe">
            {recipe &&
              recipe.map((data, index) => {
                const url =
                  process.env.REACT_APP_BACKEND_URL + "/" + data.photo;
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
};

export default Search;
