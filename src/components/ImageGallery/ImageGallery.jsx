import style from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ photos, onClick }) => {
  return (
    <div className={style.listBox}>
      <ul className={style.list}>
        {photos.map(photo => (
          <li key={photo.id} className={style.listItem}>
            <ImageCard photo={photo} onClick={onClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
