import { memo, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaRegUser } from 'react-icons/fa';
import { TbTournament } from 'react-icons/tb';
import { GoGoal } from 'react-icons/go';
import { HiOutlineHome } from "react-icons/hi2";
import { HiUsers } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss'


function Sidebar({ currentPath, sidebarActive, isSidebarMini, setSidebarActive, closeSidebar, handleChangeSidebarSize }) {
    const sidebarLink = [
        { to: '/', icon: <HiOutlineHome />, title: 'Home', key: 1, visible: "visible" },
        { to: '/competitions', icon: <GoGoal />, title: 'Competitions', key: 4, visible: "visible" },
        { to: '/participants', icon: <FaRegUser />, title: 'Participants', key: 2, visible: "visible" },
        { to: '/tournaments', icon: <TbTournament />, title: 'Tournaments', key: 3, visible: "visible" },
        { to: '/pairs', icon: <HiUsers />, title: 'Pair', key: 5, visible: "visible" },
        { to: '/finals', icon: <GiTrophyCup />, title: 'Final', key: 6, visible: "visible" },
    ]
    const navigate = useNavigate()

    const keys = sidebarLink.filter(item => {
        let linkUrl = item.to.replace(/^\/|\/$/g, '').substring(0, 4);
        return currentPath.includes(linkUrl)
    })

    const key = keys.length > 1 ? keys[1].key.toString() : keys[0].key.toString()
    const [activeKey, setActiveKey] = useState(key);

    const handleTabClick = (key, url) => {
        navigate(url, { replace: true})
        setActiveKey(key);
        setSidebarActive(false)
    }

    return (
        <nav className={isSidebarMini && sidebarActive ? 'sidebar min_size active' : sidebarActive ? 'sidebar active' : isSidebarMini ? 'min_size sidebar' : 'sidebar'}>
            <div className="">
                <div className="sidebar_header">
                    <div className="sidebar_close">
                        <IoCloseCircleOutline onClick={closeSidebar} />
                    </div>
                </div>
                <button className="sidebar_resize" onClick={handleChangeSidebarSize}>
                    {!isSidebarMini ? <MdArrowBackIos /> : <MdArrowForwardIos />}
                </button>
                <ul className='nav-list mt-5'>
                    {
                        sidebarLink?.map(item => {
                            return (
                            <li className={`${activeKey === item?.key ? 'ant-tabs-tab-active' : 'tab'} nav-item ant-tabs-tab` }
                                onClick={()=>{
                                    handleTabClick(item?.key, item?.to)
                                }}
                            >
                                <span to={`${item?.to}`} className="link nav-item_icon">
                                    {item?.icon}
                                </span>
                                <span className="block link" to={`${item?.to}`}>{item?.title}</span>
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