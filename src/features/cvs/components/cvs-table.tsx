import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Link from "next/link";
import type { CvsTableProps } from "../types/cv.types";

const shortenText = (value: string, maxLength = 120) => {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
};

function CvsTable({ cvs }: CvsTableProps) {
  return (
    <Table
      sx={{
        "& .MuiTableCell-root": {
          color: "var(--app-text)",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Education</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Employee</TableCell>
        </TableRow>
      </TableHead>

      <TableBody sx={{ color: "var(--app-text)" }}>
        {cvs.map((cv) => {
          const employee = cv.user?.email || "Unassigned";

          return (
            <TableRow key={cv.id} hover>
              <TableCell>
                <Link
                  href={`/cvs/${cv.id}/details`}
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  {cv.name}
                </Link>
              </TableCell>
              <TableCell>{cv.education ?? "-"}</TableCell>
              <TableCell>{shortenText(cv.description)}</TableCell>
              <TableCell>{employee}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default CvsTable;
