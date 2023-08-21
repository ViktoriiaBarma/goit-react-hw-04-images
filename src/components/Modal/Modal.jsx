import { ModalBackdrop, ModalContent, ModalDescr } from './Modal.styled';
 import { useEffect } from "react"


export const Modal = ({closeModal, img}) => {

  useEffect(() => {
    const handlePressESC = (e) => {
    if(e.code === 'Escape') closeModal()
  }
    window.addEventListener('keydown', handlePressESC)
    return () => window.removeEventListener('keydown', handlePressESC)
   }, [closeModal])

  const { largeImageURL, tags } = img;

  return (
    <ModalBackdrop onClick={() => closeModal()}>
      <ModalContent>
        <img style={{width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',}}
          src={largeImageURL} alt={tags} />
          <ModalDescr>{tags}</ModalDescr>
      </ModalContent>
    </ModalBackdrop>
  )
}
