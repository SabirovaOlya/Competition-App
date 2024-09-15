import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CompetitionForm from './form'
import CompetitionList from './list'
import CompetitionSingle from './single'
import CompetitionEdit from './edit'

function CompetitionRouting() {
    return (
        <Routes>
            <Route path="/" element={<CompetitionList />} /> 
            <Route path="/form" element={<CompetitionForm />} />
            <Route path="/edit/:id" element={<CompetitionEdit />} />
            <Route path=":id" element={<CompetitionSingle />} />
        </Routes>
    )
}

export default CompetitionRouting
