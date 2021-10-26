import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ showGallery, onImgClick }) => {
  return (
    <ul className="ImageGallery">
      {showGallery.map(({ id, webformatURL, largeImageURL }) => {
        const handleItemClick = () => onImgClick(largeImageURL);
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            onImgClick={handleItemClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  showGallery: PropTypes.array,
  onImgClick: PropTypes.func,
};

export default ImageGallery;