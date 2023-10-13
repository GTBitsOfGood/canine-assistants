import { Fragment } from "react";
import { useForm } from "react-hook-form";

export default function EditForm({ template, responses }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        // make api call to db
        console.log(data);
    }
    const formContents = template.map(({ question, choices }, index) => {
        return (
            <Fragment key={index}>
                <label htmlFor={index.toString()}>{question}</label>
                <input id={ index } type="text" placeholder={choices.toString()} defaultValue={ responses.length <= index ? "" : responses[index].answer }{...register(index.toString())} />
            </Fragment>
            
        )
    })

    return (
        <main>
            <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">
                {formContents}
                <input type="submit" />
            </form>
        </main>
    )

}