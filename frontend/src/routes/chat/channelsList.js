import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import AddChannelModal from "./AddChannelModal";
import styles from "./styles.css";
import DeleteChannelModal from "./DeleteChannelModal";

const ChannelsList = ({ activeChannel, setActiveChannel, onChannelClick }) => {
  const channels = useSelector((state) => state.chat.channels);
  const messages = useSelector((state) => state.chat.messages);

  const [channelToDelete, setChannelToDelete] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setChannelToDelete(null);
  }

  const handleShowDeleteModal = (channelId) => {
    setShowDeleteModal(true);
    setChannelToDelete(channelId);
  }

  const [showMenu, setShowMenu] = useState(false);
  const [openMenuChannelId, setOpenMenuChannelId] = useState(null);

  const handleCloseMenu = () => {
    setShowMenu(false);
    setOpenMenuChannelId(null);
  };
  const handleShowMenu = (channelId) => {
    setShowMenu(true);
    setOpenMenuChannelId(channelId);
  };

  useEffect(() => {
    handleCloseMenu();
  }, [activeChannel]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          onClick={handleShowAddModal}
          type="button"
          class="p-0 text-primary btn btn-group-vertical"
        >
          +
        </button>
        <AddChannelModal
          setActiveChannel={setActiveChannel}
          show={showAddModal}
          handleClose={handleCloseAddModal}
        />
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
              key={channel.id}
            >
              <div role="group" class="d-flex show dropdown btn-group">
                <button
                  type="button"
                  className={classNames(
                    "w-100",
                    "rounded-0 ",
                    "text-start",
                    { "text-truncate": channel.removable === true },
                    "btn",
                    { "btn-secondary": channel.id === activeChannel }
                  )}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                {channel.removable === true ? (
                  <>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log(channel.id);
                        if (openMenuChannelId) {
                          channel.id === openMenuChannelId
                            ? handleCloseMenu()
                            : handleShowMenu(channel.id);
                        } else {
                          handleShowMenu(channel.id);
                        }
                      }}
                      type="button"
                      aria-expanded="false"
                      className={classNames(
                        "flex-grow-0",
                        "dropdown-toggle",
                        "dropdown-toggle-split",
                        "btn",
                        { "btn-secondary": channel.id === activeChannel }
                      )}
                    >
                      <span className="visually-hidden">
                        Управление каналом
                      </span>
                    </button>
                    <div
                      x-placement="bottom-end"
                      data-popper-reference-hidden="false"
                      data-popper-escaped="false"
                      data-popper-placement="botton-end"
                      className={classNames(
                        styles.dropDownMenu,
                        "dropdown-menu",
                        { show: showMenu && openMenuChannelId === channel.id },
                        { hidden: !showMenu || openMenuChannelId === null }
                      )}
                    >
                      <a
                        onClick={(event) => {
                          event.preventDefault();
                          handleShowDeleteModal(channel.id);
                        }}
                        data-rr-ui-dropdown-item
                        role="button"
                        class="dropdown-item"
                        tab-index="0"
                        href="#"
                      >
                        Удалить
                      </a>
                      <DeleteChannelModal
                        show={showDeleteModal}
                        handleClose={handleCloseDeleteModal}
                        setActiveChannel={setActiveChannel}
                        channelId={channelToDelete}
                        messages={messages}
                      />
                      <a
                        data-rr-ui-dropdown-item
                        role="button"
                        class="dropdown-item"
                        tab-index="0"
                        href="#"
                      >
                        Переименовать
                      </a>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChannelsList;
