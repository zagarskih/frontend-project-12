import React, { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import AddChannelModal from "./AddChannelModal";

const ChannelsList = ({ activeChannel, onChannelClick }) => {
  const channels = useSelector((state) => state.chat.channels);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          onClick={handleShowModal}
          type="button"
          class="p-0 text-primary btn btn-group-vertical"
        >
          +
        </button>
        <AddChannelModal show={showModal} handleClose={handleCloseModal} />
      </div>
      <div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) => (
            <li
              className="nav-item w-100"
              onClick={() => onChannelClick(channel.id)}
            >
              <button
                type="button"
                key={channel.id}
                // onClick={handleAddChannel}
                className={classNames(
                  "w-100",
                  "rounded-0 ",
                  "text-start",
                  "btn",
                  { "btn-secondary": channel.id === activeChannel }
                )}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChannelsList;
