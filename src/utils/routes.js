import Home from "../pages/home"

import CompetitionRouting from '../pages/competitions/routing'
import FinalRouting from '../pages/finals/routing'
import PairRouting from "../pages/pairs/routing"
import ParticipantRouting from "../pages/participants/routing"
import TournamentRouting from '../pages/tournaments/routing'


export const routes = [
    {
        path: "/",
        children: [
            {
                path: "/",
                element: Home,
            }
        ]
    },
    {
        path: "/competition",
        children: [
            {
                path: "*",
                element: CompetitionRouting,
            },
        ]
    },
    {
        path: "/final",
        children: [
            {
                path: "*",
                element: FinalRouting
            },
        ]
    },
    {
        path: "/pair",
        children: [
            {
                path: "*",
                element: PairRouting
            }
        ]
    },
    {
        path: "/participant",
        children: [
            {
                path: "*",
                element: ParticipantRouting
            }
        ]
    },
    {
        path: "/tournaments",
        children: [
            {
                path: "*",
                element: TournamentRouting
            }
        ]
    },
]


{/* <Route path="/generate-participants" element={<GenerateParticipants />} />
<Route path="/filter-participants" element={<FilterParticipants />} />
<Route path="/pair-participants" element={<PairParticipants />} />
<Route path="/pairs-by-level" element={<PairsByLevel />} />
<Route path="/update-winner" element={<UpdateWinner />} />
<Route path="/finals-participants" element={<FinalsParticipantsList />} />
<Route path="/finals-participants/create" element={<FinalsParticipantForm />} />
<Route path="/finals-participants/:id" element={<FinalsParticipantDetail />} />
<Route path="/finals-participants/:id/edit" element={<FinalsParticipantForm />} />
<Route path="/finals-pairs" element={<FinalsPairsList />} />
<Route path="/finals-pairs/create" element={<FinalsPairForm />} />
<Route path="/finals-pairs/:id" element={<FinalsPairDetail />} />
<Route path="/finals-pairs/:id/edit" element={<FinalsPairForm />} /> */}