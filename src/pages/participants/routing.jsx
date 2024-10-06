import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ParticipantList from './list'
import ParticipantForm from './form'
import ParticipantSingle from './single'
import ParticipantEditForm from './edit'

function ParticipantRouting() {
    return (
        <Routes>
            <Route path="" element={<ParticipantList />} />
            <Route path="form" element={<ParticipantForm />} />
            <Route path=":id" element={<ParticipantSingle />} />
            <Route path="edit/:id" element={<ParticipantEditForm />} />
        </Routes>
    )
}

export default ParticipantRouting