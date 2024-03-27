import DogEditingLayout from "@/layouts/DogEditingLayout";
import IndividualDogPage from "./[id]";
import Layout from "@/layouts/Layout";
import { useSessionManager } from "@/utils/SessionManager";

function NewDogPage({ session }) {
  return <IndividualDogPage session={session} />;
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
