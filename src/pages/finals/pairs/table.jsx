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
  Chip,
  Pagination,
} from "@nextui-org/react";
import { deleteWarning } from '../../../components/alert/alert';
import { paginationCount } from '../../../utils/constants';

const statusColorMap = {
    0: "danger",
    1: "primary",
};

const columns = [
    {name: "ID", uid: "id"},
    {name: "COMPETITION", uid: "competition"},
    {name: "GENDER", uid: "tournament"},
    {name: "PARTICIPANT-1", uid: "participant1"},
    {name: "PARTICIPANT-1", uid: "participant2"},
    {name: "ACTIONS", uid: "actions"},
];

export function ListTable({ pairs, page, setPage, pairs_all, onDelete }) {
    console.log(pairs);
    const navigate = useNavigate()
    const headerColumns = columns;

    const pages = Math.ceil(pairs_all.length / paginationCount);

    const items = useMemo(() => {
        const start = (page - 1) * paginationCount;
        const end = start + paginationCount;

        return pairs.slice(start, end);
    }, [page, pairs, paginationCount]);


    const renderCell = useCallback((pair, columnKey) => {
        const cellValue = pair[columnKey];
        switch (columnKey) {
            case "competition":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue?.name}</p>
                    </div>
                );
            case "tournament":
                return (
                    <Chip className="capitalize" color={statusColorMap[pair?.tournament?.gender]} size="md" variant="flat">
                        {cellValue === 1 ? 'Boy' : 'Girl'}
                    </Chip>
                );
            case "participant1":
                return (
                    <div className="flex flex-col relative">
                        <span className={`absolute w-2 h-2 top-0 left-0 rounded ${pair?.winner ? pair?.winner === pair?.participant1?.id ? 'bg-green-500' : 'bg-red-500' : 'bg-yellow-400'}`}></span>
                        <p className="ml-4 text-bold text-small capitalize">{pair?.participant1?.participant?.name}</p>
                    </div>
                );
            case "participant2":
                return (
                    <div className="flex flex-col relative">
                        <span className={`absolute w-2 h-2 top-0 left-0 rounded ${pair?.winner ? pair?.winner === pair?.participant2?.id ? 'bg-green-500' : 'bg-red-500' : 'bg-yellow-400'}`}></span>
                        <p className="ml-4 text-bold text-small capitalize">{pair?.participant2?.participant?.name}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-1">
                        <button 
                            onClick={() =>{navigate(`/finals/pairs/${pair?.id}`)}}
                            className='p-2 border rounded-md border-blue-500 text-blue-500'
                        ><FaUser /></button>
                        <button 
                            onClick={() =>{navigate(`/finals/pairs/edit/${pair?.id}`)}}
                            className='p-2 border rounded-md border-blue-500 text-green-500'
                        ><FaRegEdit /></button>
                        <button 
                            onClick={() => {deleteWarning(onDelete, pair?.id)}}
                            className='p-2 border rounded-md border-blue-500 text-red-500'
                        ><FaRegTrashAlt /></button>
                    </div>
                );
            default:
                return cellValue;
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
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{ wrapper: "max-h-[500px]",}}
            topContentPlacement="outside"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    allowsSorting={column.sortable}
                >
                    {column.name}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No pairs found"} items={pairs}>
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
