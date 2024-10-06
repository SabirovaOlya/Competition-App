import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { https } from '../../../services/https';
import { BackButton } from '../../../components/buttons/BackButton';
import { alert } from '../../../components/alert/alert';
import { capitalize } from '../../../utils/functions/text';
import user_image from '../../../assets/images/user.png'


function FinalPairSingle() {
  const { id } = useParams();
  const [pair, setPair] = useState(null);

    const getData = async() => {
        try {
            const res = await https.get(`/finals-pairs/${id}`)
            const { data } = res;
            setPair(data)
        }
        catch(err){
            console.log(err);
        }
    }

    const changeWinner = async(winner_id) => {
        try {
            const res = await https.post('/update-winner/', {
                pair_id: id,
                winner_id
            })
            alert('Winner updated', 'success')
        }
            catch(err){
            console.log(err);
        }
    }

    const getBorderColor = (participantId) => {
        if (!pair?.winner) {
            return 'border-yellow-500';
        }
        return pair?.winner === participantId ? 'border-green-500' : 'border-red-500';
    };
    
    const getBackColor = (participantId) => {
        if (!pair?.winner) {
            return 'bg-yellow-100';
        }
        return pair?.winner === participantId ? 'bg-green-100' : 'bg-red-100';
    };

    useEffect(() => {
        getData()
    }, [id]);

    return (
        <div className="container mt-4">
            <BackButton path={'/finals'} />
            <h4 className='text-center'>{pair?.competition?.name}</h4>
            <h5 className='text-center'>{capitalize(pair?.stage)} - Stage</h5>
            <h6 className='text-center'>{pair?.tournament?.min_age}-{pair?.tournament?.max_age}years | {pair?.tournament?.min_weight}-{pair?.tournament?.max_weight}kg</h6>
            <div className='mt-8 flex flex-col md:flex-row justify-around'>
            {
                [pair?.participant1, pair?.participant2]?.map(participant =>(
                    <div className={`border-3 ${getBorderColor(participant?.id)} ${getBackColor(participant?.id)} flex md:flex-col rounded overflow-hidden mt-4 md:mt-0`}>
                    <img 
                        className='w-50 md:min-w-80'
                        src={participant?.participant?.image ? participant?.participant?.image : user_image} 
                    />
                    <div className='flex flex-col ml-2 md:ml-0'>
                        <div className='p-2 text-sm'>
                            <p className='m-0 mt-2'><span className='font-bold'>Name: </span>{participant?.participant?.name}</p>
                            <p className='m-0 mt-2'><span className='font-bold'>ID: </span>{participant?.participant?.unique_id}</p>
                            <p className='m-0 mt-2'><span className='font-bold'>Age: </span>{participant?.participant?.age} years</p>
                            <p className='m-0 mt-2'><span className='font-bold'>Weight: </span>{participant?.participant?.weight} kg</p>
                            <p className='m-0 mt-2'><span className='font-bold'>Gender: </span>{participant?.participant?.gender === 1 ? 'Boy' : 'Girl'}</p>
                            </div>
                            {
                                pair?.winner ? <></> : 
                                <div className='flex md:justify-center'>
                                    <button 
                                        onClick={() => {changeWinner(participant?.participant?.id)}}
                                        className='mb-2 border-1 border-green-500 bg-green-100 p-2 rounded text-sm font-bold duration-200 hover:bg-green-400'
                                    >
                                        Make winner
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default FinalPairSingle;
