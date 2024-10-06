import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { https } from '../../../services/https';
import { BackButton } from '../../../components/buttons/BackButton';
import user_default from '../..//../assets/images/user.png'
import '../../participants/style.scss'


function FinalParticipantSingle() {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null);

    const getData = async() =>{
        try{
            const res = await https.get(`/finals-participants/${id}`)
            const { data } = res;
            setParticipant(data)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [id]);

    return (
        <div className="container mt-4">
            <BackButton path={'/finals'} />
            <h1 className='text-center'>{participant?.participant?.name}</h1>
            <div className='card_container'>
                <div className='image_wrapper'>
                    <img src={participant?.participant?.image ? participant?.participant?.image : user_default} alt='participant image' />
                </div>
                <div className='text_details'>
                    <p className='mt-3'><strong>Age:</strong> {participant?.participant?.age} years</p>
                    <p className='mt-3'><strong>Gender:</strong> {participant?.participant?.gender === 1 ? 'Male' : 'Female'}</p>
                    <p className='mt-3'><strong>Weight:</strong> {participant?.participant?.weight} kg</p>
                    <p className='mt-3'><strong>Competition:</strong> {participant?.competition?.name}</p>
                    <p className='mt-3'><strong>Tournament:</strong> {participant?.tournament?.min_age}-{participant?.tournament?.max_age}years | {participant?.tournament?.min_weight}-{participant?.tournament?.max_weight}kg</p>
                    <p className='mt-3'><strong>Place:</strong> {participant?.place ? participant?.place : 'unknown'}</p>
                </div>
            </div>
        </div>
    );
}

export default FinalParticipantSingle;
