import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useNavigate } from "react-router-dom";

export default function CardTransactionAdmin() {
  let navigate = useNavigate();
  function toTransaction(){
    navigate("/admin/transaction");
}
  return (
    <>
      <Card sx={{ maxWidth: 345 }} style={{background:"yellow" ,color:"black"}}> 
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              <LocalAtmIcon fontSize="large"/>
              <h3 onClick={toTransaction} style={{cursor:"pointer"}}>Transaction</h3>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}