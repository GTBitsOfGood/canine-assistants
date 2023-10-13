import EditForm from "@/components/Forms/EditForm";
import { MONTHLY_PLACED_FORM, MONTHLY_UNPLACED_FORM, VOLUNTEER_FORM } from "@/utils/formUtils";
import Form from "../../../../../../server/db/models/Form";
import dbConnect from "../../../../../../server/db/dbConnect";

// recieves template from params
export default function EditFormPage({success, message, data}) {
    if (!success) return <p>{message}</p>
    data = JSON.parse(data);

    const { type, responses, user, dog } = data;

    let formTemplate;
    if (type === "MonthlyUnplaced") {
        formTemplate = MONTHLY_UNPLACED_FORM
    } else if (type === "MonthlyPlaced") {
        formTemplate = MONTHLY_PLACED_FORM
    } else if (type === "VolunteerInteraction") {
        formTemplate = VOLUNTEER_FORM
    }
    return (
        <EditForm template={formTemplate} responses={ responses } />
    )
}

export async function getServerSideProps({ params }) {
    // get the form by id
    try {
        await dbConnect();
        const formResponse = await Form.findById(params.formId);
        
        return {
            props: {
                success: true,
                message: "Successfully retrieved form",
                data: JSON.stringify(formResponse)
            }
        }

    } catch (e) {
        return {
            props: {
                success: false,
                message: "Cannot retrieve forms"
            }
        }
    }

}