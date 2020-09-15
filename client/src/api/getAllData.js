import { useState, useEffect } from "react";
import axios from "axios";

export const GetTableData = (tablename, params) => {
  const token = localStorage.getItem("userToken");

  return axios
    .get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/get/${tablename}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: params
      }
    )
    .then(response => response.data);
};
export const useDataFetcher = (tablename, params) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/get/${tablename}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: params
        }
      )
      .then(response => {
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      })

      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};
// verify the user token details
export const verifyUserToken = () => {
  const token = localStorage.getItem("userToken");
  return axios
    .get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/verifyUserToken`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(response => response.data);
};
