import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Loader from '../Loader/Loader.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { Toaster } from 'react-hot-toast';
import ImageModal from '../ImageModal/ImageModal.jsx';
import ReactModal from 'react-modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
ReactModal.setAppElement('#root');
const MY_KEY = 'plb-2WIQfuGjMIFFPU7xcBxwi8LnwaFgHuhyjWmfmXc';
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const PER_PAGE = 20;

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = searchTerm => {
    setQuery(searchTerm);
    setPhotos([]);
    setPage(1);
  };
  const handleOpenModal = photo => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedPhoto(null);
  };
  useEffect(() => {
    if (!query) return;
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          'https://api.unsplash.com/search/photos',
          {
            params: {
              query,
              page,
              per_page: PER_PAGE,
              orientation: 'landscape',
              client_id: MY_KEY,
            },
          }
        );
        setPhotos(prevPhotos => [...prevPhotos, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhoto();
  }, [query, page]);

  return (
    <>
      {' '}
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <ImageGallery photos={photos} onClick={handleOpenModal} />
      )}
      {selectedPhoto && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          selectedPhoto={selectedPhoto}
        />
      )}
      {photos.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn loadMore={handleLoadMore} />
      )}
    </>
  );
};

export default App;
