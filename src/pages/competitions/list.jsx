import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { https } from '../../services/https';
import { ListTable } from './table';
import { paginationCount } from '../../utils/constants';
import { PageTitle } from '../../components/content-header/PageTitle';
import { alert } from '../../components/alert/alert';


function CompetitionList() {
  const navigate = useNavigate()
  const [competitions, setCompetitions] = useState([]);
  const [competitionsAll, setCompetitionsAll] = useState([]);
  const [page, setPage] = useState(1);


  const getData = async () => {
    try {
      const res = await https.get('/competitions');
      const { data } = res;
      setCompetitionsAll(data)
      setCompetitions(data.slice(0, paginationCount));
    } catch (err) {
      console.error(err);
    }
  };

  const paginateData = (count) => {
    const list = competitionsAll.slice((count - 1)*paginationCount, count*paginationCount)
    setCompetitions(list)
  }

  const onNavigate = () =>{
    navigate('/competitions/form', { replace: true })
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    paginateData(page)
  }, [page])

  const onDelete = async(id) => {
    try {
      const res = await https.delete(`/competitions/${id}`)
      const { data } = res;

      getData()
    }
    catch(err) {
      alert('Error', 'error')
    }
  }

  return (
    <div>
      <PageTitle title={'Competitions'} onNavigate={onNavigate}/>
      <ListTable 
        competitions={competitions} 
        setCompetitions={setCompetitions}
        competitions_all={competitionsAll}
        page={page}
        setPage={setPage}
        onDelete={onDelete}
      />
    </div>
  );
}

export default CompetitionList;
