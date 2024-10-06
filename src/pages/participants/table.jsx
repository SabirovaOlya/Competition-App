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
import { deleteWarning } from '../../components/alert/alert';

const statusColorMap = {
    0: "danger",
    1: "primary",
};

const columns = [
  {name: "ID", uid: "id"},
  {name: "NAME", uid: "name"},
  {name: "AGE", uid: "age"},
  {name: "WEIGHT", uid: "weight"},
  {name: "GENDER", uid: "gender"},
  {name: "ACTIONS", uid: "actions"},
];

export function ListTable({ users, page, setPage, users_all, onDelete }) {
    const navigate = useNavigate()
    const rowsPerPage = 10
    const headerColumns = columns;

    const pages = Math.ceil(users_all.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users, rowsPerPage]);


    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "age":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "weight":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "gender":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.gender]} size="md" variant="flat">
                        {cellValue === 1 ? 'Boy' : 'Girl'}
                    </Chip>
                );
            case "actions":
                return (
                <div className="relative flex justify-center items-center gap-1">
                    <button 
                        onClick={() =>{navigate(`/participants/${user?.id}`)}}
                        className='p-2 border rounded-md border-blue-500 text-blue-500'
                    ><FaUser /></button>
                    <button 
                        onClick={() =>{navigate(`/participants/edit/${user?.id}`)}}
                        className='p-2 border rounded-md border-blue-500 text-green-500'
                    ><FaRegEdit /></button>
                    <button 
                        onClick={() => {deleteWarning(onDelete, user?.id)}}
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
            aria-label='participants'
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
                    align={column.uid === "actions" ? "center" : "start"}
                    allowsSorting={column.sortable}
                >
                    {column.name}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={users}>
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
