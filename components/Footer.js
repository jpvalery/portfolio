import Instagram from '../elements/icons/Instagram'
import Unsplash from '../elements/icons/Unsplash'

export default function Footer() {
  return (
    <footer>
      <div className="py-12 mx-auto md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://unsplash.com/@jpvalery"
            className="w-6 h-6 text-gray-400 hover:text-accent"
          >
            <span className="sr-only">Unsplash</span>
            <Unsplash />
          </a>

          <a
            href="https://instagram.com/jpvalery"
            className="w-6 h-6 text-gray-400 hover:text-accent"
          >
            <span className="sr-only">Instagram</span>
            <Instagram />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-500">
            &copy; 1992-2021 Jp Valery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
