import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import AddRecipe from "../views/AddRecipe";
import Profile from "../views/Profile";
import Register from "../views/Register";
import Login from "../views/Login";
import Video from "../views/DetailVideo";
import Recipe from "../views/Recipe";
import Search from "../views/Search";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} /> {/*localhost:3000/*/}
          <Route path="new" element={<AddRecipe />} /> {/*localhost:3000/*/}
          <Route path="profile" element={<Profile />} /> {/*localhost:3000/*/}
          <Route path="register" element={<Register />} /> {/*localhost:3000/*/}
          <Route path="login" element={<Login />} /> {/*localhost:3000/*/}
          <Route path="video" element={<Video />} /> {/*localhost:3000/*/}
          <Route path="recipe/:id" element={<Recipe />} /> {/*localhost:3000/*/}
          <Route path="search" element={<Search />} />{/*localhost:3000/*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
