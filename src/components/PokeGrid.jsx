import { useEffect, useState } from "react";
import "./PokeGrid.css";
import { useNavigate } from "react-router-dom";
import favorite from "../images/favorite.png";

export const PokeGrid = () => {
  const navigate = useNavigate();
  const BASE_IMG_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("all");
  const pokeFetch = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        const newList = data.results.map((result, index) => {
          return {
            ...result,
            favorite: false,
            id: index + 1,
          };
        });
        setPokemons(newList);
      });
  };

  const addFavorites = (id) => {
    console.log("entro", id);
    const newPokemonList = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return {
          ...pokemon,
          favorite: !pokemon.favorite,
        };
      }
      return pokemon;
    });
    setPokemons(newPokemonList);
  };

  const pokemosFilter = pokemons.filter((pokemon) => {
    const matchName = pokemon.name.toLowerCase().includes(input.toLowerCase());
    const matchOption =
      option === "all" || (option === "favorites" && pokemon.favorite);

    return matchName && matchOption;
  });
  useEffect(() => {
    pokeFetch();
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
    <div className="container-fluid text-center" style={{ background: "#fff" }}>
      <button className="mt-3 mb-3" onClick={() => navigate("/")}>
        Home
      </button>
      <div className="d-flex col-8 mx-auto">
        <input
          className="form-control"
          type="text"
          placeholder="Buscar.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={option}
          className="form-select"
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>
      <div className="row justify-content-center">
        {pokemosFilter.length === 0 ? (
          <div
            className="container d-flex justify-content-center"
            style={{ height: "100vh" }}
          >
            <h1 className="align-self-center text-dark">Sin resultados...</h1>
          </div>
        ) : (
          pokemosFilter.map((pokemon, index) => (
            <div
              key={index}
              className="col-3 p-3 m-2 pokegrid-card"
              style={{
                borderRadius: "10px",
                background: "#f00",
              }}
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
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/pokegrid/${pokemon.name}`)}
              >
                <img
                  src={`${BASE_IMG_URL}/${pokemon.id}.png`}
                  alt={`${pokemon.name}`}
                  width={"200px"}
                  className="img-fluid"
                  style={{ background: "white", marginTop: "20px" }}
                />
                <h2 className="pokemon-title">
                  # {pokemon.id} {pokemon.name}
                </h2>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "4px",
                  border: "3px double #000",
                  display: "flex",
                }}
                className="pokemon-footer"
              >
                <p className="pokemon-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque, fuga omnis itaque id deserunt ex necessitatibus
                  doloribus in, ducimus labore ipsam impedit odit sapiente
                  voluptatem natus amet dolore quisquam quo!
                </p>

                <button
                  className={`btn btn-${
                    pokemon.favorite ? "" : "outline-"
                  }warning pokemon-footer-btn`}
                  onClick={() => addFavorites(pokemon.id)}
                >
                  <img
                    src={favorite}
                    alt="favorite"
                    width={"15px"}
                    className="pokemon-footer-img"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
