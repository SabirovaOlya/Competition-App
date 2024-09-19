import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PairList from './list'
import PairForm from './form'
import PairSingle from './single'

function PairRouting() {
    return (
        <Routes>
            <Route path="/" element={<PairList />} />
            <Route path="/form" element={<PairForm />} />
            <Route path="/:id" element={<PairSingle />} />
        </Routes>
    )
}

export default PairRouting