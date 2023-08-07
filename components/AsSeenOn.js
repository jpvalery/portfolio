import Abduzeedo from '../elements/logos/Abduzeedo'
import BoredPanda from '../elements/logos/BoredPanda'
import Burst from '../elements/logos/Burst'
import CBC from '../elements/logos/CBC'
import ExploreCanada from '../elements/logos/ExploreCanada'
import Kedge from '../elements/logos/Kedge'
import LonelyPlanet from '../elements/logos/LonelyPlanet'
import PetaPixel from '../elements/logos/PetaPixel'
import Scribe from '../elements/logos/Scribe'
import Unsplash from '../elements/logos/Unsplash'
import VYSUAL from '../elements/logos/VYSUAL'

import { LogoGrid } from '@jpvalery/mistral'

export default function AsSeenOn() {
  return (
    <div className="mx-auto w-full pb-12">
      <div>
        <h2 className="py-6 text-center text-xl font-bold uppercase">
          As Seen On
        </h2>
      </div>
      <LogoGrid>
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
      </LogoGrid>
    </div>
  )
}
