import { useEffect, useState } from "react";
import "./PokeGrid.css";
import { useNavigate } from "react-router-dom";

export const PokeGrid = () => {
  const navigate = useNavigate();
  const BASE_IMG_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const [pokemons, setPokemons] = useState([]);
  const pokeFetch = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  };
  useEffect(() => {
    pokeFetch();
  }, []);

  return (
    <div className="container-fluid text-center" style={{ background: "#fff" }}>
      <button className="mt-3 mb-3" onClick={() => navigate("/")}>
        Home
      </button>
      <div className="row justify-content-center">
        {pokemons.map((pokemon, index) => (
          <div
            className="col-3 p-3 m-2 pokegrid-card"
            style={{
              borderRadius: "10px",
              cursor: "pointer",
              background: "#f00",
            }}
            onClick={() => navigate(`/pokegrid/${pokemon.name}`)}
          >
            <div className="d-flex gap-2 mb-1">
              <div
                style={{
                  width: "13px",
                  height: "13px",
                  background: "#ff0",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                }}
              ></div>
              <div
                style={{
                  width: "13px",
                  height: "13px",
                  background: "#0f0",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                }}
              ></div>
              <div
                style={{
                  width: "13px",
                  height: "13px",
                  background: "#00f",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                }}
              ></div>
            </div>
            <div
              style={{
                color: "yellow",
                background: "#000",
                border: "1px solid #fff",
                borderRadius: "4px",
                marginBottom: "2px",
              }}
            >
              <img
                src={`${BASE_IMG_URL}/${index + 1}.png`}
                alt={`${pokemon.name}`}
                width={"200px"}
                className="img-fluid"
                style={{ background: "white", marginTop: "20px" }}
              />
              <h2 className="pokemon-title">
                # {index + 1} {pokemon.name}
              </h2>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "4px",
                border: "3px double #000",
              }}
            >
              <p className="pokemon-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                fuga omnis itaque id deserunt ex necessitatibus doloribus in,
                ducimus labore ipsam impedit odit sapiente voluptatem natus amet
                dolore quisquam quo!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
