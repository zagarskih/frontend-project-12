import React, { useState, useEffect, useId } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import AddChannelModal from './AddChannelModal';
import DropDownMenu from './DropDownMenu';

const ChannelsList = ({ activeChannel, setActiveChannel, onChannelClick }) => {
  const { t } = useTranslation();
  const channelId = useId();
  const channels = useSelector((state) => state.chat.channels);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openMenuChannelId, setOpenMenuChannelId] = useState(null);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

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
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>{t('interface.channelsHead')}</b>
        <button
          onClick={handleShowAddModal}
          type='button'
          className='p-0 text-primary btn btn-group-vertical'
        >
          {t('interface.addChannelButton')}
        </button>
        <AddChannelModal
          setActiveChannel={setActiveChannel}
          show={showAddModal}
          handleClose={handleCloseAddModal}
        />
      </div>
      <div className='h-100'>
        <ul
          id='channels-box'
          className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
        >
          {channels.map((channel) => (
            <li
              className='nav-item w-100'
              onClick={() => onChannelClick(channel.id)}
              key={channel.id}
            >
              <div role='group' className='d-flex show dropdown btn-group'>
                <button
                  name={channel.name}
                  aria-label={channel.name}
                  type='button'
                  id={channelId}
                  className={classNames(
                    'w-100',
                    'rounded-0',
                    'text-start',
                    { 'text-truncate': channel.removable === true },
                    'btn',
                    { 'btn-secondary': channel.id === activeChannel }
                  )}
                >
                  <span className='me-1'>#</span>
                  {channel.name}
                </button>
                {channel.removable && (
                  <DropDownMenu
                    showMenu={showMenu}
                    openMenuChannelId={openMenuChannelId}
                    handleShowMenu={handleShowMenu}
                    activeChannel={activeChannel}
                    setActiveChannel={setActiveChannel}
                    handleCloseMenu={handleCloseMenu}
                    channel={channel}
                  />
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
