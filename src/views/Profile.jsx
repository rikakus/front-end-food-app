import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Nav, NavItem, NavLink, TabPane, Row, TabContent } from "reactstrap";
import style from "../css/profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [recipe, setRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const json = localStorage.getItem("users");
  const users = JSON.parse(json);
  const navigate = useNavigate();
  // const url = process.env.REACT_APP_BACKEND_URL + "/" + users.photo; //http://localhost:3000/1650362622035.png
  useEffect(() => {
    const token = localStorage.getItem("token");
    const validation = () => {
      if (!token || !users || users === null) {
        alert("you must login");
        return navigate("/login");
      }
    };

    const getData = async () => {
      const id = users === null ? 1 : users.id
      return await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/recipe-user/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          setRecipe(response.data.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    validation();
    getData();
  }, []);
  const photo = users === null ? "" : process.env.REACT_APP_BACKEND_URL + "/" + users.photo
  const username = users === null ? "" : users.name
  return (
    <>
      <Navbar />
      <section>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px"
          }}
        >
          <div className={style.profileDecs}>
            <img
              src={photo}
              alt="profile"
              className={style.profileImg}
            />
            <h2 className={style.h2}>{username}</h2>
          </div>
        </div>
      </section>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab == "1" ? "active" : ""}
              onClick={() => setActiveTab("1")}
              style={{ color: "#666666" }}
            >
              my recipe
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab == "2" ? "active" : ""}
              onClick={() => setActiveTab("2")}
              style={{ color: "#666666" }}
            >
              saved recipe
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab == "3" ? "active" : ""}
              onClick={() => setActiveTab("3")}
              style={{ color: "#666666" }}
            >
              like recipe
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row style={{ margin: "20px" }}>
              {recipe.map((data, index) => {
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
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{ margin: "10px" }}>
              <div style={{ height: "300px" }}></div>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row style={{ margin: "10px" }}>
              <div style={{ height: "300px" }}></div>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
