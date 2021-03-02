const Media = [
  {name: "CBC-Radio Canada - Radio interview"},
  {name: "Lonely Planet"},
  {name: "Explore Canada"},
  {name: "PetaPixel"},
  {name: "BoredPanda"},
  {name: "Abduzeedo - Daily Inspiration"},
  {name: "Unsplash"},
  {name: "Burst"},
  {name: "Scribe"},
  {name: "VYSUAL"},
  {name: "Kedge Business School - Alumni Portraits"}
];

export default function Biography() {
  return (
    <main>

      <div className="grid justify-items-center gap-8">
          <img
            className="h-48 w-48 rounded-full"
            src="/static/jp-valery-avatar.webp"
            alt=""
          />
          <h1 className="font-serif font-bold text-5xl md:text-6xl text-center pb-8 from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text text-transparent">
            About me
          </h1>
      </div>

      <div>
      <h2 className="text-2xl font-serif font-bold py-6">About me</h2>

      <p className="text-lg py-2">I'm a 29 years old self-taught photographer based in Montréal, QC. My passion for photography was born from a deep desire to share and document the beauty I see in my environment.</p>

      <p className="text-lg py-2">My work has been featured in international publications multiple times. I published my first book "An American Road Trip" in 2016 which was followed by my sophomore effort in 2018 "Mystic Mists of Massachusetts".</p>

      <p className="text-lg py-2">In 2017 and 2018, I have been nominated Community Allstar on Unsplash.com where my pictures have received more than <a href="https://unsplash.com/@jpvalery" className="underline hover:text-accent">130 Millions views.</a></p>

      <p className="text-lg py-2">In 2019, I founded the <a href="https://montrealphoto.club" className="underline hover:text-accent">Montréal Photo Club</a> to organize photography events and gatherings in Montréal.</p>

      <p className="text-lg py-2">In 2020, I released <a href="https://lookbutnostopping.com" className="underline hover:text-accent">LookButNoStopping.com</a>, an interactive web experience with photos from my trip to Newfoundland the year before.</p>

      <p className="text-lg py-2">For more information, or to get in touch regarding employment opportunities, or to just say hello, feel free to <a href="https://contact.jpvalery.me/photography" className="underline hover:text-accent">send me a message</a>.</p>

      <h2 className="text-2xl font-serif font-bold py-6">My artist statement</h2>

      <p className="text-lg py-2">I envision a very natural photography – close to the standards for photojournalism. Thus, all of my pictures are not digitally altered (so neither retouched, photoshopped, or transformed).</p>

      <p className="text-lg py-2">I try to capture images that transmit emotion and tell stories. I’d define my vision as almost naturalist but not emotionless in the depiction of my reality.</p>

      <p className="text-lg py-2 italic font-semibold text-accent">There’s a lot of beauty in ordinary things. Isn’t that kind of the point?</p>

      <h2 className="text-2xl font-serif font-bold py-6">Media Coverage & Featurings</h2>

      <ul className="grid grid-flow-row uppercase gap-1">
      {Media.map(({ name }) => (
        <li className="px-2 py-1 inline-flex items-center">    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      className="h-4 w-4 mr-2"
    >
      <path
        fillRule="evenodd"
        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      ></path>
    </svg>{name}</li>
      ))}
      </ul>

      <h2 className="text-2xl font-serif font-bold py-6">Exhibitions</h2>
      <p className="text-lg py-2"><span className="font-semibold text-accent">2018 An American Road Trip</span> - Extracts presented at Université de Sherbrooke during Anthrophocene</p>
      </div>
    </main>
  );
}
