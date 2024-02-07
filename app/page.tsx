"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Inputs = {
  search: string;
};

type ResulTableCellata = {
  courseDuration: number;
  courseName: string;
  district: string;
  dob: string;
  name: string;
  town: string;
  _id: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [resulTableCellata, setResulTableCellata] =
    useState<ResulTableCellata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/api/results/${data.search}`);
      setResulTableCellata(response.data);
    } catch (error) {
      setError("Error fetching data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Search</Label>
          <Input
            type="text"
            id="search"
            placeholder="Search"
            {...register("search")}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {resulTableCellata && Object.keys(resulTableCellata).length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Duration</TableHead>
              <TableCell>{resulTableCellata.courseDuration}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableCell>{resulTableCellata.courseName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>District</TableHead>
              <TableCell>{resulTableCellata.district}</TableCell>
            </TableRow>

            <TableRow>
              <TableHead>Date of Birth</TableHead>
              <TableCell>{resulTableCellata.dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableHead>Name</TableHead>
              <TableCell>{resulTableCellata.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Town</TableHead>
              <TableCell>{resulTableCellata.town}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableCell>{resulTableCellata._id}</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
      )}

      {!loading &&
        !error &&
        resulTableCellata &&
        Object.keys(resulTableCellata).length === 0 && <p>No details found.</p>}
    </div>
  );
}
