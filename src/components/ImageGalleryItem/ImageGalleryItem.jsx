import { ListItem, Picture } from './ImageGalleryItem.styled';

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
