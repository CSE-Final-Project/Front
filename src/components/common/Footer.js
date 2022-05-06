import  React from 'react';
import '../../css/Footer.css';

const Footer = () => {
    if (window.location.pathname.includes('room')) return null; 
    return (
            <div className="footer">
                     @Neodo
            </div>
    )
}


export default Footer;