import { MONTHLY_PLACED_FORM, MONTHLY_UNPLACED_FORM } from "@/utils/formUtils";

export default function DisplayForm({ responses, template, type, dog, user }) {
    const form = template.map(({ question }, index) => {
        return (
            <div key={responses._id}>
                <h5>{question}</h5>
                <p className="text-ca-green">{ responses.length <= index ? "X" : responses[index].answer }</p>
            </div>
        )
    })
    return (
        <main>
            <h1>{type} Form</h1>
            <h2>Dog: {dog}</h2>
            <h2>User: {user}</h2>
            {form}
         </main>   
    )
}