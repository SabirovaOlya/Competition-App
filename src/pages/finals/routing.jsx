import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FinalList from './list'
import FinalPairForm from './pairs/form'
import FinalParticipantForm from './participants/form'
import FinalPairSingle from './pairs/single'
import FinalParticipantSingle from './participants/single'

function FinalRouting() {
    return (
        <Routes>
            <Route path="/" element={<FinalList />} />
            <Route path="/pairs/form" element={<FinalPairForm />} />
            <Route path="/participants/form" element={<FinalParticipantForm />} />
            <Route path="/pairs/:id" element={<FinalPairSingle />} />
            <Route path="/participants/:id" element={<FinalParticipantSingle />} />
        </Routes>
    )
}

export default FinalRouting