import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import { alert } from '../../components/alert/alert'


function CompetitionEdit() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();

  const { id } = useParams();
  const [competition, setCompetition] = useState(null);

  const getData = async() =>{
    try{
      const res = await https.get(`/competitions/${id}`)
      const { data } = res;
      setCompetition(data)
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
  }, [id]);



  const onSubmit = async(data) =>{
    const info = {
        name: competition?.name,
        start_date: competition?.start_date,
        location: competition?.location
    }

    try{
      const res = await https.put(`/competitions/${id}`, info)
      const res_data = res?.data;
      alert("Successfully edited", 'success');
      navigate(`/competitions`, { replace: true });
    }
    catch(err){
      alert(err?.response?.data?.message, 'error');
      console.log(err);
    }
  }

  return (
    <div className="mt-4">
      <BackButton path={'/competitions'}/>
      <h3 className='text-center'>Competition Edit Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
        <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            type="text" 
            variant={'bordered'} 
            label="Name" 
            value={competition?.name}
            onChange={(e) => {
              let newData = {...competition}
              newData.name = e.target.value
              setCompetition(newData)
            }}
          />
          <Input 
            type="date" 
            variant={'bordered'} 
            label="Start Date" 
            value={competition?.start_date}
            onChange={(e) => {
              let newData = {...competition}
              newData.start_date = e.target.value
              setCompetition(newData)
            }}
          />
          <Input 
            type="text" 
            variant={'bordered'} 
            label="Location" 
            value={competition?.location}
            onChange={(e) => {
              let newData = {...competition}
              newData.location = e.target.value
              setCompetition(newData)
            }}
          />
        </div>
        <div className='flex justify-end'>
          <button type="submit" 
            className="btn btn-primary mt-8 py-2 px-4"
          >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CompetitionEdit;
