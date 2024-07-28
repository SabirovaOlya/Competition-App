import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { IoMenuOutline } from "react-icons/io5";

import './style.scss'



function Header({ onSidebarToggle, isSidebarMini }) {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [isFullScreen, setIsFullScreen] = useState(false);

   useEffect(() => {
      const handleWindowResize = () => {
         setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleWindowResize);
      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   });

   const toggleFullScreen = () => {
      const elem = document.documentElement;
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
         if (elem.requestFullscreen) {
            elem.requestFullscreen();
         } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
         } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
         }
         setIsFullScreen(true);
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
         }
         setIsFullScreen(false);
      }
   };

   const handleFullScreen = () => {
      toggleFullScreen();
   };


   return (
      <React.Fragment>
         <header className={isSidebarMini ? 'mini_header' : ''}>
            {
               windowWidth < 992 && (
                  <div className="mobile_menu">
                     <IoMenuOutline onClick={onSidebarToggle} className='toggle' />
                  </div>
               )
            }
            <Link className='logo_text' to='/'>MatchFight</Link>
            <div className='header_last'>
               <div className="full_screen_icon" onClick={handleFullScreen}>
                  <button> {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />} </button>
               </div>
            </div>
         </header>
      </React.Fragment>
   )
}

export default memo(Header)