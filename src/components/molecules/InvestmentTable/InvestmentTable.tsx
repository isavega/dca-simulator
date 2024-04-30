import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { formatNumberToCLP } from '../../../utils/index.tsx';

type TableRowData = {
  item: number;
  datesArray: string[];
  pricesArray: string[];
  investmentArray: string[];
  portfolioValueArray: string[];
  amountChangeArray: string[];
  percentageChangeArray: string[];
};

const InvestmentTable = () => {
  const investmentTableData = useSelector(
    (state) => state.trade.investmentTableData,
  );

  const {
    datesArray,
    pricesArray,
    investmentArray,
    portfolioValueArray,
    amountChangeArray,
    percentageChangeArray,
  } = investmentTableData;

  const buildRows = () => {
    const rows = [];
    for (let i = 0; i < datesArray.length; i++) {
      rows.push({
        item: i + 1,
        datesArray: datesArray[i],
        pricesArray: formatNumberToCLP(pricesArray[i]),
        investmentArray: formatNumberToCLP(
          Number(investmentArray[i]).toFixed(2),
        ),
        portfolioValueArray: formatNumberToCLP(
          Number(portfolioValueArray[i]).toFixed(2),
        ),
        amountChangeArray: formatNumberToCLP(
          Number(amountChangeArray[i]).toFixed(2),
        ),
        percentageChangeArray: `${percentageChangeArray[i].toFixed(2)}%`,
      });
    }
    return rows;
  };

  const rows: TableRowData[] = buildRows();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Precio crypto</TableCell>
            <TableCell align="right">Monto invertido</TableCell>
            <TableCell align="right">Valor del portafolio</TableCell>
            <TableCell align="right">Variación $</TableCell>
            <TableCell align="right">Variación %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.datesArray}</TableCell>
              <TableCell align="right">{row.pricesArray}</TableCell>
              <TableCell align="right">{row.investmentArray}</TableCell>
              <TableCell align="right">{row.portfolioValueArray}</TableCell>
              <TableCell align="right">{row.amountChangeArray}</TableCell>
              <TableCell align="right">{row.percentageChangeArray}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvestmentTable;
