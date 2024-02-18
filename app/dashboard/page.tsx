import Container from "@/components/Container";
import TablePage from "../DataTable/page";
import AddResult from "./AddResult";

const DashboardPage = () => {
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
          <TablePage />
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;
