import { ListItem, Picture } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({showModal, data}) => {
  const {  tags, webformatURL, largeImageURL } = data;
  return (
    <ListItem>
      <Picture
        src={webformatURL}
        alt={tags}
        onClick={() => showModal({ largeImageURL, tags })}
      />
    </ListItem>
  )
}
