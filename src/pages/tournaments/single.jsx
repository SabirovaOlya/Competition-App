import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';


function TournamentSingle() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  const getData = async() =>{
    try{
      const res = await https.get(`/tournaments/${id}`)
      const { data } = res;
      setTournament(data)
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
      <BackButton path={'/tournaments'} />
      <h3 className='text-center'>Tournament Info</h3>
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <p className='font-bold mb-1'>Gender</p>
          <p className='border p-2 rounded border-blue-500'>{tournament?.gender === 1 ? 'Boy' : 'Girl'}</p>
        </div>
        <div>
          <p className='font-bold mb-1'>Min Age</p>
          <p className='border p-2 rounded border-blue-500'>{tournament?.min_age}</p>
        </div>
        <div>
          <p className='font-bold mb-1'>Max Age</p>
          <p className='border p-2 rounded border-blue-500'>{tournament?.max_age}</p>
        </div>
        <div>
          <p className='font-bold mb-1'>Min Weight</p>
          <p className='border p-2 rounded border-blue-500'>{tournament?.min_weight}</p>
        </div>
        <div>
          <p className='font-bold mb-1'>Max Weight</p>
          <p className='border p-2 rounded border-blue-500'>{tournament?.max_weight}</p>
        </div>
      </div>
    </div>
  );
}

export default TournamentSingle;
