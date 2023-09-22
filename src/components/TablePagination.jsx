import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function TablePaginator({
  currentPage,
  incrementPage,
  decrementPage,
  gotoFirstPage,
  gotoLastPage,
  setPage,
}) {
  return (
    <ul className="justify-center inline-flex text-md ml-0 md:ml-12 ">
      <li className="invisible md:visible" style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            onClick={() => {
              gotoFirstPage();
            }}
          >
            <ChevronDoubleLeftIcon className={"w-3 h-3"} color="gray" />
          </button>
        </div>
      </li>

      <li className="invisible md:visible" style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            onClick={() => {
              decrementPage();
            }}
          >
            <ChevronLeftIcon className={"w-3 h-3"} color="gray" />
          </button>
        </div>
      </li>

      {Array.from(Array(Math.ceil(4 / 10.0)), (e, i) => {
        return (
          <li key={i} style={{ paddingLeft: "0.5rem" }}>
            <button
              onClick={() => setPage(i)}
              className={`p-2 flex justify-center items-center w-[0.5rem] text-gray-500 h-[0.5rem] ${
                currentPage === i ? "text-red-100 bg-theme rounded-lg" : ""
              }`}
            >
              {i + 1}
            </button>
          </li>
        );
      })}

      <li className="invisible md:visible" style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            onClick={() => {
              incrementPage();
            }}
          >
            <ChevronRightIcon className={"w-3 h-3"} color="gray" />
          </button>
        </div>
      </li>

      <li className="invisible md:visible" style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            onClick={() => {
              gotoLastPage();
            }}
          >
            <ChevronDoubleRightIcon className={"w-3 h-3"} color="gray" />
          </button>
        </div>
      </li>
    </ul>
  );
}
