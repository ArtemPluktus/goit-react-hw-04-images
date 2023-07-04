import PropTypes from 'prop-types';
import css from './Finder.module.css';

export const ImageGallery = ({ elements, toggleModal }) => {
  return (
    <ul className={css.imageGallery}>
      {elements.map(({ id, img }) => {
        return (
          <li
            className={css.imageGalleryItem}
            key={id}
            onClick={() => toggleModal(id)}
          >
            <img src={img} alt="" className={css.imageGalleryItemImage} />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  elements: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
