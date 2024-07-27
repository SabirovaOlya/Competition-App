import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ParticipantList from './list'
import ParticipantForm from './form'
import ParticipantSingle from './single'

function ParticipantRouting() {
    return (
        <Routes>
            <Route path="/" element={<ParticipantList />} />
            <Route path="form" element={<ParticipantForm />} />
            <Route path="single/:id" element={<ParticipantSingle />} />
        </Routes>
    )
}

export default ParticipantRouting