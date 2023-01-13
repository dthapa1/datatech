import React, { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, [ ]);

  const handleDelete = async (row) => {
    await AssessmentService.delete(row.original.id);
  };
  const columns = useMemo(() => [

    {
      Header: `S.No.`,
      accessor: `id`,
    },
    {
      Header: `Instrument Type`,
      accessor: `instrumentType`,
    },
    {
      Header: `Cat Name`,
      accessor: `catName`,
    },
    {
      Header: `Cat Score`,
      accessor: `score`,
    },
    {
      Header: `Risk Level`,
      accessor: `riskLevel`,
    },
    {
      Header: `Cat Date of Birth`,
      accessor: `catDateOfBirth`,
    },
    {
      Cell: ({ row }) =>
        <button onClick={() => handleDelete(row)}>Delete</button>,
      Header: `Delete`,
    },

  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useSortBy);

  return (
    <div>
      <table {...getTableProps()} style={{ border: `solid 1px blue` }}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    border: `solid 3px black`,
                    background: `aliceblue`,
                    color: `black`,
                    fontWeight: `bold`,
                  }}
                >
                  {column.render(`Header`)}
                  <span>
                    {column.isSorted ?
                      column.isSortedDesc ?
                        ` 🔽` :
                        ` 🔼` :
                      ``}
                  </span>
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: `10px`,
                      border: `solid 1px gray`,
                      background: `papayawhip`,
                    }}
                  >
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

};
