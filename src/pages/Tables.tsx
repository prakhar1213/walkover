import useTables from "../apis/useTables";
import TableCard from "../components/TableCard";
import { Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Tables = () => {
  const { data, isLoading } = useTables();
  return (
    <Stack spacing={3}>
      <Stack alignItems="center">
        <Typography variant="h3">Tables</Typography>
      </Stack>
      <Stack>
        <Grid container spacing={2}>
          {isLoading
            ? li.map(() => (
                <Grid item xs={3}>
                  <TableCard isLoading={true} />
                </Grid>
              ))
            : data?.map((item: any) => (
                <Grid item xs={3}>
                  <Link to={`/content/${item.id}`}>
                    <TableCard tableName={item.tableName} />
                  </Link>
                </Grid>
              ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

const li = [1, 2, 3, 4, 5, 6];
export default Tables;
