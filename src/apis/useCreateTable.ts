import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../constant";
import { useContext } from "react";

const setData = async (data: any, authorization?: string) => {
  const raw = await fetch(`${baseUrl}/tables`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await raw.json();
  alert(res.hasError ? res.errors : "Table Created Successfully");
  return res;
};

const useCreateTable = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => setData(data), {
    onSuccess: ({ value }) => {
      queryClient.invalidateQueries(["tables"]);
    },
  });
};

export default useCreateTable;
