import Gameloft from '../elements/logos/companies/Gameloft'
import LANDR from '../elements/logos/companies/LANDR'
import LocalLogic from '../elements/logos/companies/LocalLogic'

export default function Logos() {
  return (
    <div className="mx-auto py-8">
      <h2 className="text-xl uppercase font-extrabold text-gray-50 text-center pb-8">
        Over a decade of experience at companies like
      </h2>
      <div className="text-gray-400 grid grid-flow-row md:grid-flow-col justify-center justify-items-center items-center gap-8 md:gap-12">
        <Gameloft />
        <LANDR />
        <LocalLogic />
      </div>
    </div>
  )
}
