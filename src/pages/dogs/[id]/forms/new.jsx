import Form from "@/components/Form/Form";
import { formActions } from "@/utils/formUtils";
import { useSessionManager } from "@/utils/SessionManager";

function NewForm() {
  return (
    <div className="mx-32">
      <Form mode={formActions.NEW} />
    </div>
  )
}

export default () => useSessionManager(NewForm);

