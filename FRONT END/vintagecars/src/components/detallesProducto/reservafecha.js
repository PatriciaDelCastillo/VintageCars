import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemProductDetail from "./ItemProductDetail";
import Spinner from "react-bootstrap/Spinner";


const ReservaFechas = ({producto}) => {
  const { id } = useParams();
  const [itemFecha, setItemFecha] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFecha = async () => {
      const baseUrl = `http://3.14.134.132:8080/vintage/reserva/producto_id/${id}`;
    
      try {
        const respuesta = await axios.get(baseUrl);
        console.log(respuesta);
        setItemFecha(respuesta.data);
      } catch (error) {
        setError(error.message);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } finally {
        setLoading(false);
      }
    };
    getFecha();
  }, [id]);
  return (
    <>
    {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
      <ItemProductDetail producto={producto} fecha={itemFecha} />
      )}
      </>
  );
};

export default ReservaFechas;