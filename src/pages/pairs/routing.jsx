import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PairList from './list'

function PairRouting() {
    return (
        <Routes>
            <Route path="/" element={<PairList />} />
        </Routes>
    )
}

export default PairRouting