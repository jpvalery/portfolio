import NextLink from "next/link";

export default function CTA() {
  return (
    <div className="py-4">
      <a href="https://contact.jpvalery.me">
        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-advisor-600 hover:bg-advisor-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-advisor-500 mx-auto">
          Get me as advisor
          <svg
            class="ml-3 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </button>
      </a>
    </div>
  );
}
