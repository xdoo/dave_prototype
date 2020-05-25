enum Wetter {
  SUNNY = 'SUNNY', /** Sonnig */
  CLOUDY = 'CLOUDY', /** leicht bewölkt */
  VERY_CLOUDY = 'VERY_CLOUDY', /** stark bewölkt */
  RAINY = 'RAINY', /** regnerisch */
  SNOWY = 'SNOWY', /** Schnee */
}

export const WetterToBeschreibung = new Map<string, string>([
  [Wetter.SUNNY, 'Sonnig'],
  [Wetter.CLOUDY, 'leicht bewölkt'],
  [Wetter.VERY_CLOUDY, 'stark bewölkt'],
  [Wetter.RAINY, 'regnerisch'],
  [Wetter.SNOWY, 'Schnee'],
]);

export const BeschreibungToWetter = new Map([...WetterToBeschreibung].reverse());
export default Wetter;