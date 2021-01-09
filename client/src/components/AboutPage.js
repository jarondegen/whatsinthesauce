import React from 'react';
import github from '../style/images/github.png';
import '../style/about-page.css';

const AboutPage = () => {
    return (
        <div className="about-page-page-container">
            <div className="how-to-container">
                <h2>Whats it all about?</h2>
                <p>WhatsInTheSauce is an app that allows you to keep your grocery lists and refridgerator organized while reducing food waste.  You'll always know when food is expiring and we will even keep track of the price so you can see the value of whats in your fridge and what you should cook for your next meal. </p>
                <h2>What else?</h2>
                <p>Thats not enough? We got you...You will get customized recipe suggestions based on what is in your fridge at any given time!</p>
                <h2>How do I use it?</h2>
                <p>Its easy. Here are some steps to get started</p>
                <ul>
                    <li>make an account</li>
                    <li>make a grocery list</li>
                    <li>add ingredients that you need to your new list</li>
                    <li>when you get home from grocery shopping, add the items to your fridge just like irl</li>
                    <li>we will keep track of everything from there.  don't forget to remove it from your fridge after you eat it</li>
                    <li>profit... well maybe not, but definitely do you part in reducing food waste, eat well and, save money!</li>
                </ul>
            </div>
            <div className="about-about-container">
                <h3>Technologies Used...</h3>
                <div>
                    <span>React</span>
                    <span>Redux</span>
                    <span>Flask</span>
                    <span>SQLAlchemy</span> 
                    <span>Docker</span>  
                </div>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/jarondegen/whatsinthesauce"><img alt="link to github" src={github} /></a>
            </div>
        </div>
    );
};

export default AboutPage;