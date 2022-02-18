import  React from 'react';
import '../../css/Footer.css';

const Footer = () => {
    if (window.location.pathname.includes('room')) return null; 
    return (
            <div className="footer">
                     @Neodu
            </div>
    )
}


export default Footer;