import { baseUrl } from "../constant";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const useTable = (id?: string) => {
  const { token } = useContext(AppContext);
  return useQuery(["tables", id], () => getData(id, token));
};

const getData = async (id?: string, authorization?: string) => {
  if (!authorization) {
    return;
  }
  const res = await fetch(`${baseUrl}/tables/${id}`, {
    headers: { authorization },
  });
  const data = await res.json();
  return data.data;
};

export default useTable;
