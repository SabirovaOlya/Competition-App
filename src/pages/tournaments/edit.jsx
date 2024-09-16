import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import { alert } from '../../components/alert/alert'
import { genders } from '../../utils/constants';


function TournamentEdit() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()

  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null)


  const getData = async() =>{
    try{
      const res = await https.get(`/tournaments/${id}`)
      const { data } = res;
      setTournament(data)

      const gender = data?.gender === 1 ? 'male' : 'female'
      const gender_option = genders?.find(x => x?.value === gender)
      setSelectedGender(gender_option)
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
        min_weight: tournament?.min_weight,
        max_weight: tournament?.max_weight,
        min_age: tournament?.min_age,
        max_age: tournament?.max_age,
        gender: selectedGender?.value === 'male' ? 1 : 0
    }
    
    try{
        const res = await https.put(`/tournaments/${id}`, info)
        const res_data = res?.data;
        alert("Successfully edited", 'success');
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
        <h3 className='text-center'>Tournament Edit-Form</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 px-4'>
            <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
                tournament ?
                <Select 
                    label="Gender" 
                    className="bg-white w-full select_input" 
                    defaultSelectedKeys={[selectedGender?.value || (tournament?.gender === 1 ? 'male' : tournament?.gender === 0 ? 'female' : '')]}
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
                : <></>
            }
            <Input 
                type="number"
                onWheel={(e) => e.target.blur()} 
                variant={'bordered'} 
                label="Min Age" 
                value={tournament?.min_age}
                onChange={(e) => {
                    let newData = {...tournament}
                    newData.min_age = e.target.value
                    setTournament(newData)
                }}
            />
            <Input 
                type="number"
                onWheel={(e) => e.target.blur()} 
                variant={'bordered'} 
                label="Max Age" 
                value={tournament?.max_age}
                onChange={(e) => {
                    let newData = {...tournament}
                    newData.max_age = e.target.value
                    setTournament(newData)
                }}
            />
            <Input 
                type="number"
                onWheel={(e) => e.target.blur()} 
                variant={'bordered'} 
                label="Min Weight" 
                value={tournament?.min_weight}
                onChange={(e) => {
                    let newData = {...tournament}
                    newData.min_weight = e.target.value
                    setTournament(newData)
                }}
            />
            <Input 
                type="number"
                onWheel={(e) => e.target.blur()} 
                variant={'bordered'} 
                label="Max Weight" 
                value={tournament?.max_weight}
                onChange={(e) => {
                    let newData = {...tournament}
                    newData.max_weight = e.target.value
                    setTournament(newData)
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

export default TournamentEdit;
