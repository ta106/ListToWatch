import React, { useState } from "react";
import ItemsAlbum from "./common/ItemsAlbum";
import { useDispatch } from "react-redux";
import { SearchItems } from "../redux/actions/imdbActions";

export default function Search() {
  const [searchList, setSearch] = useState([]);
  // const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="container-fluid">
      <h1>Search</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let search = e.target[`search`].value;
          const res = await dispatch(SearchItems(search, 1));
          setSearch(res);
        }}
      >
        <div className="form-group">
          <input className="form-control" name="search" />
        </div>
      </form>
      {searchList ? (
        <ItemsAlbum list={searchList}></ItemsAlbum>
      ) : (
        <h2>No Results</h2>
      )}
    </div>
  );
}
