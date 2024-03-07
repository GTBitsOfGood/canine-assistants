import DogEditingLayout from "@/layouts/DogEditingLayout";
import IndividualDogPage from "./[id]";
import Layout from "@/layouts/Layout";

export default function NewDogPage({}) {
  return <IndividualDogPage />;
}

NewDogPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DogEditingLayout>
        {page}
      </DogEditingLayout>
    </Layout>
  );
};
