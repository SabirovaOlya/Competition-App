import { memo, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos, MdOutlineSettingsSuggest } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from 'react-router-dom';


function Sidebar({ currentPath, sidebarActive, isSidebarMini, setSidebarActive, closeSidebar, handleChangeSidebarSize }) {
    const sidebarLink = [
        { to: '/', icon: <HiOutlineHome />, title: 'Home', key: 1, visible: "visible" },
        { to: '/participant', icon: <HiOutlineHome />, title: 'Participant', key: 2, visible: "visible" },
        { to: '/tournament', icon: <HiOutlineHome />, title: 'Tournament', key: 3, visible: "visible" },
        { to: '/competition', icon: <HiOutlineHome />, title: 'Competition', key: 4, visible: "visible" },
        { to: '/pair', icon: <HiOutlineHome />, title: 'Pair', key: 5, visible: "visible" },
        { to: '/final', icon: <HiOutlineHome />, title: 'Final', key: 6, visible: "visible" },
    ]

    const keys = sidebarLink.filter(item => {
        let linkUrl = item.to.replace(/^\/|\/$/g, '').substring(0, 4);
        return currentPath.includes(linkUrl)
    })

    const key = keys.length > 1 ? keys[1].key.toString() : keys[0].key.toString()
    const [activeKey, setActiveKey] = useState(key);

    const handleTabClick = (key) => {
        setActiveKey(key);
        setSidebarActive(false)
    }

    return (
        <nav className={isSidebarMini && sidebarActive ? 'sidebar min_size active' : sidebarActive ? 'sidebar active' : isSidebarMini ? 'min_size sidebar' : 'sidebar'}>
            <div className="nav_content">
                <div className="sidebar_header">
                    <Link to='/'>
                        {/* <Logo isSidebarMini={isSidebarMini} /> */}
                    </Link>
                    <div className="sidebar_close">
                        <IoCloseCircleOutline onClick={closeSidebar} />
                    </div>
                </div>
                <button className="sidebar_resize" onClick={handleChangeSidebarSize}>
                    {!isSidebarMini ? <MdArrowBackIos /> : <MdArrowForwardIos />}
                </button>
                <ul>
                    {
                        sidebarLink?.map(item => {
                            return (
                            <li className={`${activeKey === item?.key ? 'active_tab' : 'tab'}`}
                                onClick={()=>{
                                    handleTabClick(item?.key)
                                }}
                            >
                                <span className="mr-2">
                                    {item?.icon}
                                </span>
                                <Link className="block" to={`${item?.to}`}>{item?.title}</Link>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav >
    )
}

export default memo(Sidebar);