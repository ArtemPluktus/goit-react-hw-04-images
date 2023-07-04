import { useState } from 'react';
import { Searchbar } from './Searchbar.jsx';
import { ImageGallery } from './ImageGallery.jsx';
import { Dna } from 'react-loader-spinner';
import { LoadBtn } from './LoadBtn.jsx';
import { Modal } from './Modal.jsx';

export function Finder() {
  const [api] = useState('https://pixabay.com/api/');
  const [key] = useState('37137772-1a086c34cc6bb66f52c7a1fd6');
  const [input, setInput] = useState(``);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [nextElements, setNextElements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(``);

  const handleInputChange = e => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    setLoading(true);

    if (input.trim().length === 0) {
      alert('Заповніть поле пошуку');
      setLoading(false);
      return;
    }

    setElements([]);

    fetch(
      `${api}?q=${input}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(result => {
        if (result.total === 0) {
          alert(`На жаль ${input} не знайдено`);
          setLoading(false);
          setLoadMore(false);
          return;
        } else {
          const { hits } = result;
          const newElements = hits.map(el => ({
            id: el.id,
            img: el.webformatURL,
            modalImg: el.largeImageURL,
          }));
          setElements(newElements);
          setLoadMore(true);
          setLoading(false);
        }
      })
      .catch(console.log);

    setPage(2);
  };

  const onClick = () => {
    setElements([...elements, ...nextElements]);
    setPage(state => state + 1);
    setNextElements([]);

    if (input.trim().length === 0) {
      alert('Заповніть поле пошуку');
      return;
    }
    fetch(
      `${api}?q=${input}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(result => {
        if (result.total === 0) {
          alert(`На жаль ${input} не знайдено`);
          setLoading(false);
          return;
        } else {
          const { hits } = result;
          const newElements = hits.map(el => ({
            id: el.id,
            img: el.webformatURL,
            modalImg: el.largeImageURL,
          }));
          setElements([...elements, ...newElements]);
          setLoading(false);
        }
      })
      .catch(console.log);
  };

  const toggleModal = (id = '') => {
    const selectedImage = elements.find(el => el.id === id)?.modalImg || '';
    setShowModal(state => !state);
    setSelectedImage(selectedImage);
  };

  return (
    <div>
      <Searchbar
        handleInputChange={handleInputChange}
        input={input}
        onSubmit={onSubmit}
      />
      <ImageGallery elements={elements} toggleModal={toggleModal} />
      {loading && (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{
            display: 'block',
            marginRight: 'auto',
            marginLeft: `auto`,
          }}
          wrapperClass="dna-wrapper"
          marginRight="50%"
        />
      )}
      {loadMore && <LoadBtn onClick={onClick} />}
      {showModal && <Modal modalImg={selectedImage} onClose={toggleModal} />}
    </div>
  );
}
