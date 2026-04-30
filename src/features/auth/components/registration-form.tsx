import { Stack, TextField, Button, Typography } from "@mui/material";
import NextLink from "next/link";
function RegistrationForm() {
  return (
    <Stack spacing={2} component="form" noValidate>
      <Typography variant="h2" component="h1">
        Sign up
      </Typography>
      <NextLink href="/login">Sign in</NextLink>
      <TextField
        label="First Name"
        type="text"
        placeholder="First Name"
        fullWidth
      />
      <TextField
        label="Last Name"
        type="text"
        placeholder="Last Name"
        fullWidth
      />
      <TextField label="Email" type="email" placeholder="Email" fullWidth />
      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Sign up
      </Button>
    </Stack>
  );
}

export default RegistrationForm;
