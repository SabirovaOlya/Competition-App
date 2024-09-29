import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Button } from "@nextui-org/react"; 
import { ListTable as ParticipantTable } from '../participants/table';
import { ListTable as PairTable } from '../pairs/table';
import { https } from '../../services/https';
import { paginationCount } from '../../utils/constants';
import { PageTitle } from '../../components/content-header/PageTitle';
import { alert } from '../../components/alert/alert';

function FinalList() {
    const navigate = useNavigate()
    const [ activeTab, setActiveTab ] = useState('participants')
    const [participantsAll, setParticipantsAll] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [pairsAll, setPairsAll] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [page, setPage] = useState(1);

    const getDataParticipant = async () => {
        try {
            const res = await https.get('/finals-participants/');
            const { data } = res;
            setParticipantsAll(data)
            setParticipants(data.slice(0, paginationCount));
        } catch (err) {
            console.error(err);
        }
    };


    const getDataPair = async () => {
        try {
            const res = await https.get('/finals-pairs/');
            const { data } = res;
            setParticipantsAll(data)
            setParticipants(data.slice(0, paginationCount));
        } catch (err) {
            console.error(err);
        }
    };

    const paginateData = (count) => {
        if(activeTab === 'participants'){
            const list = participantsAll.slice((count - 1)*paginationCount, count*paginationCount)
            setParticipants(list)
        }else {
            const list = pairsAll.slice((count - 1)*paginationCount, count*paginationCount)
            setPairs(list)
        }
    }

    const onNavigate = () =>{
        const url = activeTab === 'pairs' ? 'finals-pairs' : 'finals-participants'
        navigate(`/${activeTab}/form`, { replace: true })
    }

    useEffect(() => {
        if(activeTab === 'participants'){
            getDataParticipant();
        }else {
            getDataPair();
        }
    }, [activeTab]);

    useEffect(() => {
        paginateData(page)
    }, [page])


    const onDelete = async(id) => {
        try {
            const url = activeTab === 'pairs' ? 'finals-pairs' : 'finals-participants'
            const res = await https.delete(`/${url}/${id}`)
            const { data } = res;


            if(activeTab === 'participants'){
                getDataParticipant();
            }else {
                getDataPair();
            }
        }
        catch(err) {
            alert('Error', 'error')
        }
    }

    return (
        <div>
            <PageTitle title={'Final'} onNavigate={onNavigate}/>
            <div className='px-2 flex flex-row justify-between'>
                <Tabs variant="bordered" color="primary" radius='md' size='lg' aria-label="Tabs radius" 
                    selectedKey={activeTab}
                    onSelectionChange={setActiveTab}
                >
                    <Tab key="participants" title="Participants"/>
                    <Tab key="pair" title="Pairs"/>
                </Tabs>
            </div>
            <div className='mt-3'>
                {
                    activeTab === 'participants' ?
                    <ParticipantTable 
                        users={participants} 
                        setUsers={setParticipants}
                        users_all={participantsAll}
                        page={page}
                        setPage={setPage}
                        onDelete={onDelete}
                    /> : 
                    <PairTable 
                        pairs={pairs} 
                        setPairs={setPairs}
                        pairs_all={pairsAll}
                        page={page}
                        setPage={setPage}
                        onDelete={onDelete}
                    />
                }
            </div>
        </div>
    );
}

export default FinalList;
