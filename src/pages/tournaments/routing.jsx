import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TournamentList from './list'
import TournamentForm from './form'
import TournamentSingle from './single'

function TournamentRouting() {
    return (
        <Routes>
            <Route path="/" element={<TournamentList />} />
            <Route path="form" element={<TournamentForm />} />
            <Route path=":id" element={<TournamentSingle />} />
        </Routes>
    )
}

export default TournamentRouting