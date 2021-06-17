import { food as _food } from 'carbon-footprint'
export * from 'carbon-footprint'

/* Unit: kgCO₂eq/s. 
REVIEW: Instead of using carbon-footprint package, I calculated the relation from MMF.earth app, 
since the calculations obtained from the package are confusing. Most of results are the same for all cases.
*/
export const streaming = {
    HDVideo: 0.00001272027,
    fullHDVideo: 0.00003583333,
    ultraHDVideo: 0.00015,
    audioMP3: 0.00000876166,
}

export const food = {
    ..._food,
    // beyondMeat data extracted from https://magnet.xataka.com/preguntas-no-tan-frecuentes/que-contamina-hamburguesa-carne-beyond-meat-este-grafico-ilustra
    beyondMeat: 3.53
}
