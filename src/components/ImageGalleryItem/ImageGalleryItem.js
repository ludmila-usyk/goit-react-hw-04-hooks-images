import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, onImgClick }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt="img"
        className={style.ImageGalleryItemImage}
        onClick={onImgClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
};

export default ImageGalleryItem;