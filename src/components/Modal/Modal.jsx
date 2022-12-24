import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow } from './Modal.styled';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  handleClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.toggleModal();
      return;
    }
    return;
  };
  render() {
    const { src, tags } = this.props;
    return createPortal(
      <Backdrop onClick={this.handleClose}>
        <ModalWindow>
          <img src={src} alt={tags} />
        </ModalWindow>
      </Backdrop>,
      modalRoot
    );
  }
}
