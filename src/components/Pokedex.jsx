import { useEffect, useState } from "react";
import pokebola from "../assets/pokebola.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const Pokedex = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pokemonName = location.pathname.split("/")[2];
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const pokemonFetch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    pokemonFetch();
  }, []);

  if (isLoading)
    return (
      <div
        className="container d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <h1 className="align-self-center">Loading...</h1>
      </div>
    );
  return (
    <div className="d-flex flex-column container col-6 mt-5 pokemon-card">
      <div
        style={{
          display: "flex",
          color: "#fff",
          background: "#b39161",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "10px solid #fff",
          }}
          className="align-self-center"
        ></div>
        <h3 className="pokemon-header">Pokédex registration completed.</h3>
      </div>
      <div
        className="d-flex justify-content-between pokemon-card-body"
        style={{ background: "#c3f790" }}
      >
        <img
          src={`${pokemon.sprites?.front_default}`}
          alt={pokemon.name}
          style={{
            background: "#fff",
            borderRadius: "10px",
            border: "5px double #9c9f3c",
            margin: "10px",
          }}
          width={"200px"}
          className="pokemon-card-img"
        />
        <div>
          <div
            className="d-flex mt-2 p-2 mb-2"
            style={{ background: "#d3d657", borderRadius: "15px" }}
          >
            <img
              src={pokebola}
              alt="pokebola"
              width={"50px"}
              className="align-self-start"
            />
            <div>
              <h1 className="pokemon-title">
                #{pokemon.id} {pokemon.name}
              </h1>
              <h2 className="pokemon-subtitle">Shadown Pokémon</h2>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-1 pokemon-card-types">
            {pokemon.types?.map((type, index) => (
              <div
                key={index}
                style={{
                  background: "#c884e1",
                  padding: "3px",
                  borderRadius: "5px",
                  border: "3px outset #000",
                }}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="d-flex"
        style={{ background: "#6d9fda", borderRadius: "10px" }}
      >
        <p
          style={{
            background: "#fff",
            marginLeft: "40px",
            marginRight: "40px",
            marginTop: "10px",
            padding: "5px",
          }}
          className="pokemon-description"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          pariatur laudantium sint. Eum dolores a odit labore consectetur
          accusamus molestiae, quaerat est adipisci sunt voluptatum hic libero
          enim commodi dolore.
        </p>
      </div>

      <button
        className="mt-5 align-self-center"
        onClick={() => navigate("/pokegrid")}
      >
        Volver
      </button>
    </div>
  );
};
