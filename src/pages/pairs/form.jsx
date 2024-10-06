import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import { alert } from '../../components/alert/alert'


function PairForm() {
    const { register, handleSubmit } = useForm()
    const [participant1, setParticipant1] = useState(null)
    const [participant2, setParticipant2] = useState(null)
    const [participants, setParticipants] = useState([])
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [competitions, setCompetitions] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [tournaments, setTournaments] = useState([]);
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
            const tours = data?.map(item => ({ value: item?.id, label: `${item?.gender ? 'Boy' : 'Girl'}: ${item?.min_age}-${item?.min_age}years, ${item?.min_weight}-${item?.max_weight}kg`}))
            setTournaments(tours)
            setSelectedTournament(tours[0] || null)
        }
        catch(err){
            console.log(err);
        }
    }

    const getParticipants = async() =>{
        try{
            const res = await https.get('/participants/')
            const { data } = res;
            const items = data?.map(item => ({ value: item?.id, label: item?.name}))
            setParticipants(items)
            setParticipant1(items[0] || null)
            setParticipant2(items[1] || null)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getCompetitions()
        getTournaments()
        getParticipants()
    }, []);


    // useEffect(() => {
    //     if(selectedCompetition && selectedTournament){
    //         getParticipants()
    //     }
    // }, [selectedCompetition, selectedTournament]);

    const onSubmit = async(data) =>{
        const info = {
            level: Number(data?.level),
            competition: selectedCompetition?.value,
            tournament: selectedTournament?.value,
            participant1: participant1?.value,
            participant2: participant2?.value,
            winner: null
        };

        try{
            const res = await https.post('/pairs/', info)
            const { data } = res;
            alert("Successfully created", 'success');
            navigate(`/pairs`, { replace: true });
        }
        catch(err){
            alert(err?.response?.data?.message, 'error');
            console.log(err);
        }
    }


    return (
        <div className="mt-4">
            <BackButton path={'/participants'}/>
            <h3 className='text-center'>Participant Form</h3>
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
                        label="Participant-1" 
                        color='white'
                        className="bg-white w-full" 
                        defaultSelectedKeys={[participant1?.value]}
                        value={[participant1?.value]}
                        onChange={(e) => {
                            setParticipant1(participants?.find(x => x?.value === Number(e.target.value)));
                        }}
                    >
                        {participants?.map((participant) => (
                        <SelectItem key={participant?.value} className='bg-white'>
                            {participant?.label}
                        </SelectItem>
                        ))}
                    </Select>
                    <Select 
                        label="Participant-2" 
                        color='white'
                        className="bg-white w-full" 
                        defaultSelectedKeys={[participant2?.value]}
                        value={[participant2?.value]}
                        onChange={(e) => {
                            setParticipant2(participants?.find(x => x?.value === Number(e.target.value)));
                        }}
                    >
                        {participants?.map((participant) => (
                        <SelectItem key={participant?.value} className='bg-white'>
                            {participant?.label}
                        </SelectItem>
                        ))}
                    </Select>
                    <Input 
                        type="number" 
                        variant={'bordered'} 
                        label="Level:" 
                        {...register("level", { required: true })}
                    />
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

export default PairForm;
