import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Finder.module.css';

export const Modal = ({ modalImg, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      {' '}
      <div className={css.modal}>
        <img src={modalImg} alt="" />{' '}
      </div>{' '}
    </div>
  );
};

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
