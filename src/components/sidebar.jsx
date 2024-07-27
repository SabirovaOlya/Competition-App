import React from 'react'

function Sidebar() {
  return (
    <div className='sidebar'>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/competitions">Competitions</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/tournaments">Tournaments</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/participants">Participants</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/pairs">Pairs</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/generate-participants">Generate Participants</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/filter-participants">Filter Participants</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/pair-participants">Pair Participants</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/pairs-by-level">Pairs by Level</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/update-winner">Update Winner</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/finals-participants">Finals Participants</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/finals-pairs">Finals Pairs</Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar