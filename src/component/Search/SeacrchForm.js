import { useState, useRef } from "react";
import ResultList from "../ResultList/ResultList";
import "./SeacrchForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, createSearchParams } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();

  const fetchData = async (e) => {
    if (!searchValue) return;
    return navigate({
      pathname: "/search",
      search: createSearchParams({
        query: searchValue,
      }).toString(),
    });
  };

  const searchMovie = (e) => {
    e.preventDefault();
    fetchData(e);
  };

  return (
    <div className="Search">
      <form className="Search-Form" action="" onSubmit={searchMovie}>
        <div className="Form-item">
          <input
            className="input"
            type={"text"}
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
        <div className="Form-button">
          <button
            className="btn-Rs"
            onClick={() => {
              setSearchValue("");
              inputRef.current.focus();
            }}
          >
            RESET
          </button>
          <button className="btn-Sm" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
