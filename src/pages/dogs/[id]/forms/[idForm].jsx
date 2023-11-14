import Form from "@/components/Form";
import { formActions } from "@/utils/formUtils";

export default function FormPage() {
  return Form(formActions.VIEW);
}