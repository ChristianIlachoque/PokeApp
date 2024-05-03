import { useNavigate } from "react-router-dom";
import pikachu from "../images/pikachu.png";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing-body">
        <div className="landing-description">
          <h1>Pokémon Go</h1>
          <h1>
            The <span>Ultimate Tips</span>
          </h1>
          <h1>and Tricks Guide</h1>
          <h5>Motivation And Your Pesonal Vision An Unbeatable Force</h5>
          <button onClick={() => navigate("/pokegrid")}>Go Pokegrid</button>
        </div>
        <div className="circle-3"></div>
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>
      <img src={pikachu} alt="pikachu" className="img-pikachu" />
      <div className="landing-footer"></div>
    </div>
  );
};
