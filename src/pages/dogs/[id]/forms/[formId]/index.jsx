import DisplayForm from "@/components/Forms/DisplayForm";
import dbConnect from "../../../../../../server/db/dbConnect";
import Form from "../../../../../../server/db/models/Form";
import {
    MONTHLY_PLACED_FORM, MONTHLY_UNPLACED_FORM, VOLUNTEER_FORM } from "@/utils/formUtils";

export default function DisplayFormPage({success, message, data}) {
    data = JSON.parse(data);

    const { type, responses, user, dog } = data;
    // "MonthlyUnplaced", "MonthlyPlaced", "VolunteerInteraction"
    let formTemplate;
    if (type === "MonthlyUnplaced") {
        formTemplate = MONTHLY_UNPLACED_FORM
    } else if (type === "MonthlyPlaced") {
        formTemplate = MONTHLY_PLACED_FORM
    } else if (type === "VolunteerInteraction") {
        formTemplate = VOLUNTEER_FORM
    }
    return (
        <DisplayForm responses={responses} template={formTemplate} type={type} dog={dog} user={user} />
    )
   
}

export async function getServerSideProps({ params }) {
    
    // get the form by id
    try {
        await dbConnect();
        const formResponse = await Form.findById(params.formId);
        console.log(formResponse)
        
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