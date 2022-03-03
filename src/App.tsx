import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tables from "./pages/Tables";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Stack } from "@mui/material";
import Header from "./components/Header";
import TableContent from "./pages/TableContent";
function App() {
  const { user, token } = useContext(AppContext);
  return (
    <>
      {!user || !token ? (
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path="/" />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Header />
          <Stack
            padding="2rem"
            sx={{ backgroundColor: "#C5C5C5", height: "100vh" }}
          >
            <Routes>
              <Route path="/" element={<Tables />} />
              <Route path="/content/:id" element={<TableContent />} />
            </Routes>
          </Stack>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
