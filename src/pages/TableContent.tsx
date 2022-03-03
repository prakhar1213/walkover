import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import useTable from "../apis/useTable";
import { useParams } from "react-router-dom";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

const Tables = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useTable(id);
  console.log(data);
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        flex="1"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Typography variant="h4">Tables</Typography>
      </Stack>
      <Card elevation={10} sx={{ borderRadius: "1.5rem" }}>
        <CardContent>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} loading={isLoading} />
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Tables;
