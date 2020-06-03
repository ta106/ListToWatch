import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetItem, RateItem } from "../../redux/actions/imdbActions";
import Modal from "react-modal";
import {
  RemoveFromList,
  AddToList,
  AddList,
} from "../../redux/actions/listActions";
import Rating from "react-rating";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function ItemDetails({ imdbID, modalIsOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [item, setActive] = useState();
  const lists = useSelector((state) => state.lists);
  const [listName, setName] = useState();
  useEffect(() => {
    async function getData() {
      let res = await dispatch(GetItem(imdbID));

      setActive(res);
    }
    getData();
  }, [item, dispatch, imdbID]);

  function closeModal() {
    setIsOpen(false);
  }
  async function rate(e) {
    let newItm = { ...item, stars: e };

    await dispatch(RateItem(newItm));
    setActive(newItm);
  }
  return !item ? (
    <> </>
  ) : (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="row">
        <div className="col-lg-5">
          <div
            id="carousel-thumb"
            className="carousel slide carousel-fade carousel-thumbnails"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={item.Poster}
                  alt={item.Title}
                />
                <div>
                  <h4>
                    <span style={{ color: "#E8C547" }}>
                      <strong>IMDB</strong>
                    </span>
                    Rating : {item.imdbRating} / 10
                  </h4>

                  {item.stars ? <h4>Your Rating</h4> : <h4>Rate?</h4>}
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                    initialRating={item.stars}
                    onClick={rate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7" style={{ width: "100px" }}>
          <div className="text-center">{item.Title}</div>
          {item.Plot}
          <h3>Playlists</h3>
          <fieldset className="form-group">
            <div className="form-check">
              {lists.map((list) => {
                return (
                  <label key={list.id} className="form-check-label m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={list.items.some((i) => i.imdbID === imdbID)}
                      onChange={async (e) => {
                        (await list.items.some((i) => i.imdbID === imdbID))
                          ? await dispatch(
                              RemoveFromList({
                                imdbID,
                                list_id: list.id,
                              })
                            )
                          : await dispatch(AddToList(item, list.id));
                      }}
                    />
                    {list.name}
                  </label>
                );
              })}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  let id = await dispatch(
                    AddList({
                      name: listName,
                    })
                  );
                  await dispatch(AddToList(item, id));
                  setName("");
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="New list?"
                    value={listName}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </form>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="text-center">
        <button type="button" className="btn btn-danger" onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  );
}
