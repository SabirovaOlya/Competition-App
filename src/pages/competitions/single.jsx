import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import { https } from '../../services/https';

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

    axios.get(`${config.apiUrl}/api/competitions/${id}/`)
      .then(response => {
        setCompetition(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the competition!', error);
      });
  }, [id]);

  if (!competition) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>{competition.name}</h1>
      <p><strong>Start Date:</strong> {competition.start_date}</p>
      <p><strong>Location:</strong> {competition.location}</p>
    </div>
  );
}

export default CompetitionSingle;
