import './details.scss';

const Details = (props) => {
    return (props.trigger) ? (
        <>
        <div className="detail">
            <button className="close" onClick={()=>props.setTrigger(false)}>Close</button> 
            <img src={props.pic.urls.regular} alt="" />
            <p>
                {props.pic.alt_description}
                <h6>{props.pic.created_at}</h6>
                <h6>Views :{props.pic.views}</h6>
            </p> 
                      
        </div>
        
        </>
    ) : "";
  
};

export default Details;
