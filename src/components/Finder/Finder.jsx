import React, { Component } from 'react';
import { Searchbar } from './Searchbar.jsx';
import { ImageGallery } from './ImageGallery.jsx';
import { Dna } from 'react-loader-spinner';
import { LoadBtn } from './LoadBtn.jsx';
import { Modal } from './Modal.jsx';

export class Finder extends Component {
  state = {
    api: 'https://pixabay.com/api/',
    key: '37137772-1a086c34cc6bb66f52c7a1fd6',
    input: '',
    elements: [],
    loading: false,
    loadMore: false,
    page: 1,
    nextElements: [],
    showModal: false,
    selectedImage: '',
  };

  handleInputChange = e => {
    this.setState({
      input: e.currentTarget.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { api, key, input } = this.state;

    if (input.trim().length === 0) {
      alert('Заповніть поле пошуку');
      return;
    }

    this.setState({ elements: [] });

    fetch(
      `${api}?q=${input}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(result => {
        if (result.total === 0) {
          alert(`На жаль ${input} не знайдено`);
          this.setState({ loading: false });
          return;
        } else {
          const { hits } = result;
          const newElements = hits.map(el => ({
            id: el.id,
            img: el.webformatURL,
            modalImg: el.largeImageURL,
          }));
          this.setState({
            elements: newElements,
            loading: false,
            loadMore: true,
          });
        }
      })
      .catch(console.log);

    this.setState({ page: 2 });
  };

  onClick = () => {
    this.setState(prevState => ({
      elements: [...prevState.elements, ...prevState.nextElements],
      page: prevState.page + 1,
      nextElements: [],
    }));

    const { api, key, input, page } = this.state;

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
          this.setState({ loading: false });
          return;
        } else {
          const { hits } = result;
          const newElements = hits.map(el => ({
            id: el.id,
            img: el.webformatURL,
            modalImg: el.largeImageURL,
          }));
          this.setState(prevState => ({
            elements: [...prevState.elements, ...newElements],
            loading: false,
          }));
        }
      })
      .catch(console.log);
  };

  toggleModal = (id = '') => {
    const { elements } = this.state;
    const selectedImage = elements.find(el => el.id === id)?.modalImg || '';
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage,
    }));
  };

  render() {
    const { input, elements, loading, loadMore, showModal, selectedImage } =
      this.state;

    return (
      <div>
        <Searchbar
          handleInputChange={this.handleInputChange}
          input={input}
          onSubmit={this.onSubmit}
        />
        <ImageGallery elements={elements} toggleModal={this.toggleModal} />
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
        {loadMore && <LoadBtn onClick={this.onClick} />}
        {showModal && (
          <Modal modalImg={selectedImage} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
