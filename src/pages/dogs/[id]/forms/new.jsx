import Form from "@/components/Form";
import { formActions } from "@/utils/formUtils";

export default function NewForm() {
  return Form(formActions.NEW);
}
