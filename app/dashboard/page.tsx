import Container from "@/components/Container";
import DataTablePage from "@/app/DataTable/page";
import AddResult from "@/app/dashboard/AddResult";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Dashboard = () => {
  // const { data: session } = useSession();
  // if (!session) {
  //   return <div>loading...</div>;
  // }
  return (
    <Container>
      <div className="md:grid md:grid-cols-4">
        <div className="md:col-span-1">
          <AddResult />
        </div>
        <div className="md:col-span-3">
          <DataTablePage />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
