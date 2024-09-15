import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TournamentList from './list'
import TournamentForm from './form'
import TournamentSingle from './single'
import TournamentEdit from './edit'

function TournamentRouting() {
    return (
        <Routes>
            <Route path="/" element={<TournamentList />} />
            <Route path="/form" element={<TournamentForm />} />
            <Route path="/edit/:id" element={<TournamentEdit />} />
            <Route path=":id" element={<TournamentSingle />} />
        </Routes>
    )
}

export default TournamentRouting