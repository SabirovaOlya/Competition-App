import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Select, SelectItem } from '@nextui-org/react';
import { https } from '../../../services/https';
import { BackButton } from '../../../components/buttons/BackButton';
import { alert } from '../../../components/alert/alert'


function FinalParticipantForm() {
    const { handleSubmit } = useForm()
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const navigate = useNavigate();

    const getCompetitions = async() =>{
        try{
            const res = await https.get('/competitions/')
            const { data } = res;
            const comps = data?.map(item => ({ value: item?.id, label: item?.name}))
            setCompetitions(comps)
            setSelectedCompetition(comps[0] || null)
        }
        catch(err){
            console.log(err);
        }
    }

    const getTournaments = async() =>{
        try{
            const res = await https.get('/tournaments/')
            const { data } = res;
            const tours = data?.map(item => ({ value: item?.id, label: `${item?.gender ? 'Male' : 'Female'} ${item?.min_age}-${item?.max_age}years  ${item?.min_weight}-${item?.max_weight}kg`}))
            setTournaments(tours)
            setSelectedTournament(tours[0] || null)
        }
        catch(err){
            console.log(err);
        }
    }

    const getParticipnats = async() =>{
        try{
            const res = await https.get('/participants/')
            const { data } = res;
            const partics = data?.map(item => ({ value: item?.id, label: item?.name}))
            setParticipants(partics)
            setSelectedParticipant(partics[0] || null)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getCompetitions()
        getTournaments()
        getParticipnats()
    }, []);

    const onSubmit = async(data) =>{
        const info = {
            competition: selectedCompetition?.value,
            tournament: selectedTournament?.value,
            participant: selectedParticipant?.value
        };

        try{
            const res = await https.post('/finals-participants/', info)
            alert("Successfully created", 'success');
            navigate(`/finals`, { replace: true });
        }
        catch(err){
            alert(err?.response?.data?.message, 'error');
            console.log(err);
        }
    }

    return (
    <div className="mt-4">
        <BackButton path={'/finals'}/>
        <h3 className='text-center'>Final Participant Form</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
            <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Select 
                    label="Competition" 
                    color='white'
                    className="bg-white w-full" 
                    defaultSelectedKeys={[selectedCompetition?.value]}
                    value={[selectedCompetition?.value]}
                    onChange={(e) => {
                        setSelectedCompetition(competitions?.find(x => x?.value === Number(e.target.value)));
                    }}
                >
                {competitions?.map((comp) => (
                    <SelectItem key={comp?.value} className='bg-white'>
                    {comp?.label}
                    </SelectItem>
                ))}
                </Select>
                <Select 
                    label="Tournament" 
                    color='white'
                    className="bg-white w-full" 
                    defaultSelectedKeys={[selectedTournament?.value]}
                    value={[selectedTournament?.value]}
                    onChange={(e) => {
                        setSelectedTournament(tournaments?.find(x => x?.value === Number(e.target.value)));
                    }}
                >
                {tournaments?.map((tour) => (
                    <SelectItem key={tour?.value} className='bg-white'>
                    {tour?.label}
                    </SelectItem>
                ))}
                </Select>
                <Select 
                    label="Participant" 
                    color='white'
                    className="bg-white w-full" 
                    defaultSelectedKeys={[selectedParticipant?.value]}
                    value={[selectedParticipant?.value]}
                    onChange={(e) => {
                        setSelectedParticipant(participants?.find(x => x?.value === Number(e.target.value)));
                    }}
                >
                {participants?.map((partic) => (
                    <SelectItem key={partic?.value} className='bg-white'>
                    {partic?.label}
                    </SelectItem>
                ))}
                </Select>
            </div>
            <div className='flex justify-end'>
                <button type="submit" 
                className="btn btn-primary mt-8 py-2 px-4"
                >Create</button>
            </div>
        </form>
    </div>
    );
}

export default FinalParticipantForm;