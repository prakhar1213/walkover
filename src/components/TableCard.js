import React from "react";
import { Card, CardContent, Typography, Stack, Skeleton } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
const TableCard = (props) => {
  return (
    <Card elevation={10} sx={{ borderRadius: "1.5rem", cursor: "pointer" }}>
      <CardContent>
        <Stack spacing={3}>
          {props.isLoading ? (
            <Skeleton width="100%" />
          ) : (
            <Stack alignItems="center" justifyContent={"center"}>
              <Typography variant="h4">{props.tableName}</Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TableCard;
