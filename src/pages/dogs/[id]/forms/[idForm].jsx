import Form from "@/components/Form/Form";
import { formActions } from "@/utils/formUtils";

export default function FormPage() {
  return (
    // TODO don't forget to update div styles when mobile
    <div className="mx-12">
      <Form mode={formActions.VIEW} />
    </div>
  )
}