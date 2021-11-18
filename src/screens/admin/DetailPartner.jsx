import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Merek",
    selector: row => row.merk,
    sortable: true,
  },
  {
    name: "Stnk Number",
    selector: row => row.stnk_number,
    sortable: true,
  },
  {
    name: "Car Image",
    selector: row => {
      return <img alt="blom ada" src={row.image} width="100" height="100"></img>
    },
    sortable: true,
  },
  {
    name: "Deskripsi",
    selector: row => row.description,
    sortable: true,
  },  
  {
    name: "Status Acc",
    selector: row => {
      let data = row.status_acc ? 
      <span style={{cursor:"auto" , color:"green"}}>Accepted</span>
      : 
      <span style={{cursor:"auto",color:"red"}}>Not Acc</span>
      return data;
    },
    sortable: true,
  },
  {
    name: "Action",
    selector: row => {
     return <button className="btn btn-primary btn-md">Acc Car</button>
    },
    sortable: true,
  },
];

const DetailPartner = () => {
  let param = useParams();
  const [car, setCar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get(`/api/car/` + param.partnerId).then((res) => {
      setCar(res.data.data);
      setIsLoading(false)
    });
  }, []);

  return (
    <DataTable
      title="Partner Cars"
      columns={columns}
      data={car}
      progressPending={isLoading}
      pagination
    />
  );
};

export default DetailPartner;
