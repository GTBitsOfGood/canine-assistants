import Form from "@/components/Form/Form";
import { formActions } from "@/utils/formUtils";

export default function NewForm() {
  return (
    <div className="mx-12">
      <Form mode={formActions.NEW} />
    </div>
  )
}
