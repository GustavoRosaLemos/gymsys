'use client';

import { Table as MantineTable } from '@mantine/core';
import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface TableProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  cols: string[];
  rows: ReactNode[][];
}

function Table({ cols, rows, className }: TableProps) {
  return (
    <MantineTable highlightOnHover className={className}>
      <MantineTable.Thead>
        <MantineTable.Tr>
          {cols.map((col) => (
            <MantineTable.Th key={col}>{col}</MantineTable.Th>
          ))}
        </MantineTable.Tr>
      </MantineTable.Thead>
      <MantineTable.Tbody>
        {rows.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MantineTable.Tr key={row.toString() + index}>
            {row.map((data, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <MantineTable.Td key={data + i}>{data}</MantineTable.Td>
            ))}
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
    </MantineTable>
  );
}

export default styled(Table)`
  .mantine-Table-th {
    color: #bdbdbd;
  }
  .mantine-Table-td {
    color: #7a7a7a;
  }
  .mantine-Table-tr {
    cursor: pointer;
  }
`;
