import "./gallery.scss";
import Search from '@material-ui/icons/Search';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import Photo from "../details/Photo";
import InfiniteScroll from 'react-infinite-scroll-component';

const Gallery = () => {
  const [images, setImage] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  
  // const callApi = () => {
  //   fetch(
  //     "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=33e419272909fde9667e254ea9783126&format=json&nojsoncallback=1&text=cats&extras=url_o"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setPhoto(data.photos.photo));
  // };
  // useEffect(() => {
  //   callApi();
  // }, []);
   

  

  const fetchImages = (count = 100) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = '3b0NYCsiB-gWCubgOeAtUA73-hNy6Yj_Lejsdufckq4';

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImage([...images, ...res.data]);
      })
  }
  useEffect(() => {
    fetchImages();
  }, [])

  function handleSeach(e){
    e.preventDefault();
    setInputSearch(e.target.value)

  }

  
  
  console.log(images)
  
  return (
    <div className="gallery">
    <div className="searchBox">
      <h1>Photo gallery</h1>
      <div className="search">
        <input type="text" placeholder="Search your favourite pictures" value={inputSearch} onChange={handleSeach}/>
        <Search className="icon"/>
      </div>
    </div>
    
    <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={"Loading..."}
      >
      <div className="picture">
        {images.map((pic) => {
          return (
          <div key={pic.id}>
            <Photo pic={pic}  /> 
          </div>
          )
        })}
      </div>

      </InfiniteScroll>
      
    </div>
  );
};

export default Gallery;
