import React from 'react'

function Navbar() {
  return (
    <nav className="navbar">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">MatchFight</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
  )
}

export default Navbar