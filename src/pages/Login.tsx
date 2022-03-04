import {
  Stack,
  Card,
  TextField,
  Button,
  CardContent,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/authSchema";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../AppContext";
//const auth = getAuth();

const Login = () => {
  const { auth } = useContext(AppContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: any) => {
    if (!auth) {
      return;
    }
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log(user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };
  return (
    <Stack height="90vh" justifyContent="center" alignItems="center">
      <Card elevation={5} sx={{ width: "50%", borderRadius: "1rem" }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h3">Welcome!</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  placeholder="Enter Email"
                  {...register("email")}
                  error={Boolean(errors?.email)}
                  helperText={errors?.email?.message}
                />
                <TextField
                  variant="outlined"
                  placeholder="Enter Password"
                  {...register("password")}
                  error={Boolean(errors?.password)}
                  type="password"
                  helperText={errors?.password?.message}
                />
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Stack>{" "}
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
export default Login;
