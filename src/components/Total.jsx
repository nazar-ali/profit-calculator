import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const Total = ({ totalCost, totalIncome, total }) => {
  return (
    <Box
      component="Total"
      style={{
        backgroundColor: '#f1f1f1',
        padding: '10px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Project Totals
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">Total Cost:</TableCell>
              <TableCell align="right">${totalCost.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Total Income:</TableCell>
              <TableCell align="right">${totalIncome.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Total Profit:</TableCell>
              <TableCell align="right">${total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Total;
