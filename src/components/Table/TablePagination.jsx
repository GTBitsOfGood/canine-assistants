import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

export default function TablePaginator({ paginationFunctions }) {
  const {
    currentPage,
    incrementPage,
    decrementPage,
    gotoFirstPage,
    gotoLastPage,
  } = paginationFunctions;

  return (
    <ul className="justify-center inline-flex text-md ml-0 md:ml-12 ">
      <li style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            aria-label="Goto First Page"

            onClick={() => {
              gotoFirstPage();
            }}
          >
            <ChevronDoubleLeftIcon className={"w-3 h-3 text-gray-800"} />
          </button>
        </div>
      </li>

      <li style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            aria-label="Goto Previous Page"

            onClick={() => {
              decrementPage();
            }}
          >
            <ChevronLeftIcon className={"w-3 h-3 text-gray-800"}/>
          </button>
        </div>
      </li>

      {
        <li style={{ paddingLeft: "0.5rem" }}>
          <div
            className={`p-2 flex justify-center items-center w-[0.5rem] text-gray-800 h-[0.5rem] rounded-lg" : ""
              }`}
          >
            {currentPage + 1}
          </div>
        </li>
      }

      <li style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            aria-label="Goto Next Page"
            onClick={() => {
              incrementPage();
            }}
          >
            <ChevronRightIcon className={"w-3 h-3 text-gray-800"} />
          </button>
        </div>
      </li>

      <li style={{ paddingLeft: "0.5rem" }}>
        <div
          className={`p-2 flex justify-center items-center w-[0.5rem] h-[0.5rem]`}
        >
          <button
            aria-label="Goto Last Page"
            onClick={() => {
              gotoLastPage();
            }}
          >
            <ChevronDoubleRightIcon className={"w-3 h-3 text-gray-800"} />
          </button>
        </div>
      </li>
    </ul>
  );
}
