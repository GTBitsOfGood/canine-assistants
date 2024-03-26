import Form from "@/components/Form/Form";
import { formActions } from "@/utils/formUtils";

export default function NewForm() {
  return (
    <div className="px-4 lg:px-12 w-screen sm:w-full">
      <Form mode={formActions.NEW} />
    </div>
  )
}
