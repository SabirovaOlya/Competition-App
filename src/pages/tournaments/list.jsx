import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { https } from '../../services/https';
import { ListTable } from './table';
import { paginationCount } from '../../utils/constants';
import { PageTitle } from '../../components/content-header/PageTitle';
import { alert } from '../../components/alert/alert';


function CompetitionList() {
  const navigate = useNavigate()
  const [tournaments, setTournaments] = useState([]);
  const [tournamentsAll, setTournamentsAll] = useState([]);
  const [page, setPage] = useState(1);


  const getData = async () => {
    try {
      const res = await https.get('/tournaments');
      const { data } = res;
      setTournamentsAll(data)
      setTournaments(data.slice(0, paginationCount));
    } catch (err) {
      console.error(err);
    }
  };

  const paginateData = (count) => {
    const list = tournamentsAll.slice((count - 1)*paginationCount, count*paginationCount)
    setTournaments(list)
  }

  const onNavigate = () =>{
    navigate('/tournaments/form', { replace: true })
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    paginateData(page)
  }, [page])

  const onDelete = async(id) => {
    try {
      const res = await https.delete(`/tournaments/${id}`)
      const { data } = res;

      getData()
    }
    catch(err) {
      alert('Error', 'error')
    }
  }

  return (
    <div>
      <PageTitle title={'Tournaments'} onNavigate={onNavigate}/>
      <ListTable 
        tournaments={tournaments} 
        setCompetitions={setTournaments}
        tournaments_all={tournamentsAll}
        page={page}
        setPage={setPage}
        onDelete={onDelete}
      />
    </div>
  );
}

export default CompetitionList;
