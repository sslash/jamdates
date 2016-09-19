import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import Stl from './modalStl.css';

const ModalWrapper = (props) => {
  return (
        <Modal
          style={style}
          closeTimeoutMS={150}
          isOpen={props.modalIsOpen}
          onAfterOpen={props.handleOnAfterOpenModal}
          onRequestClose={props.handleModalCloseRequest}
        >
            {props.children}
        </Modal>
    );
};

const style = {
  overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.90)',
    },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px',

  },
};

ModalWrapper.propTypes = {

};

ModalWrapper.defaultProps = {
  modalIsOpen: true,
  onAfterOpen: () => {},
  onRequestClose: () => {},
};

export default ModalWrapper;
