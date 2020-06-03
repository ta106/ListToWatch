import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemsAlbum from "./common/ItemsAlbum";

const List = () => {
  let { id } = useParams();
  id = parseInt(id);
  const list = useSelector((state) => state.lists).find((ls) => ls.id === id);

  return (
    <>
      <h1>{list.name}</h1>
      <ItemsAlbum
        list={list.items}
        className="btn btn-sm btn-outline-secondary"
        action="View"
      ></ItemsAlbum>
    </>
  );
};
export default List;
