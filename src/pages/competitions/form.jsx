import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import { alert } from '../../components/alert/alert'


function CompetitionForm() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();


  const onSubmit = async(data) =>{
    try{
      const res = await https.post('/competitions/', data)
      const res_data = res?.data;
      alert("Successfully created", 'success');
      navigate(`/competitions`, { replace: true });
      // navigate(`/competitions/single/${res_data.id}`, { replace: true });
    }
    catch(err){
      alert(err?.response?.data?.message, 'error');
      console.log(err);
    }
  }

  return (
    <div className="mt-4">
      <BackButton path={'/competitions'}/>
      <h3 className='text-center'>Competition Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
        <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            type="text" 
            variant={'bordered'} 
            label="Name" 
            {...register("name", { required: true })}
          />
          <Input 
            type="date" 
            variant={'bordered'} 
            label="Start Date" 
            {...register("start_date", { required: true })}
          />
          <Input 
            type="text" 
            variant={'bordered'} 
            label="Location" 
            {...register("location", { required: true })}
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

export default CompetitionForm;
