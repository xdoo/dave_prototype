enum Zaehldauer {
  DAUER_2_X_4_STUNDEN = 'DAUER_2_X_4_STUNDEN', /** Kurzzeiterhebung (6 bis 10 Uhr; 15 bis 19 Uhr) */
  DAUER_16_STUNDEN = 'DAUER_16_STUNDEN', /** 16-Stunden-Zählung */
  DAUER_24_STUNDEN = 'DAUER_24_STUNDEN', /** 24-Stunden-Zählung */
}

export const ZaehldauerToBeschreibung = new Map<string, string>([
  [Zaehldauer.DAUER_2_X_4_STUNDEN, 'Kurzzeiterhebung (6 bis 10 Uhr; 15 bis 19 Uhr)'],
  [Zaehldauer.DAUER_16_STUNDEN, '16-Stunden-Zählung'],
  [Zaehldauer.DAUER_24_STUNDEN, '24-Stunden-Zählung'],
]);

export const BeschreibungToZaehldauer = new Map([...ZaehldauerToBeschreibung].reverse());
export default Zaehldauer;