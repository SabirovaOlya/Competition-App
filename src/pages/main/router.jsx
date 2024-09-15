import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../utils/routes'
import { FallBackCompo } from '../../components/loader/FallBackCompo.jsx'

import './style.scss'

function Router({ isSidebarMini }) {
    return (
        <div className={isSidebarMini ? 'mini_content' : 'content'}>
            <Suspense fallback={<FallBackCompo />}>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}>
                            {route.children?.map((childRoute, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={childRoute.path}
                                    element={childRoute.element}
                                />
                            ))}
                        </Route>
                    ))}
                </Routes>
            </Suspense>
        </div>
    )
}

export default Router
