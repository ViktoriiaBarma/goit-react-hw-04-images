import {Searchbar} from "./Searchbar/Searchbar"
import { Loader } from "./Loader/Loader";
import { ImageGallery} from './ImageGallery/ImageGallery'
import { Modal } from './Modal/Modal'
import {Button}  from './Button/Button'
import {Wrap} from './App.styled'
import { getImg } from 'services/api';
import {useRef, useEffect, useState } from "react";
import Notiflix from 'notiflix';



export const App = () => {

  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [modalShow, setModalShow] = useState({})
  const [loadMore, setLoadMore] = useState(false)
  const [gallery, setGallery] = useState([])
  const prevSearchTextRef = useRef([]);

  useEffect(() => {
    if (!searchText) {
      setGallery([]);
      setLoadMore(false);
      return;
    }

    if (prevSearchTextRef.current !== searchText) {
      setGallery([]); 
    }
    prevSearchTextRef.current = searchText;

    const fetchData = async () => {
      setIsLoading(true)

      const resp = await getImg(searchText, page)
      setGallery((prevGallery) => [...prevGallery, ...resp.hits]);
      if (resp.totalHits > page * 12) {
        setLoadMore(true);
        setIsLoading(false)
        Notiflix.Notify.success (`You found ${resp.totalHits} images`);
      }
      else if (resp.totalHits === 0) {
        setIsLoading(false)
        return Notiflix.Notify.failure (`No images found`);
      } else {
        setIsLoading(false)

        setLoadMore(false);
        return Notiflix.Notify.failure(`Found ${resp.hits} images`);
      }
    }

    fetchData()
  }, [searchText, page])

  const hendleInput = value => {
    if (value === searchText) {
      return `We already found images for ${value.toUpperCase()}.Please, enter another phrase`
    }
    setSearchText(value);
    setPage(1);
  };

 

  const showModal = modalShow => {
    setIsShowModal(true)
    setModalShow(modalShow)
  }

  const closeModal = () => {
    setIsShowModal(false)
  }

   const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };


    return (
      <Wrap style={{
          height: '100vh',
        }} >
        <Searchbar hendleInput={hendleInput} />
        <ImageGallery showModal={showModal} gallery={gallery}/>
        {isShowModal && (<Modal closeModal={closeModal} img={modalShow}></Modal>)}
        {isLoading && <Loader />}
        {loadMore && <Button onClick={handleLoadMore} />}
      </Wrap>
    )
  }