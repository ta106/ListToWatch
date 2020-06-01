import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetItem } from "../../redux/actions/imdbActions";
import Modal from "react-modal";
import { RemoveFromList, AddToList } from "../../redux/actions/listActions";
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
  useEffect(() => {
    async function getData() {
      const res = await dispatch(GetItem(imdbID));
      setActive(res);
    }
    getData();
  }, [item, dispatch, imdbID]);

  function closeModal() {
    setIsOpen(false);
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
                console.log(list);
                return (
                  <label key={list.id} className="form-check-label">
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
                    {list.name + "   "}
                  </label>
                );
              })}
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
