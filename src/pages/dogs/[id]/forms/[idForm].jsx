import Form from "@/components/Form";
import { formActions } from "@/utils/formUtils";

export default function FormPage() {
  return (
    <div className="mx-32">
      <Form mode={formActions.VIEW} />
    </div>
  )
}