import { useState } from "react";
import { useMovies } from "../custom-hooks/useMovies.js";
import { useLocalStorageState } from "../custom-hooks/useLocalStorageState.js";
import { NavBar, Logo, SearchInput, NumResaults } from "./Navbar.js";
import MoviesList from "./MovieList.js";
import MovieDetails from "./MovieDetails.js";
import WatchedSummery from "./WatchedSummery.js";
import WatchedMoviesList from "./WatchedMoviesList.js";
import Button from "./Button.js";

// const KEY = "cdd7f57f";
export default function App() {
  const [query, setQuery] = useState("john wick");
  const [selectedID, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });

  const handleSelectMovie = function (id) {
    setSelectedId(selectedID === id ? null : id);
  };
  const handleCloseMovie = function () {
    setSelectedId(null);
  };
  const handleWatchedMovies = function (newWatched) {
    const existingIndex = watched.findIndex(
      (movie) => movie.imdbID === newWatched.imdbID
    );
    if (existingIndex !== -1) {
      watched[existingIndex] = {
        ...watched[existingIndex],
        ...newWatched,
      };
      setWatched(watched);
    } else {
      setWatched((watched) => [...watched, newWatched]);
    }
  };
  const handleDeleteWatchedMovie = function (watchedMovieID) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== watchedMovieID)
    );
  };

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <NumResaults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              id={selectedID}
              onCloseMovie={handleCloseMovie}
              onWatchedMovies={handleWatchedMovies}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function ErrorMessage({ error }) {
  return <p className="error">❌ {error}</p>;
}
function Loader() {
  return <p className="loader">Loading...</p>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && children}
    </div>
  );
}
