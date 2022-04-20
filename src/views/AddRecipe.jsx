import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/addRecipe.css"

const AddRecipe = () =>{
    return(
     <>
     <Navbar />
     <section>
      <div className="container">
        <div className="content row">
            <div className="col">
              <input type="text" placeholder="" className="inputImage col" />
              <div className="logo">
                <div className="l"></div>
                <div className="txt">Add Photo</div>
              </div>
            </div>
            <div className="col">
              <input type="text" placeholder="title" className="inputTitle col" />
            </div>
            <div className="col">
              <textarea
                className="inputIngredients"
                name="ingredients"
                placeholder="ingredients"
              ></textarea>
            </div>
            <div className="col">
              <input type="text" placeholder="video" className="inputVideo" />
            </div>
            <div className="btn col"><input type="button" value="Post" className="button" /></div>
        </div>
      </div>
    </section>
     <Footer />
     </>
    )
 }
 
 export default AddRecipe;