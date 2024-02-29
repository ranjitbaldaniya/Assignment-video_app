import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContect";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // console.log("isauthenticated", isAuthenticated);
  const userName =  localStorage.getItem("username") 
  return (
    <div>
      {isAuthenticated ? (
        <h2 className="text-primary text-center">Hello! Welcome {userName}</h2>
      ) : (
        <h2 className="text-primary text-center">Pleased Logged In to see video content!</h2>
      )}
    </div>
  );
};

export default Home;
