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
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    
      setIsLoading({ isLoading: true });
      pixabayApi
        .fetchPixabayImgs( gallery, page )
        // .then(({data}) => {
        //   if (page === 1) {
        //     gallery([...data.hits]);
        //   } else {
        //     gallery (prevState => 
        //       setGallery([...prevState, ...data.hits]))
        //   }
        .then(gallery => {
          setGallery(prevState => [...prevState, ...gallery]);
        })

          //setGallery (prevState => [...prevState, ...data.hits]);
          setPage( prevState => prevState + 1)
        // })



        
        // .then(data => {
        //   if (page === 1) {
        //     setGallery(data.hits);
        //   } else {
        //     setGallery(prevState => [...prevState, ...data.hits]);
        //     window.scrollTo({
        //       top: document.documentElement.scrollHeight,
        //       behavior: 'smooth',
        //     });
        //   }
        })

        .catch (error => {setError(error)})
        .finally(() => {
          setIsLoading( false )})
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, [ page, query ]);




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

  const onChangeQuery = query => {
    setQuery({ query: query, page: 1, gallery: [], error: null });
  };

  const fetchGallery = () => {
    const { query, page } = this.state;
    const options = { query, page };
  }

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
  query: PropTypes.string,
  largeImage: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};



// import React, { Component } from 'react';
// import Button from './components/Button/Button';
// import Container from './components/Container';
// import ImageGallery from './components/ImageGallery/ImageGallery';
// import Loader from './components/Loader/Loader';
// import Modal from './components/Modal/Modal';
// import Searchbar from './components/Searchbar/Searchbar';
// import pixabayApi from './services/pixabay.api';
// import PropTypes from 'prop-types';

// class App extends Component {
//   state = {
//     gallery: [],
//     page: 1,
//     largeImage: '',
//     showModal: false,
//     q: '',
//     isLoading: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.q !== this.state.q) {
//       this.fetchGallery();
//     }
//   }

//   onChangeQuery = query => {
//     this.setState({ q: query, page: 1, gallery: [], error: null });
//   };
//   fetchGallery = () => {
//     const { q, page } = this.state;
//     const options = { q, page };

//     this.setState({ isLoading: true });
//     pixabayApi
//       .fetchPixabayImgs(options)
//       .then(({ data }) => {
//         this.setState(prevState => ({
//           gallery: [...prevState.gallery, ...data.hits],
//           page: prevState.page + 1,
//         }));
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => {
//         this.setState({ isLoading: false });
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       });
//   };

//   imgClick = largeImageURL => {
//     this.setState({
//       largeImage: largeImageURL,
//     });

//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { showModal, gallery, isLoading, error, largeImage } = this.state;
//     const shouldShowLoadMoreBtn = gallery.length > 0 && !isLoading;
//     return (
//       <Container>
//         {error && <h1>Try again!</h1>}
//         <Searchbar onSubmit={this.onChangeQuery} />
//         <ImageGallery showGallery={gallery} onImgClick={this.imgClick} />

//         {isLoading && <Loader />}
//         {shouldShowLoadMoreBtn && <Button onClick={this.fetchGallery} />}

//         {showModal && (
//           <Modal onClose={this.imgClick}>
//             <img src={largeImage} alt="" />
//           </Modal>
//         )}
//       </Container>
//     );
//   }
// }

// App.propTypes = {
//   gallery: PropTypes.array,
//   page: PropTypes.number,
//   q: PropTypes.string,
//   largeImage: PropTypes.string,
//   showModal: PropTypes.bool,
//   isLoading: PropTypes.bool,
//   error: PropTypes.string,
// };

// export default App;