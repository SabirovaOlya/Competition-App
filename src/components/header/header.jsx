import React, { memo, useEffect, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { IoMenuOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";


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
   }, []);

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
            <div className='header_last'>
               <div className="full_screen_icon" onClick={handleFullScreen}>
                  <button> {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />} </button>
               </div>
            </div>
            <Dropdown placement="bottom-end">
               <DropdownTrigger>
                  <Avatar
                     isBordered
                     as="button"
                     className="transition-transform"
                     color="primary"
                     name="Jason Hughes"
                     size="sm"
                     fallback={
                        <FaUser />
                     } 
                  />
               </DropdownTrigger>
               <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={
                     () =>{
                        window.localStorage.removeItem('token')
                        window.location.reload(false);
                        window.location.pathname = '/';
                     }
                  }>
                     Log Out
                  </DropdownItem>
               </DropdownMenu>
            </Dropdown>
         </header>
      </React.Fragment>
   )
}

export default memo(Header)