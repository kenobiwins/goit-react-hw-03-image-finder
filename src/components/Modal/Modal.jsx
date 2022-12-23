import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow } from './Modal.styled';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  handleClose = e => {
    const { target, currentTarget } = e;

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
