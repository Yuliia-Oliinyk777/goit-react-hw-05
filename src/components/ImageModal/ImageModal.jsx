import style from './ImageModal.module.css';
import ReactModal from 'react-modal';
const ImageModal = ({ selectedPhoto, isOpen, onRequestClose }) => {
  return (
    <ReactModal
      className={style.modalContent}
      overlayClassName={style.backdrop}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <img
        className={style.modalImg}
        src={selectedPhoto.urls.regular}
        alt={selectedPhoto.alt_description}
      />
    </ReactModal>
  );
};

export default ImageModal;
