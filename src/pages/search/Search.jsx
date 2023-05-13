import React from "react";
import Navbar from "../../component/NavBar/Navbar";
import SearchForm from "../../component/Search/SeacrchForm";
import { useSearchParams } from "react-router-dom";
import ResultList from "../../component/ResultList/ResultList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const [search] = useSearchParams();
  return (
    <div className="app">
      <Navbar />
      <SearchForm />
      <ResultList search={search.get("query")} />
      <ToastContainer />
    </div>
  );
};

export default Search;
