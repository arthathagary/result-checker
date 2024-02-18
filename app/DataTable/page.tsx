import axios from "axios";
import { Result, columns } from "@/app/DataTable/columns";
import { DataTable } from "@/app/DataTable/data-table";

async function getData(): Promise<Result[]> {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/results`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      console.error("Error details:", error.response?.data || error.request);
    } else {
      console.error("Non-Axios error:", "Error");
    }
    return [];
  }
}

export default async function TablePage() {
  const data: any = await getData();
  console.log(data);

  return (
    <div className="md:container mx-auto">
      <h1 className=" text-center font-bold text-xl md:pt-32 mt-6 md:mt-0 mb-4 md:mb-0">
        All Records
      </h1>
      <DataTable columns={columns} data={data.results} />
    </div>
  );
}
