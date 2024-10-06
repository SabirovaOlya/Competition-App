import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import { deleteWarning } from '../../components/alert/alert';
import { dateConvert } from '../../utils/functions/date';
import { paginationCount } from '../../utils/constants'; 


const columns = [
  {name: "ID", uid: "id"},
  {name: "NAME", uid: "name"},
  {name: "START-DATE", uid: "start_date"},
  {name: "LOCATION", uid: "location"},
  {name: "ACTIONS", uid: "actions"},
];

export function ListTable({ competitions, page, setPage, competitions_all, onDelete }) {
    const navigate = useNavigate()
    const headerColumns = columns;

    const pages = Math.ceil(competitions_all.length / paginationCount);

    const items = useMemo(() => {
        const start = (page - 1) * paginationCount;
        const end = start + paginationCount;

        return competitions_all.slice(start, end);
    }, [page, competitions, paginationCount, competitions_all]);


    const renderCell = useCallback((competition, columnKey) => {
        const cellValue = competition[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <div className='flex items-center justify-center h-full'>
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "start_date":
                return (
                    <div className='flex items-center justify-center h-full'>
                        <p className="text-bold text-small capitalize">{dateConvert(cellValue)  }</p>
                    </div>
                );
            case "location":
                return (
                    <div className='flex items-center justify-center h-full'>
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                <div className="relative flex justify-center items-center gap-1">
                    <button 
                        onClick={() =>{navigate(`/competitions/${competition?.id}`)}}
                        className='p-2 border rounded-md border-blue-500 text-blue-500'
                    ><FaUser /></button>
                    <button 
                        onClick={() =>{navigate(`/competitions/edit/${competition?.id}`)}}
                        className='p-2 border rounded-md border-blue-500 text-green-500'
                    ><FaRegEdit /></button>
                    <button 
                        onClick={() => {deleteWarning(onDelete, competition?.id)}}
                        className='p-2 border rounded-md border-blue-500 text-red-500'
                    ><FaRegTrashAlt /></button>
                </div>
                );
            default:
                return (
                    <div className='flex items-center justify-center'>
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
        }
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
        setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
        setPage(page - 1);
        }
    }, [page]);



    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    showShadow
                    color="success"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [items.length, page, pages]);

    return (
        <Table
            aria-label='competitions'
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[500px]",
            }}
            topContentPlacement="outside"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                <TableColumn
                    key={column.uid}
                    align={"center"}
                    allowsSorting={column.sortable}
                >
                    {column.name}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No competition found"} items={competitions}>
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
