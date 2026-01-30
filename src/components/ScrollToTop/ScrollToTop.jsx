import React, {useState, useEffect} from "react";
import './ScrollToTop.css';

const ArrowUpIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
);

export default function ScrollToTop(){
    const [isVisible, setIsVisible]=useState(false);

    const toggleVisibility=()=>{
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
        if (window.pageYOffset>300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };
    useEffect(()=>{
        window.addEventListener('scroll', toggleVisibility);
        return ()=>{
            window.removeEventListener('scroll',toggleVisibility)
        };
    }, []);

    return(
        <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            <ArrowUpIcon/>
        </div>
    );
}