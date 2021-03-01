import NextLink from "next/link";

export default function CTA() {
  return (
    <div className="py-4">
      <a href="https://contact.jpvalery.me">
        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-consultant-600 hover:bg-consultant-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-consultant-500 mx-auto">
          Hire me
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </button>
      </a>
    </div>
  );
}
