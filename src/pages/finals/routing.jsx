import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FinalList from './list'
import FinalPairForm from './pairs/form'
import FinalParticipantForm from './participants/form'

function FinalRouting() {
    return (
        <Routes>
            <Route path="/" element={<FinalList />} />
            <Route path="/pairs/form" element={<FinalPairForm />} />
            <Route path="/participants/form" element={<FinalParticipantForm />} />
        </Routes>
    )
}

export default FinalRouting