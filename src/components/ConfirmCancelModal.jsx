import Card from "@/components/Card";

export default function ConfirmCancelModal(
  titleText,
  mainText,
  confirm,
  setShowModal,
  showModal
) {
  return (
    <div>
      <div className="fixed inset-0 bg-modal-background-gray opacity-60" onClick={() => setShowModal(!showModal)}></div>
      <Card cardStyle="flex flex-col justify-between fixed z-10 inset-0 mt-32 mx-96 h-fit min-w-fit">
        <h1>{titleText}</h1>
        <p className="my-8">{mainText}</p>
        <div className="flex flex-row justify-end">
          <button
            className="flex flex-row h-full w-32 px-4 py-2 mx-4 justify-center border rounded border-primary-gray"
            onClick={() => setShowModal(!showModal)}
          >
            Cancel
          </button>
          <button
            className="flex flex-row h-full w-32 px-4 py-2 justify-center text-foreground bg-ca-pink border rounded border-ca-pink-shade"
            onClick={() => confirm()}
          >
            Confirm
          </button>
        </div>
      </Card>
    </div>
  );
}
