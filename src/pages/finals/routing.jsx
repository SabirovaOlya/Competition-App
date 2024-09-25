import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FinalList from './list'

function FinalRouting() {
    return (
        <Routes>
            <Route path="/" element={<FinalList />} />
            {/* <Route path="form" element={<CompetitionForm />} />
            <Route path="single/:id" element={<CompetitionSingle />} /> */}
        </Routes>
    )
}

export default FinalRouting