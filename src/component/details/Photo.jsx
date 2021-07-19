import "./photo.scss"
import Details from './Details';
import { useState } from 'react';

const Photo = ({pic}) => {
    const [popup, setPopup] = useState(false);
    return (
        <>
        <div className="pic">
            <img src={pic.urls.regular} onClick={() => setPopup(true)} alt=""/>
        </div>
        <Details pic={pic}  trigger={popup} setTrigger={setPopup} />
        </>
    )
}

export default Photo
