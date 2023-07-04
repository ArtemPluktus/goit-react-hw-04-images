import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Finder.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg, onClose } = this.props;
    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img src={modalImg} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
