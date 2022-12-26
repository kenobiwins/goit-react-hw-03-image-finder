import { Component } from 'react';
import { getImages } from 'service/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// idle
// pending
// resolved
// rejected
export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: 'idle',
    page: 1,
  };

  // async componentDidMount() {
  //   const { page, searchQuery } = this.state;
  //   try {
  //     this.setState({ status: 'pending' });
  //     const images = await getImages(page, searchQuery);
  //     this.setState({ images: [...images.hits], status: 'resolved' });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ status: 'rejected' });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;

    try {
      if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
        this.setState({ status: 'pending' });
      }
      if (prevState.searchQuery !== searchQuery) {
        this.setState({ images: [], page: 1 });
        const images = await getImages(page, searchQuery);
        if (!images.totalHits) {
          throw new Error('We have nothing for this query');
        }

        this.setState({
          images: [
            ...images.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }),
          ],
          status: 'resolved',
        });
      }
      if (prevState.page !== page) {
        const images = await getImages(page, searchQuery);
        this.setState({
          images: [
            ...prevState.images,
            ...images.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }),
          ],
          status: 'resolved',
        });
        if (
          images.totalHits === this.state.images.length ||
          images.hits.length < 12
        ) {
          throw new Error('You loaded all images');
        }
      }
    } catch (error) {
      console.log(error);

      this.setState({ status: 'rejected' });
    }
  }

  handleSubmit = async searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleClickOnImage = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { images, status } = this.state;
    return (
      <>
        {/* <ToastContainer /> */}
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleClickOnImage} />
        )}
        {images.length === 0 && status === 'rejected' && (
          <div>
            <img
              src="https://media.tenor.com/lndtLWwXZC0AAAAj/%D1%87%D1%82%D0%BE.gif"
              alt="what?"
            />
          </div>
        )}
        {status === 'pending' && <Loader />}
        {images.length > 0 && status === 'resolved' && (
          <Button loadMore={this.handleLoadMore} />
        )}
      </>
    );
  }
}
