import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
const authToken = localStorage.getItem("DRFAuthToken");
import Swal from "sweetalert2";

const Home = () => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const res = await axios("http://127.0.0.1:8000/user", {
        method: "get",
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const isTokenExpired = () => {
    const tokenData = authToken;
    console.log(tokenData);
    if (tokenData) {
      const createdTime = tokenData.created;
      console.log(createdTime);
    }
  };
  useEffect(() => {
    fetchUser();
    isTokenExpired();
  }, []);

  const alertMsg = (text, btn) => {
    const res = Swal.fire({
      title: "User management",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: btn,
    });
    return res;
  };

  const logOut2 = () => {
    Swal.fire({
      title: "User management",
      text: "confirm logout session",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "logOut",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("DRFAuthToken");
        window.location.href = "/";
      }
    });
  };

  const logOut = async () => {
    const response = await alertMsg("Confirm logout session", "logOut");
    if (response.isConfirmed) {
      localStorage.removeItem("DRFAuthToken");
      window.location.href = "/";
    }
  };

  const removeAccount = async () => {
    const response = await alertMsg(
      "Are you sure you want to delete your account ?",
      "Sure"
    );
    let res;
    response.isConfirmed
      ? (res = await axios("http://127.0.0.1:8000/user/", {
          method: "DELETE",
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }))
      : null;
    if (res) {
      if (res.data.success == "true") {
        localStorage.removeItem("DRFAuthToken");
        window.location.href = "/";
      }
    }
  };

  const editProfile = (name, email) => {
    const uname = prompt("UserName", name);
    const uemail = prompt("Email", email);
  };

  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-card">
        <div className="pic">
          <img
            src={`http://127.0.0.1:8000${user.profile}`}
            alt={`${user.username}`}
          />
          <button
            onClick={() => editProfile(`${user.username}`, `${user.email}`)}
          >
            edit
          </button>
        </div>
        <div className="details">
          <section>
            <p>UserName : {user.username}</p>
            <p>Email : {user.email}</p>
          </section>
          <div className="buttons">
            <button onClick={() => logOut()}>Log Out</button>
            <button onClick={() => removeAccount()}>delete account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
