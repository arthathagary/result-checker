import { Result, columns } from "@/app/DataTable/columns";
import { DataTable } from "@/app/DataTable/data-table";
import axios from "axios";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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

async function DataTablePage() {
  const data: any = await getData();
  const fetchData: Result[] = data.results;

  return (
    <div className="md:container mx-auto">
      <h1 className=" text-center font-bold text-xl md:pt-32 mt-6 md:mt-0 mb-4 md:mb-0">
        All Records
      </h1>
      {fetchData && fetchData.length > 0 ? (
        <DataTable columns={columns} data={fetchData} />
      ) : (
        <p className="text-center">No records found</p>
      )}
    </div>
  );
}

export default DataTablePage;
