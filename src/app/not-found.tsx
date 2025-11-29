'use client';

import { Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404 – Page Not Found</h1>
      <Button variant="contained" component={Link} href="/">
        Go Home
      </Button>
    </>
  );
}
