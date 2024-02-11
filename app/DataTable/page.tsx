import axios from "axios";
import { Result, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Result[]> {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/results`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error
      console.error("Axios error:", error.message);
      console.error("Error details:", error.response?.data || error.request);
    } else {
      // Non-Axios error
      console.error("Non-Axios error:", "Error");
    }
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
