import toast from "react-hot-toast";

const CA_GREEN = "#17603D";
const CA_GREEN_SHADE = "#052E16";
const CA_PINK = "#A70C53";
const CA_PINK_SHADE = "#730034";

export function Toast({ success, message, bold }) {
  return toast(
    <span className="text-center">
      {bold ? <strong>{bold} </strong> : null}
      {message}
    </span>,
    {
      style: {
        color: "white",
        backgroundColor: success ? CA_GREEN : CA_PINK,
        border: `2px solid ${success ? CA_GREEN_SHADE : CA_PINK_SHADE}`,
        maxWidth: 1000,
      },
    },
  );
}
