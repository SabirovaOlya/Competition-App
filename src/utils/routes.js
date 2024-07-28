import Home from "../pages/home"
import CompetitionRouting from '../pages/competitions/routing'
import FinalRouting from '../pages/finals/routing'
import PairRouting from "../pages/pairs/routing"
import ParticipantRouting from "../pages/participants/routing"
import TournamentRouting from '../pages/tournaments/routing'
import CompetitionList from "../pages/competitions/list"
import CompetitionForm from "../pages/competitions/form"
import CompetitionSingle from "../pages/competitions/single"


export const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/competition/*",
        element: <CompetitionRouting />,

    },
    {
        path: "/final*",
        element: <FinalRouting />
    },
    {
        path: "/pair/*",
        element: <PairRouting />
    },
    {
        path: "/participant/*",
        element: <ParticipantRouting />
    },
    {
        path: "/tournament/*",
        element: <TournamentRouting />
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