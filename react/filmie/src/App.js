import { useState, useEffect } from "react"
import './App.css';
import MovieCard from "./MovieCard";

import logo from "./assets/logo.png"
import { IoIosSearch } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

const Access_key = "683f9ece002aa627806d81fcfda76fd6"

function App() {
  const [lightState, setLightState] = useState("light");
  
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchMoviesByPage = async (page) => {
    const response = await fetch(`
    https://api.themoviedb.org/3/trending/all/day?api_key=${Access_key}&page=${page}`);
    const data = await response.json();
    if(data.results) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }
    
  }

  const searchMoviesByTitle = async (title) => {
    const response = await fetch(`
    https://api.themoviedb.org/3/search/multi?api_key=${Access_key}&query=${title}&page=${currentPage}`);
    const data = await response.json();
    if(data.results) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }
  }

  const searchGenres = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/genre/movie/list?api_key=${Access_key}`);
    const data = await response.json();
    setGenres(data.genres);
  }
  // }

  useEffect(() => {
    if(searchTerm !== "") {
      searchMoviesByTitle(searchTerm);
    } else {
      searchMoviesByPage(1);
    }
    
    searchGenres();
  }, [searchTerm])

  useEffect(() => {
    if(searchTerm !== "") {
      searchMoviesByTitle(searchTerm);
    } else {
      searchMoviesByPage(currentPage);
    }
    
  }, [currentPage])

  return (
    <>
      <Header lightState={lightState} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchMoviesByTitle={searchMoviesByTitle} searchMoviesByPage={searchMoviesByPage} />
      <Movies movies={movies} genres={genres} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

function Header({ lightState }) {
  return (
    <div className="header">
      <CategoriesMenu />
      <img src={logo} alt="logo" />
      {lightState === "light" ?
        <CiLight className="modeIcon" />
       :
        <MdDarkMode className="modeIcon" />
      }
    </div>
  )

}

function CategoriesMenu () {
  return (
    <div className="categoriesMenu">
      <RiMenu2Fill className="friesMenuIcon" />
    </div>
  )
}

function SearchBar({searchTerm, setSearchTerm, searchMoviesByTitle, searchMoviesByPage}) {
  return (
    <div className="searchField">
      <div className="searchBar">
        <input placeholder="Search for a movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <IoIosSearch className="searchIcon" onClick={() => searchMoviesByTitle(searchTerm)} />
      </div>
    </div>
  )
}

function Movies({ movies, genres, totalPages, currentPage, setCurrentPage }) {
  const [chunkSize, setChunkSize] = useState(4);

  useEffect(() => {
    // Check screen size and set chunkSize accordingly
    const updateChunkSize = () => {
      if (window.innerWidth <= 1280 && window.innerWidth > 720) {
        setChunkSize(3);
      } else if(window.innerWidth <= 720 && window.innerWidth > 580){
        setChunkSize(2);
      } else if(window.innerWidth <= 580) {
        setChunkSize(1);
      } else {
        setChunkSize(4)
      }
    };

    // Initial check
    updateChunkSize();

    // Update chunkSize on window resize
    window.addEventListener('resize', updateChunkSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateChunkSize);
    };
  }, []);

  const movieChunks = (movies, chunkSize) => {
    const newList = movies.slice();
    const chunks = [];
    for(let i=0; i<movies.length; i+=chunkSize){
      chunks.push(newList.slice(i, i+chunkSize));
    }
    return chunks;
  }

  const chunks = movieChunks(movies, chunkSize)
  return (
    <div className="moviesContainer">
      {chunks?.length > 0 ? (
        chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="moviesRow">
            {chunk.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} genres={genres} />
            ))}
          </div>
        ))
      ) :
      (
        <div className="emptyMovies">
            <h2>No movies found!</h2>
          </div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

function Pagination({totalPages, currentPage, setCurrentPage}) {
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);

  useEffect(() => {
    if(currentPage <= 3) {
      setStartPage(1);
      setEndPage(6);
    } else if(currentPage > 3 && currentPage < totalPages-3) {
      setStartPage(Math.max(1, currentPage-2))
      setEndPage(Math.min(currentPage+3,totalPages));
    } else if(currentPage >= totalPages-3) {
      setStartPage(totalPages-6);
      setEndPage(totalPages);
    }
  }, [currentPage, totalPages])

  return (
    <ul className="pagination">
      {Array.from({length: endPage-startPage}, (_, index) => (
        <li key={index} onClick={() => setCurrentPage(startPage+index)}>{startPage+index}</li>
      ))}
    </ul>
  )
}

export default App;
