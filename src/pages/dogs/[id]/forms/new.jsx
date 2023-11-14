import Form from "@/components/Form";
import { formActions } from "@/utils/formUtils";

export default function NewForm() {
  return (
    <div className="mx-32">
      <Form mode={formActions.NEW} />
    </div>
  )
}
