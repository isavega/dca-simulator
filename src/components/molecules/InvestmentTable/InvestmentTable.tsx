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
  date: string;
  price: string;
  investment: string;
  portfolioValue: string;
  amountChange: string;
  percentageChange: string;
};

const InvestmentTable = () => {
  const marketId = useSelector((state) => state.trade.simulatorData.marketId);
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
    const rows: TableRowData[] = [];
    for (let i = 0; i < datesArray.length; i++) {
      rows.push({
        item: i + 1,
        date: datesArray[i],
        price: formatNumberToCLP(pricesArray[i]),
        investment: formatNumberToCLP(investmentArray[i].toFixed(2)),
        portfolioValue: formatNumberToCLP(portfolioValueArray[i].toFixed(2)),
        amountChange: formatNumberToCLP(amountChangeArray[i].toFixed(2)),
        percentageChange: `${percentageChangeArray[i].toFixed(2)}%`,
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
            <TableCell align="right">Precio {marketId}</TableCell>
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
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.investment}</TableCell>
              <TableCell align="right">{row.portfolioValue}</TableCell>
              <TableCell align="right">{row.amountChange}</TableCell>
              <TableCell align="right">{row.percentageChange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvestmentTable;
