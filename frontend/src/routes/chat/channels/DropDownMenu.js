import React, { act, useState } from "react";
import DeleteChannelModal from "./DeleteChannelModal";
import EditChannelModal from "./EditChannelModal";
import classNames from "classnames";
import { useSelector } from "react-redux";

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

  return (
    <>
      <button
        onClick={(event) => {
          event.stopPropagation();
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
        <span className="visually-hidden">Управление каналом</span>
      </button>
      <div
        // ref={menuRef}
        // x-placement="bottom-end"
        // data-popper-reference-hidden="false"
        // data-popper-escaped="false"
        // data-popper-placement="botton-end"
        className={classNames(
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
          onClick={(event) => {
            event.preventDefault();
            handleShowEditModal(channel.id);
          }}
          data-rr-ui-dropdown-item
          role="button"
          class="dropdown-item"
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
