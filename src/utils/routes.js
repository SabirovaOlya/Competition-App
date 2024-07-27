import { lazy } from "react"
import Home from "../pages/home"

const CompetitionRouting = lazy(()=> import('../pages/competitions/routing'))
const FinalRouting = lazy(()=> import('../pages/finals/routing'))
const PairRouting = lazy(()=> import('../pages/pairs/routing'))
const ParticipantRouting = lazy(()=> import('../pages/participants/routing'))
const TournamentRouting = lazy(()=> import('../pages/tournaments/routing'))



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