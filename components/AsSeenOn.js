import CBC from '../elements/logos/CBC'
import LonelyPlanet from '../elements/logos/LonelyPlanet'
import ExploreCanada from '../elements/logos/ExploreCanada'
import PetaPixel from '../elements/logos/PetaPixel'
import BoredPanda from '../elements/logos/BoredPanda'
import Abduzeedo from '../elements/logos/Abduzeedo'
import Unsplash from '../elements/logos/Unsplash'
import Burst from '../elements/logos/Burst'
import Scribe from '../elements/logos/Scribe'
import VYSUAL from '../elements/logos/VYSUAL'
import Kedge from '../elements/logos/Kedge'

export default function AsSeenOn() {
  return (
    <div className="mx-auto w-full pb-12">
      <div>
        <h2 className="py-6 text-center text-xl font-bold uppercase">
          As Seen On
        </h2>
      </div>
      <div className="grid grid-cols-1 content-around items-center justify-center justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CBC />
        <ExploreCanada />
        <LonelyPlanet />
        <BoredPanda />
        <PetaPixel />
        <Abduzeedo />
        <Unsplash />
        <Burst />
        <Scribe />
        <VYSUAL />
        <Kedge />
        <p className="text-xl font-bold text-accent">and more</p>
      </div>
    </div>
  )
}
