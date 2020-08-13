import React, { useState } from "react";
import ItemsAlbum from "./common/ItemsAlbum";
import { useDispatch } from "react-redux";
import { SearchItems } from "../redux/actions/imdbActions";
import Form from "./common/Form";

export default function Search() {
  const [searchList, setSearch] = useState([]);
  // const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="container-fluid">
      <Form
        name="Search"
        onsubmit={async (e) => {
          e.preventDefault();
          let search = e.target[`search`].value;
          const res = await dispatch(SearchItems(search, 1));
          setSearch(res);
        }}
        inputs={[{ name: "search" }]}
      />

      {searchList ? (
        <ItemsAlbum
          list={searchList}
          action="Add"
          className="btn btn-sm btn-outline-primary "
        ></ItemsAlbum>
      ) : (
        <h2>No Results</h2>
      )}
    </div>
  );
}
