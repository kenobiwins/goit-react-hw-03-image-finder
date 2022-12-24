import { Component } from 'react';
import { getImages } from 'service/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
// idle
// pending
// resolved
// rejected
export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    // isOpen: false,
    status: 'idle',
    page: 1,
  };

  async componentDidMount() {
    const { page, searchQuery } = this.state;
    try {
      this.setState({ status: 'pending' });
      const images = await getImages(page, searchQuery);
      this.setState({ images: [...images.hits], status: 'resolved' });
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    try {
      if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
        this.setState({ status: 'pending' });
      }
      if (prevState.searchQuery !== searchQuery) {
        const images = await getImages(page, searchQuery);
        this.setState({ images: [...images.hits], status: 'resolved' });
      }
      if (prevState.page !== page) {
        const images = await getImages(page, searchQuery);
        this.setState({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
        });
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
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            // isOpen={this.state.isOpen}
            onClick={this.handleClickOnImage}
          />
        )}
        {images.length > 0 && status === 'resolved' && (
          <Button loadMore={this.handleLoadMore} />
        )}
        {status === 'pending' && <Loader />}
      </>
    );
  }
}
