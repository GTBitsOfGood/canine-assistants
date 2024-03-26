import Form from "@/components/Form/Form";
import { formActions } from "@/utils/formUtils";
import { useSessionManager } from "@/utils/SessionManager";

function FormPage() {
  return (
    <div className="mx-32">
      <Form mode={formActions.VIEW} />
    </div>
  )
}
export default () => useSessionManager(FormPage);
