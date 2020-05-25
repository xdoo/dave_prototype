enum Zaehlart {
  KLASSISCH = 'K', /** Klassisch */
  HAUPTVERKEHRSRICHTUNG = 'H', /** Hauptverkehrsrichtung/Oberfläche/Hoch */
  QUERSCHNITT = 'Q', /** Querschnitt */
  QUERSCHNITT_SONDERZAEHLUNG = 'Q_', /** Querschnitt/Sonderzählung */
  BAHNSCHNITT = 'QB', /** Bahnschnitt */
  QUERSCHNITT_HAUPTVERKEHRSRICHTUNG = 'QH', /** Querschnitt/Hauptverkehrsrichtung/ Oberfläche/Hoch */
  ISARSCHNITT = 'QI', /** Isarschnitt */
  STADTGRENZENZAEHLUNG = 'QS', /** STADTGRENZENZÄHLUNG */
  QUERSCHNITT_TUNNEL = 'QT', /** Querschnitt Tunnel/Unterführung/Tief */
  QUERSCHNITT_RADVERKEHR = 'QR', /** Querschnitt Radverkehr */
  RADVERKEHRSZAEHLUNG = 'R', /** Radverkehrszählung */
  TUNNEL = 'T', /** Tunnel / Unterführung / Tief */
  TEILKNOTEN = 'TK' /** Teilknoten */
}

export const ZaehlartToBeschreibung = new Map<string, string>([
  [Zaehlart.KLASSISCH, '#'],
  [Zaehlart.HAUPTVERKEHRSRICHTUNG, 'Hauptverkehrsrichtung/Oberfläche/Hoch'],
  [Zaehlart.QUERSCHNITT, 'Querschnitt'],
  [Zaehlart.QUERSCHNITT_SONDERZAEHLUNG, 'Querschnitt/Sonderzählung'],
  [Zaehlart.BAHNSCHNITT, 'Bahnschnitt'],
  [Zaehlart.QUERSCHNITT_HAUPTVERKEHRSRICHTUNG, 'Querschnitt/Hauptverkehrsrichtung/ Oberfläche/Hoch'],
  [Zaehlart.ISARSCHNITT, 'Isarschnitt'],
  [Zaehlart.STADTGRENZENZAEHLUNG, 'Stadtgrenzenzählung'],
  [Zaehlart.QUERSCHNITT_TUNNEL, 'Querschnitt Tunnel/Unterführung/Tief'],
  [Zaehlart.QUERSCHNITT_RADVERKEHR, 'Querschnitt Radverkehr'],
  [Zaehlart.RADVERKEHRSZAEHLUNG, 'Radverkehrszählung'],
  [Zaehlart.TUNNEL, 'Tunnel / Unterführung / Tief'],
  [Zaehlart.TEILKNOTEN, 'Teilknoten']
]);

export const BeschreibungToZaehlart = new Map([...ZaehlartToBeschreibung].reverse());
export default Zaehlart;