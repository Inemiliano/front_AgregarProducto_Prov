import React, { useEffect } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import './Notification.css';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <IoIosCheckmarkCircleOutline className="notification-icon" />
      <span className="notification-message">{message}</span>
    </div>
  );
};

export default Notification;
