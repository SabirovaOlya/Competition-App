import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTable } from './table';
import { https } from '../../services/https';
import { paginationCount } from '../../utils/constants';
import { PageTitle } from '../../components/content-header/PageTitle';
import { alert } from '../../components/alert/alert';

function PairList() {
  const navigate = useNavigate()
  const [pairsAll, setPairsAll] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const res = await https.get('/pairs');
      const { data } = res;
      setPairsAll(data)
      setPairs(data.slice(0, paginationCount));
    } catch (err) {
      console.error(err);
    }
  };

  const paginateData = (count) => {
    const list = pairsAll.slice((count - 1)*paginationCount, count*paginationCount)
    setPairs(list)
  }

  const onNavigate = () =>{
    navigate('/pairs/form', { replace: true })
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    paginateData(page)
  }, [page])


  const onDelete = async(id) => {
    try {
      const res = await https.delete(`/pairs/${id}`)
      const { data } = res;

      getData()
    }
    catch(err) {
      alert('Error', 'error')
    }
  }

  return (
    <div>
      <PageTitle title={'Pairs'} onNavigate={onNavigate} is_exclude_form={true}/>
      <ListTable 
        pairs={pairs} 
        setPairs={setPairs}
        pairs_all={pairsAll}
        page={page}
        setPage={setPage}
        onDelete={onDelete}
      />
    </div>
  );
}

export default PairList;
