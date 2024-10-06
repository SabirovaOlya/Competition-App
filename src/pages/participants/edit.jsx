import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { https } from '../../services/https';
import { genders } from '../../utils/constants';
import { BackButton } from '../../components/buttons/BackButton';
import ImageContainer from '../../components/image-container/Container'
import { alert } from '../../components/alert/alert'


function ParticipantEditForm() {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null)
    const { handleSubmit } = useForm()
    const [selectedGender, setSelectedGender] = useState(null)
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [sourceImages, setSourceImages] = useState('')
    const [pathImage, setPathImage] = useState(null)
    const [competitions, setCompetitions] = useState([]);
    const navigate = useNavigate();

    const getCompetitions = async() =>{
        try{
            const res = await https.get('/competitions/')
            const { data } = res;
            const comps = data?.map(item => ({ value: item?.id, label: item?.name}))
            return comps
        }
            catch(err){
            return []
        }
    }
    const getData = async() =>{
        try{
            const res = await https.get(`/participants/${id}/`)
            const { data } = res;
            const gender = data?.gender === 1 ? 'male' : 'female'
            const gender_option = genders?.find(x => x?.value === gender)
            setSelectedGender(gender_option)   
                     
            const all_competitons = await getCompetitions()
            const comp_option = all_competitons?.find(x => x?.value === data?.competition_details?.id)
            setCompetitions(all_competitons)
            setSelectedCompetition(comp_option)

            setParticipant(data)
            setPathImage(data?.image)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [id]);

    const onSubmit = async(data) =>{
        const formData = new FormData();

        formData.append('name', participant?.name);
        formData.append('unique_id', participant?.unique_id);
        formData.append('age', Number(participant?.age));
        formData.append('weight', participant?.weight ? Number(participant?.weight) : '');
        formData.append('competition', selectedCompetition?.value);
        formData.append('gender', selectedGender?.value === 'male' ? 1 : 0);
        formData.append('image', pathImage ? pathImage : (sourceImages[0] ? sourceImages[0] : null));

        try {
            const res = await https.put(`/participants/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { data } = res;
            alert('Successfully edited', 'success');
            navigate('/participants', { replace: true });
        } catch (err) {
            alert(err?.response?.data?.message, 'error');
            console.log(err);
        }
    }

    return (
        <div className="mt-4">
            <BackButton path={'/participants'}/>
            <h3 className='text-center'>Participant Edit Form</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
                <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input 
                        type="text" 
                        variant={'bordered'} 
                        label="Name:" 
                        value={participant?.name}
                        onChange={(e) => {
                            let newInfo = {...participant}
                            newInfo.name = e.target.value
                            setParticipant(newInfo)
                        }}
                    />
                    <Input 
                        type="string" 
                        variant={'bordered'} 
                        label="Unique ID:" 
                        value={participant?.unique_id}
                        onChange={(e) => {
                            let newInfo = {...participant}
                            newInfo.unique_id = e.target.value
                            setParticipant(newInfo)
                        }}
                    />
                    <Input 
                        type="number"
                        onWheel={(e) => e.target.blur()} 
                        variant={'bordered'} 
                        label="Age" 
                        value={participant?.age}
                        onChange={(e) => {
                            let newInfo = {...participant}
                            newInfo.age = e.target.value
                            setParticipant(newInfo)
                        }}
                    />
                    <Input 
                        type="number"
                        onWheel={(e) => e.target.blur()} 
                        variant={'bordered'} 
                        label="Weight" 
                        value={participant?.weight}
                        onChange={(e) => {
                            let newInfo = {...participant}
                            newInfo.weight = e.target.value
                            setParticipant(newInfo)
                        }}
                    />
                    {participant && (<Select 
                        label="Gender" 
                        className="bg-white w-full select_input" 
                        defaultSelectedKeys={[selectedGender?.value]}
                        value={[selectedGender?.value]}
                        onChange={(e) => {
                            setSelectedGender(genders?.find(x => x?.value === e.target.value));
                        }}
                    >
                        {genders?.map((gender) => (
                        <SelectItem key={gender?.value} className='bg-white select_input'>
                            {gender?.label}
                        </SelectItem>
                        ))}
                    </Select>)}
                    {selectedCompetition && (
                        <Select
                            label="Competition"
                            color='white'
                            className="bg-white w-full"
                            defaultSelectedKeys={[selectedCompetition?.value?.toString()]}
                            value={[selectedCompetition?.value?.toString()]}
                            onChange={(e) => {
                                const selectedComp = competitions.find(x => x.value === Number(e.target.value));
                                setSelectedCompetition(selectedComp);
                            }}
                        >
                            {competitions?.map((comp) => (
                                <SelectItem key={comp?.value?.toString()} className='bg-white'>
                                    {comp?.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                </div>
                <ImageContainer 
                    sourceImages={sourceImages}
                    setSourceImages={setSourceImages}
                    path={pathImage}
                    setPath={setPathImage}
                    limit={true}
                />
                <div className='flex justify-end'>
                    <button type="submit" 
                        className="btn btn-primary mt-8 py-2 px-4"
                    >Edit</button>
                </div>
            </form>
        </div>
    );
}

export default ParticipantEditForm;
