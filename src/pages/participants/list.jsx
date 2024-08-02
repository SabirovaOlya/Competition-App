import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListTable } from './table';
import { https } from '../../services/https';

function ParticipantList() {
  const [participantsAll, setParticipantsAll] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const res = await https.get('/participants');
      const { data } = res;
      setParticipantsAll(data)
      setParticipants(data.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  const paginateData = (count) => {
    const list = participantsAll.slice((count - 1)*10, count*10)
    setParticipants(list)
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    paginateData(page)
  }, [page])

  return (
    <div>
      <ListTable 
        users={participants} 
        setUsers={setParticipants}
        users_all={participantsAll}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default ParticipantList;
