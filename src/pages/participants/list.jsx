import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTable } from './table';
import { https } from '../../services/https';
import { paginationCount } from '../../utils/constants';
import { PageTitle } from '../../components/content-header/PageTitle';
import { alert } from '../../components/alert/alert';

function ParticipantList() {
  const navigate = useNavigate()
  const [participantsAll, setParticipantsAll] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const res = await https.get('/participants');
      const { data } = res;
      setParticipantsAll(data)
      setParticipants(data.slice(0, paginationCount));
    } catch (err) {
      console.error(err);
    }
  };

  const paginateData = (count) => {
    const list = participantsAll.slice((count - 1)*paginationCount, count*paginationCount)
    setParticipants(list)
  }

  const onNavigate = () =>{
    navigate('/participants/form', { replace: true })
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    paginateData(page)
  }, [page])


  const onDelete = async(id) => {
    try {
      const res = await https.delete(`/participants/${id}`)
      const { data } = res;

      getData()

      // const filteredList = participantsAll?.filter(x => x?.id !== id)
      // setParticipantsAll(filteredList)
      
      // const totalPages = Math.ceil(filteredList.length / paginationCount);
      // if (page > totalPages) {
      //   setPage(totalPages);
      // } else {
      //   paginateData(page);
      // }
    }
    catch(err) {
      alert('Error', 'error')
    }
  }

  return (
    <div>
      {console.log(participants, participantsAll)}
      <PageTitle title={'Participants'} onNavigate={onNavigate}/>
      <ListTable 
        users={participants} 
        setUsers={setParticipants}
        users_all={participantsAll}
        page={page}
        setPage={setPage}
        onDelete={onDelete}
      />
    </div>
  );
}

export default ParticipantList;
