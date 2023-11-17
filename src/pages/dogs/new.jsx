import DogEditingLayout from "@/components/DogEditingLayout";
import IndividualDogPage from "./[id]";
import Layout from "@/components/Layout";

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
