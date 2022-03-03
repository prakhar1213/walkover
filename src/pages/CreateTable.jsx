import { Add } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
  Grid,
  Chip,
  FormHelperText,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import useCreateTable from "../apis/useCreateTable";

const CreateTable = (props) => {
  const [col, setCol] = useState(0);
  const [at, setAtt] = useState([]);
  const [value, setValue] = useState("0");
  const [cname, setCname] = useState("");
  const [tableName, setTableName] = useState("");
  const [helperText, setHelperText] = useState(false);
  const [columns, setColumns] = useState([]);
  const { mutateAsync, isLoading } = useCreateTable();
  const onSubmit = () => {
    if (columns.length != 0) {
      mutateAsync({ tableName: tableName, columns, userId: 1 });
    }
    setAtt([]);
    setCname("");
    setTableName("");
    setColumns([]);
    props.close();
  };
  return (
    <Dialog open={props.open} onClose={props.close} scroll="body" fullWidth>
      <DialogContent>
        <Stack spacing={2}>
          <h2>Create Table</h2>
          <Stack>
            <TextField
              fullWidth
              placeholder="Table Name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
            {tableName?.length === 0 && (
              <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </Stack>
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1.5}>
              <Stack width="100%">
                <TextField
                  fullWidth
                  placeholder="Column Name"
                  value={cname}
                  onChange={(e) => setCname(e.target.value)}
                />
                {at?.length === 0 && (
                  <FormHelperText sx={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
                {helperText && (
                  <FormHelperText sx={{ color: "red" }}>
                    Cannot add empty value
                  </FormHelperText>
                )}
              </Stack>
              <Stack width="100%">
                <FormControl fullWidth>
                  <Select
                    defaultValue="0"
                    onChange={(e) => setValue(e.target.value)}
                  >
                    <MenuItem value="0" disabled>
                      Choose
                    </MenuItem>
                    {attributes.map((at) => (
                      <MenuItem value={at.value}>{at.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {value === "0" && (
                  <FormHelperText sx={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Stack>
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (cname != "" && value != "0") {
                  setHelperText(false);
                  setAtt([...at, cname]);

                  setColumns((prevValues) => [
                    ...prevValues,
                    {
                      cname: cname,
                      type: value.substr(0, value.length - 1),
                    },
                  ]);
                  setCname("");
                } else {
                  setHelperText(true);
                }
              }}
            >
              ADD
            </Button>
          </Stack>

          <Stack>
            <Stack direction="row" spacing={1}>
              {at.map((item) => (
                <div style={{ position: "relative" }}>
                  <Chip
                    color="info"
                    label={item}
                    sx={{
                      color: "black",
                      backgroundColor: "gray",
                      borderRadius: 5,
                    }}
                  />
                </div>
              ))}
            </Stack>
          </Stack>
          <Button variant="contained" onClick={() => onSubmit()}>
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
function range(start, end) {
  return (
    Array(end - start + 1)
      //@ts-ignore
      .fill()
      .map((_, idx) => start + idx)
  );
}

const attributes = [
  {
    title: "String",
    value: "VARCHAR(255)0",
  },
  {
    title: "Number",
    value: "INTEGER0",
  },
  {
    title: "Boolean",
    value: "INTEGER1",
  },
  {
    title: "Email",
    value: "VARCHAR(255)1",
  },
  {
    title: "Datetime",
    value: "DATETIME0",
  },
];
export default CreateTable;
