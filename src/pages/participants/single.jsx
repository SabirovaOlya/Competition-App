import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import user_default from '../../assets/images/user.png'
import './style.scss'


function ParticipantSingle() {
  const { id } = useParams();
  const [participant, setParticipant] = useState(null);

  const getData = async() =>{
    try{
      const res = await https.get(`/participants/${id}`)
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
      <BackButton path={'/participants'} />
      <h1 className='text-center'>{participant?.name}</h1>
      <div className='card_container'>
        <div className='image_wrapper'>
          <img src={user_default} alt='participant image' />
        </div>
        <div className='text_details'>
          <p className='mt-3'><strong>Age:</strong> {participant?.age} years</p>
          <p className='mt-3'><strong>Gender:</strong> {participant?.gender === 1 ? 'Male' : 'Female'}</p>
          <p className='mt-3'><strong>Weight:</strong> {participant?.weight} kg</p>
          <p className='mt-3'><strong>Competition:</strong> {participant?.competition_details?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ParticipantSingle;
