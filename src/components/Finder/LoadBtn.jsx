import css from './Finder.module.css';

export const LoadBtn = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      Load More
    </button>
  );
};
