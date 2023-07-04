import PropTypes from 'prop-types';
import css from './Finder.module.css';

export const Searchbar = ({ input, handleInputChange, onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  input: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
