import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoCalendarNumber } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { https } from '../../services/https';
import { BackButton } from '../../components/buttons/BackButton';
import { dateConvert } from '../../utils/functions/date';


function CompetitionSingle() {
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

  return (
    <div className="container mt-4">
      <BackButton path={'/competitions'} />
      <h2 className='text-center'>{competition?.name}</h2>
      <table className="table-auto border border-collapse w-full mt-6">
        <tbody>
          <tr className="border">
            <td className="px-4 py-2 flex items-center">
              <IoCalendarNumber className="mr-2" /> Start Date
            </td>
            <td className="border px-4 py-2">{dateConvert(competition?.start_date)}</td>
          </tr>
          <tr className="border">
            <td className="px-4 py-2  flex items-center">
              <FaLocationDot className="mr-2" /> Location
            </td>
            <td className="border px-4 py-2">{competition?.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompetitionSingle;
