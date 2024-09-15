import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { https } from '../../services/https';
import { genders } from '../../utils/constants';
import { BackButton } from '../../components/buttons/BackButton';
import ImageContainer from '../../components/image-container/Container'
import { alert } from '../../components/alert/alert'


function ParticipantForm() {
  const { register, handleSubmit } = useForm()
  const [selectedGender, setSelectedGender] = useState(genders[0])
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [sourceImages, setSourceImages] = useState('')
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

  const onSubmit = async(data) =>{
    // const info = {
    //   ...data,
    //   unique_id: data.unique_id, 
    //   age: Number(data.age),
    //   weight: data.weight ? Number(data.weight) : null, 
    //   competition: selectedCompetition?.value,
    //   gender: selectedGender?.value === 'male' ? 1 : 0,
    //   image: sourceImages?.[0] ? sourceImages?.[0] : null
    // };

    // try{
    //   const res = await https.post('participants', info)
    //   const { data } = res;
    //   alert("Successfully created", 'success');
    //   navigate(`/participants`, { replace: true });
    //   // navigate(`/participants/single/${data.id}`, { replace: true });
    // }
    // catch(err){
    //   alert(err?.response?.data?.message, 'error');
    //   console.log(err);
    // }

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('unique_id', data.unique_id);
    formData.append('age', Number(data.age));
    formData.append('weight', data.weight ? Number(data.weight) : '');
    formData.append('competition', selectedCompetition?.value);
    formData.append('gender', selectedGender?.value === 'male' ? 1 : 0);
    formData.append('image', sourceImages[0] ? sourceImages[0] : null);

    try {
      const res = await https.post('/participants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data } = res;
      alert('Successfully created', 'success');
      navigate('/participants', { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message, 'error');
      console.log(err);
    }
  }

  return (
    <div className="mt-4">
      <BackButton path={'/participants'}/>
      <h3 className='text-center'>Participant Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
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
        <ImageContainer 
          sourceImages={sourceImages}
          setSourceImages={setSourceImages}
          limit={true}
        />
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
