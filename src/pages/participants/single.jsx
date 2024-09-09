import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { https } from '../../services/https';

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

  if (!participant) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>{participant?.name}</h1>
      <p><strong>Gender:</strong> {participant?.gender === 1 ? 'Male' : 'Female'}</p>
      <p><strong>Age:</strong> {participant?.age}</p>
      <p><strong>Weight:</strong> {participant?.weight}</p>
      <p><strong>Competition:</strong> {participant?.competition?.name}</p>
    </div>
  );
}

export default ParticipantSingle;
