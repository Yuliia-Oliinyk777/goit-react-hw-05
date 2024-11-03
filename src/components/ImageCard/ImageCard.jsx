import style from './ImageCard.module.css';
const ImageCard = ({ photo, onClick }) => {
  return (
    <div>
      <img
        onClick={() => onClick(photo)}
        className={style.image}
        src={photo.urls.small}
        alt={photo.alt_description}
      />
    </div>
  );
};

export default ImageCard;
