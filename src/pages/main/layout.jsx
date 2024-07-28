import { BrowserRouter } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header';
import Router from './router'


function Main() {
    const [sidebarActive, setSidebarActive] = useState(false)
    const [isSidebarMini, setIsSidebarMini] = useState(false)
    const [currentPath, setCurrentPath] = useState(window.location.pathname.replace(/^\/|\/$/g, ''))


    useEffect(() => {
        const handleBeforeUnload = (e) => {
           e.preventDefault();
           e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
  
        setCurrentPath(window.location.pathname.replace(/^\/|\/$/g, ''));
  
        return () => {
           window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    const handleChangeSidebarSize = () => {
        setIsSidebarMini(!isSidebarMini)
    };

    const closeSidebar = () => {
        setSidebarActive(false)
    }

    const openSidebar = () => {
        setSidebarActive(true)
    }

    return (
        <div className='layout'>
            <BrowserRouter>
                <Sidebar
                    currentPath={currentPath}
                    sidebarActive={sidebarActive}
                    isSidebarMini={isSidebarMini}
                    setSidebarActive={setSidebarActive}
                    setIsSidebarMini={setIsSidebarMini}
                    closeSidebar={closeSidebar}
                    handleChangeSidebarSize={handleChangeSidebarSize}
                />

                <main className={isSidebarMini ? "max_size" : null} >
                    <Header
                        isSidebarMini={isSidebarMini}
                        onSidebarToggle={openSidebar}
                    />
                    <Router isSidebarMini={isSidebarMini}/> 
                </main>
            </BrowserRouter>
        </div>
    )
}

export default memo(Main)