import './nav.scss'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useState } from 'react';

const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = ()=>{
        setIsScrolled(window.pageYOffset === 0 ? false :true)
    }
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <h1 className="logo">PHOTO</h1>
                    <span>Homepage</span>
                    <span>PhotoGallery</span>
                    
                </div>
                <div className="right">
                    <img src="https://i0.wp.com/shutterfly.com/ideas/wp-content/uploads/2017/08/floating-bubbles.jpg" alt="" />
                    <div className="profile">
                    <ArrowDropDownIcon className="icon"/>
                     <div className="options">
                         <span>Settings</span>
                         <span>Logout</span>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav
