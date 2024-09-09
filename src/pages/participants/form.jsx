import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { https } from '../../services/https';
import { genders } from '../../utils/constants';
import { BackButton } from '../../components/buttons/BackButton';
import { alert } from '../../components/alert/alert'


function ParticipantForm() {
  const { register, handleSubmit } = useForm()
  const [selectedGender, setSelectedGender] = useState(genders[0])
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [competitions, setCompetitions] = useState([]);
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

  useEffect(() => {
    getCompetitions()
  }, []);

  const handleSubmitt = (event) => {
    // event.preventDefault();
    // axios.post(`${config.apiUrl}/api/participants/`, { 
    //   name, 
    //   unique_id: uniqueId, // Include unique_id
    //   gender, 
    //   age, 
    //   weight, 
    //   competition: competitionId 
    // })
    //   .then(() => {
    //     navigate('/participants');
    //   })
    //   .catch(error => {
    //     console.error('There was an error creating the participant!', error.response ? error.response.data : error);
    //   });
  };

  const onSubmit = async(data) =>{
    const info = {
      ...data,
      unique_id: data.unique_id, 
      age: Number(data.age),
      weight: data.weight ? Number(data.weight) : null, 
      competition: selectedCompetition?.value,
      gender: selectedGender?.value === 'male' ? 1 : 0,
    };

    try{
      const res = await https.post('participants', info)
      const { data } = res;
      alert("Successfully created", 'success');
      navigate(`/participants`, { replace: true });
      // navigate(`/participants/single/${data.id}`, { replace: true });
    }
    catch(err){
      alert(err?.response?.data?.message, 'error');
      console.log(err);
    }
  }

  return (
    <div className="container mt-4">
      <BackButton path={'/participants'}/>
      <h3 className='text-center'>Participant Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
        <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            type="text" 
            variant={'bordered'} 
            label="Name:" 
            {...register("name", { required: true })}
          />
          <Input 
            type="string" 
            variant={'bordered'} 
            label="Unique ID:" 
            {...register("unique_id", { required: true })}
          />
          <Select 
            label="Gender" 
            className="bg-white w-full select_input" 
            defaultSelectedKeys={[selectedGender?.value]}
            value={[selectedGender?.value]}
          >
            {genders?.map((gender) => (
              <SelectItem key={gender?.value} className='bg-white select_input'>
                {gender?.label}
              </SelectItem>
            ))}
          </Select>
          <Input 
            type="number" 
            variant={'bordered'} 
            label="Age" 
            {...register("age", { required: true })}
          />
          <Input 
            type="number" 
            variant={'bordered'} 
            label="Weight" 
            {...register("weight", { required: false })}
          />
          <Select 
            label="Competition" 
            color='white'
            className="bg-white w-full" 
            defaultSelectedKeys={[selectedCompetition?.value]}
            value={[selectedCompetition?.value]}
          >
            {competitions?.map((comp) => (
              <SelectItem key={comp?.value} className='bg-white'>
                {comp?.label}
              </SelectItem>
            ))}
          </Select>
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

export default ParticipantForm;
