import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdateList } from "../redux/actions/listActions";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Album from "./common/Album";
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
export const Dashboard = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [activeLst, setActive] = React.useState({});
  function openModal(id, name) {
    setActive({ id, name });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const lists = useSelector((state) => state.lists);
  return (
    <>
      <h1>Your Playlists</h1>
      <Album
        key={1}
        imgs={lists.map((list) => {
          return {
            name: list.name,
            id: list.id,
            img_url: list.items.length > 0 ? list.items[0].img_url : "",
            children: (
              <div className="btn-group">
                <Link
                  className="btn btn-sm btn-outline-secondary"
                  to={"/list/" + list.id}
                >
                  View
                </Link>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary "
                  onClick={() => {
                    openModal(list.id, list.name);
                  }}
                >
                  Rename
                </button>
              </div>
            ),
          };
        })}
      ></Album>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let name = e.target[`name`].value;
            let id = e.target[`id`].value;
            await dispatch(UpdateList({ id, name }));
            closeModal();
          }}
        >
          <input type="hidden" name="id" value={activeLst.id} />

          <div className="form-group">
            <input
              className="form-control"
              name="name"
              placeholder={activeLst.name}
            />
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={closeModal}
            >
              close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;
