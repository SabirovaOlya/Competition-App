import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PairList from './list'

function PairRouting() {
    return (
        <Routes>
            <Route path="/" element={<PairList />} />
            {/* <Route path="form" element={<CompetitionForm />} />
            <Route path="single/:id" element={<CompetitionSingle />} /> */}
        </Routes>
    )
}

export default PairRouting