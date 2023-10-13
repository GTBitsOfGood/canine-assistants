import NewForm from "@/components/Forms/NewForm";
import { MONTHLY_PLACED_FORM, MONTHLY_UNPLACED_FORM } from "@/utils/formUtils";

// recieves template from params
export default function NewFormPage() {
    const template = MONTHLY_UNPLACED_FORM
    return (
        <NewForm template={template} />
    )
}