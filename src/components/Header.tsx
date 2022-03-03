import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Tooltip,
  Stack,
} from "@mui/material/";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import CreateTable from "../pages/CreateTable";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = ({ ...props }) => {
  const { token, auth } = useContext(AppContext);
  const [dialog, setDialog] = useState(false);
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            flex="1"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Dynamic Tables
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={() => setDialog(true)}
              >
                Create Table
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={() => {
                  auth?.signOut();
                }}
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
      <CreateTable open={dialog} close={() => setDialog(false)} />
    </AppBar>
  );
};
export default Header;
