enum Quelle {
  MANUELL = 'MANUELL', /** manuelle Erhebung */
  DETEKTOR = 'DETEKTOR', /** Detektorzählung */
  RADAR = 'RADAR', /** Seitenradar */
  VIDEO = 'VIDEO', /** Videoerhebung */
}

export const QuelleToBeschreibung = new Map<string, string>([
  [Quelle.MANUELL, 'manuelle Erhebung'],
  [Quelle.DETEKTOR, 'Detektorzählung'],
  [Quelle.RADAR, 'Seitenradar'],
  [Quelle.VIDEO, 'Videoerhebung'],
]);

export const BeschreibungToQuelle = new Map([...QuelleToBeschreibung].reverse());
export default Quelle;