import "./gallery.scss";
import { useState } from "react";
import { useEffect } from "react";
import Photo from "../details/Photo";
import InfiniteScroll from 'react-infinite-scroll-component';


const clientID = `?client_id=${'fPSfgmvsPYgVYZbryPBLXR-ufETie_SoEa_0EgBUiKk'}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    
    fetchImages()
    // eslint-disable-next-line
  },[page]);

  useEffect(() => {
     const event = window.addEventListener("scroll", () => {
      if ((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
        setPage((oldPage) => {
          return oldPage + 1;
        })
      }
    })
    return () => window.removeEventListener("scroll", event)
    // eslint-disable-next-line
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
  }
  
  return (
    <div className="gallery">
    <div className="searchBox">
      <h1>Photo gallery</h1>
      <div className="search">
        <input type="text" placeholder="Search your favourite pictures" value={query} onChange={ (e) => setQuery(e.target.value) }/>
        
        <button className="icon"   onClick={ handleSubmit }>Search</button>
      </div>
    </div>
    
    <InfiniteScroll
        dataLength={photos.length}
        next={fetchImages}
        hasMore={true}
        loader={"Loading..."}
      >
      <div className="picture">
        {photos.map((pic) => {
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
