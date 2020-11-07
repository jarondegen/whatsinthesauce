import React from 'react';
import wfl from '../style/images/wfl.png'
import '../style/footer.css';



const Footer = () => {

    return (
        <div className="footer-container">
            <div className="footer-logo-div">
                <div className="footer-2020">2020 WhatsInTheSauce</div>
            </div>
            <div className="footer-created-by">
            created by Jaron Degen
            </div>
            <div className="footer-wfl-outter-div">
                <a target="_blank" href="https://aawhatsforlunch.herokuapp.com/">
                    <div className="footer-wfl-inner-div">
                        <div className="need-inspiration">need some more inspiration? <br/> check this out >> </div>
                        <img className="wfl" src={wfl}/>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Footer;