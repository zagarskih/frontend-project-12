import React, { useState, useRef, useEffect } from "react";
import DeleteChannelModal from "./DeleteChannelModal";
import EditChannelModal from "./EditChannelModal";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { createPopper } from "@popperjs/core";

const DropDownMenu = ({
  showMenu,
  openMenuChannelId,
  handleShowMenu,
  handleCloseMenu,
  activeChannel,
  setActiveChannel,
  channel,
}) => {
  const messages = useSelector((state) => state.chat.messages);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setChannelToDelete(null);
  };

  const handleShowDeleteModal = (channelId) => {
    setShowDeleteModal(true);
    setChannelToDelete(channelId);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editChannelId, setEditChannelId] = useState(null);

  const handleShowEditModal = (channelId) => {
    setShowEditModal(true);
    setEditChannelId(channelId);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditChannelId(null);
  };

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    if (openMenuChannelId) {
      channel.id === openMenuChannelId
        ? handleCloseMenu()
        : handleShowMenu(channel.id);
    } else {
      handleShowMenu(channel.id);
    }
  };

  useEffect(() => {
    if (showMenu && openMenuChannelId === channel.id) {
      createPopper(buttonRef.current, menuRef.current, {
        placement: "bottom-start",
      });
    }
  }, [showMenu, openMenuChannelId, channel.id]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        type="button"
        aria-expanded={showMenu && openMenuChannelId === channel.id}
        className={classNames(
          "flex-grow-0",
          "dropdown-toggle",
          "dropdown-toggle-split",
          "btn",
          { "btn-secondary": channel.id === activeChannel },
          { "btn-outline-secondary": showMenu && openMenuChannelId === channel.id }
        )}
      >
        <span className="visually-hidden">Управление каналом</span>
      </button>
      <div
        ref={menuRef}
        className={classNames(
          "dropdown-menu",
          { show: showMenu && openMenuChannelId === channel.id },
        )}
      >
        <a
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleShowDeleteModal(channel.id);
          }}
          data-rr-ui-dropdown-item
          role="button"
          className="dropdown-item"
          tabIndex="0"
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
          onClick={(event) => {
            event.preventDefault();
            handleShowEditModal(channel.id);
          }}
          data-rr-ui-dropdown-item
          role="button"
          className="dropdown-item"
          tab-index="0"
          href="#"
        >
          Переименовать
        </a>
        <EditChannelModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          channelId={editChannelId}
        />
      </div>
    </>
  );
};

export default DropDownMenu;
