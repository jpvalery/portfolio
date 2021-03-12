import Gameloft from '../elements/logos/companies/Gameloft'
import LANDR from '../elements/logos/companies/LANDR'
import LocalLogic from '../elements/logos/companies/LocalLogic'

export default function Logos() {
  return (
    <div className="py-8 mx-auto">
      <h2 className="pb-8 text-xl font-extrabold text-center uppercase text-gray-50">
        Over a decade of experience at companies like
      </h2>
      <div className="items-center justify-center text-gray-400 grid grid-flow-row md:grid-flow-col justify-items-center gap-8 md:gap-12">
        <Gameloft />
        <LANDR />
        <LocalLogic />
      </div>
    </div>
  )
}
