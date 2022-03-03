import { baseUrl } from "../constant";
import { useQuery } from "react-query";
import { useContext } from "react";

const useTables = (filters?: any) => {
  return useQuery(["tables", JSON.stringify(filters)], () => getData(filters));
};

const getData = async (filters = [{}]) => {
  const filterQuery = Object.keys(filters).map(
    (_filter: any) => "&" + _filter + "=" + filters[_filter]
  );
  console.log("here");
  const res = await fetch(`${baseUrl}/tables`);
  const data = await res.json();
  return data.data;
};

export default useTables;
