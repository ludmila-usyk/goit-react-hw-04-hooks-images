import { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import Container from './components/Container';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import pixabayApi from './services/pixabay.api';
import PropTypes from 'prop-types';

export default function App() {

  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [q, setQ] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeQuery = query => {
    setQ({ q: query, page: 1, gallery: [], error: null });
  };

  const fetchGallery = () => {
    const { q, page } = this.state;
    const options = { q, page };
  }
    useEffect(() => {

      setIsLoading({ isLoading: true });
      pixabayApi
        .fetchPixabayImgs( setGallery, setPage )
        .then(gallery => {
          setLargeImage (prevState => [...prevState, ...gallery])
        })
        .catch (error => {setError(error)})
        .finally(() => {
          setIsLoading( false )})
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });

  const imgClick = largeImageURL => {
    setLargeImage({
      largeImage: largeImageURL,
    });

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
    const shouldShowLoadMoreBtn = gallery.length > 0 && !isLoading;
    return (
      <Container>
        {error && <h1>Try again!</h1>}
        <Searchbar onSubmit={onChangeQuery} />
        <ImageGallery showGallery={gallery} onImgClick={imgClick} />

        {isLoading && <Loader />}
        {shouldShowLoadMoreBtn && <Button onClick={fetchGallery} />}

        {showModal && (
          <Modal onClose={imgClick}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </Container>
    );
}

App.propTypes = {
  gallery: PropTypes.array,
  page: PropTypes.number,
  q: PropTypes.string,
  largeImage: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};