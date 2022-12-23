import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, isOpen, onClick }) => {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webURL={webformatURL}
          largeURL={largeImageURL}
          tags={tags}
          isOpen={isOpen}
          onClick={onClick}
        />
      ))}
    </ImageGalleryList>
  );
};
