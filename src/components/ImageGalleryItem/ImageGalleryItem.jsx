import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { ImageGalleryItemStyle } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    largeURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    largeURL: '',
    isOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    return;
  };

  handleClickOnImage = () => {
    this.setState({ largeURL: this.props.largeURL });
    this.handleToggleModal();
    return;
  };

  render() {
    const { webURL, tags } = this.props;
    const { isOpen, largeURL } = this.state;
    return (
      <>
        <ImageGalleryItemStyle>
          <img src={webURL} alt={tags} onClick={this.handleClickOnImage} />
          {isOpen && (
            <Modal
              // isOpen={isOpen}
              src={largeURL}
              tags={tags}
              toggleModal={this.handleToggleModal}
            />
          )}
        </ImageGalleryItemStyle>
      </>
    );
  }
}
