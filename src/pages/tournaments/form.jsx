import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import { alert } from '../../components/alert/alert'
import { genders } from '../../utils/constants';


function TournamentForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const [selectedGender, setSelectedGender] = useState(genders[0])


  const onSubmit = async(data) =>{
    const info = {
      ...data,
      gender: selectedGender?.value === 'male' ? 1 : 0
    }
    
    try{
      const res = await https.post('/tournaments/', info)
      const res_data = res?.data;
      alert("Successfully created", 'success');
      navigate(`/tournaments`, { replace: true });
    }
    catch(err){
      alert(err?.response?.data?.message, 'error');
      console.log(err);
    }
  }

  return (
    <div className="mt-4">
      <BackButton path={'/tournaments'}/>
      <h3 className='text-center'>Tournament Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
        <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Select 
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
          </Select>
          <Input 
            type="number"
            onWheel={(e) => e.target.blur()} 
            variant={'bordered'} 
            label="Min Age" 
            {...register("min_age", { required: false })}
          />
          <Input 
            type="number"
            onWheel={(e) => e.target.blur()} 
            variant={'bordered'} 
            label="Max Age" 
            {...register("max_age", { required: false })}
          />
          <Input 
            type="number"
            onWheel={(e) => e.target.blur()} 
            variant={'bordered'} 
            label="Min Weight" 
            {...register("min_weight", { required: false })}
          />
          <Input 
            type="number"
            onWheel={(e) => e.target.blur()} 
            variant={'bordered'} 
            label="Max Weight" 
            {...register("max_weight", { required: false })}
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

export default TournamentForm;
