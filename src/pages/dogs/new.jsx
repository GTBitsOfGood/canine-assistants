import DogEditingLayout from "@/layouts/DogEditingLayout";
import IndividualDogPage from "./[id]";
import Layout from "@/layouts/Layout";
import { useSessionManager } from "@/utils/SessionManager";

function NewDogPage({}) {
  return <IndividualDogPage />;
}

export default () => useSessionManager(NewDogPage);


NewDogPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DogEditingLayout>
        {page}
      </DogEditingLayout>
    </Layout>
  );
};
