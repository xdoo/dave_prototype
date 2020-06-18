import Counter from "@/types/Counter"

export default class CounterService {

  static counterById(id: string) {
    const c = this.counters().filter(counter => counter.id === id)
      if(c.length === 1) {
        return c[0]
      } else {
        console.warn("no counter for " + id)
      }
  }
  
  static counters(): Array<Counter> {
    return [
      {id: '1', districtNumber: '13', district: 'Bogenhausen', counter: 'Kreuzung Denninger Str. /  Vollmannstr.', streets: 'Denninger Str., Vollmannstr.', lng: '11.6261303', lat: '48.147486', countsNum: '4', lastCount: '11.07.2019', keywords: '', reason: 'Ampelschaltung'},
      {id: '2', districtNumber: '13', district: 'Bogenhausen', counter: 'Luitpoldbrücke', streets: 'Luitpoldbrücke', lng: '11.5939997', lat: '48.141759', countsNum: '6', lastCount: '17.06.2018', keywords: 'Isar', reason: 'Umbau Straße'},
      {id: '3', districtNumber: '13', district: 'Bogenhausen', counter: 'Max-Joseph-Brücke', streets: 'Max-Joseph-Brücke', lng: '11.5979578', lat: '48.149204', countsNum: '3', lastCount: '20.03.2020', keywords: 'Isar', reason: 'Umbau Straße'},
      {id: '4', districtNumber: '13', district: 'Bogenhausen', counter: 'Truderinger Str.', streets: 'Truderinger Str.', lng: '11.6326668', lat: '48.135299', countsNum: '6', lastCount: '15.12.2019', keywords: 'Bahn', reason: 'Umbau Straße'},
      {id: '5', districtNumber: '13', district: 'Bogenhausen', counter: 'Effnerplatz', streets: 'Effnerplatz, Effnerstr., Bülowstr., Richard-Strauss-Str.', lng: '11.6135198', lat: '48.152782', countsNum: '8', lastCount: '12.01.2020', keywords: '', reason: 'Ampelschaltung'},
      {id: '6', districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Donnersberger Brücke', streets: 'Donnersberger Brücke', lng: '11.53468', lat: '48.14238', countsNum: '4', lastCount: '15.06.2019', keywords: 'Bahn', reason: 'Umbau S-Bahn'},
      {id: '7', districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Kreuzung Trappentreustr. / Donnersbergerbrücke', streets: 'Trappentreustr., Donnersbergerbrücke', lng: '11.5324463', lat: '48.13994', countsNum: '5', lastCount: '11.02.2018', keywords: '', reason: 'Umbau Kreuzung'},
      {id: '8', districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Kreuzung Westend- / Bergmannstr.', streets: 'Westendstr., Bergmannstr.', lng: '11.5371788', lat: '48.138163', countsNum: '7', lastCount: '11.02.2018', keywords: '', reason: 'Ampelschaltung'},
      {id: '9', districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Kreuzung Guldein- / Astallerstr.', streets: 'Guldeinstr., Astallerstr.', lng: '11.5306388', lat: '48.138784', countsNum: '3', lastCount: '11.02.2018', keywords: '', reason: 'Umbau Kreuzung'},
      {id: '10', districtNumber: '10', district: 'Moosach', counter: 'Bahnunterführung Dachauerstr.', streets: 'Dachauerstr., Pelkovenstr., Baubergerstr. ', lng: '11.50899', lat: '48.18269', countsNum: '5', lastCount: '20.01.2020', keywords: 'Bahn', reason: 'Umbau Unterführung'},
      {id: '11', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauer- / Pelkovenstr.', streets: 'Dachauerstr.', lng: '11.51172', lat: '48.18113', countsNum: '4', lastCount: '14.06.2019', keywords: '', reason: 'Ampelschaltung'},
      {id: '12', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauerstr. / Wintrichring', streets: 'Dachauerstr., Wintrichring', lng: '11.52245', lat: '48.17581', countsNum: '7', lastCount: '13.04.2019', keywords: '', reason: 'Ampelschaltung'},
      {id: '13', districtNumber: '9', district: 'Neuhausen - Nymphenburg', counter: 'Kreuzung Dachauerstr. / Schwere-Reiter-Str.', streets: 'Dachauerstr., Schwere-Reiter-Str., Leonrodstr.', lng: '11.54743', lat: '48.15974', countsNum: '6', lastCount: '16.05.2018', keywords: '', reason: 'Umbau Trambahn'},
      {id: '14', districtNumber: '9', district: 'Neuhausen - Nymphenburg', counter: 'Kreuzung Dachauerstr. / Nymphenburger Str.', streets: 'Dachauerstr., Nymphenburger Str., Brienner Str.', lng: '11.5588', lat: '48.14754', countsNum: '5', lastCount: '14.02.2018', keywords: '', reason: 'Umbau Trambahn'},
      {id: '15', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauerstr. / Donauwörther Str.', streets: 'Dachauerstr., Donauwörther Str.', lng: '11.50531', lat: '48.18466', countsNum: '3', lastCount: '20.03.2020', keywords: '', reason: 'Ampelschaltung'},
      {id: '16', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauerstr. / Hanauer Str.', streets: 'Dachauerstr., Hanauer Str., Orpheusstr.', lng: '11.52828', lat: '48.17268', countsNum: '4', lastCount: '11.11.2018', keywords: '', reason: 'Umbau Kreuzung'},
      {id: '17', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauerstr. / Emmy-Noether-Str.', streets: 'Dachauerstr., emmy-Noether-Str.', lng: '11.53046', lat: '48.17147', countsNum: '1', lastCount: '14.03.2018', keywords: '', reason: 'Umbau Trambahn'},
      {id: '18', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauer- / Lothstr.', streets: 'Dachauerstr., Lothstr.', lng: '11.55367', lat: '48.15424', countsNum: '4', lastCount: '11.04.2017', keywords: '', reason: 'Umbau Trambahn'},
      {id: '19', districtNumber: '10', district: 'Moosach', counter: 'Bahnbrücke Allacher Str.', streets: 'Allacher Str.', lng: '11.5007', lat: '48.17516', countsNum: '3', lastCount: '17.10.2018', keywords: 'Bahn', reason: 'Renovierung Brücke'},
      {id: '20', districtNumber: '10', district: 'Moosach', counter: 'Kreuzung Dachauerstr. / Hugo-Troendle-Str.', streets: 'Dachauerstr., Hugo-Troendle-Str.', lng: '11.51523', lat: '48.17927', countsNum: '3', lastCount: '10.09.2019', keywords: '', reason: 'Ausbau Radweg'}       
    ]
  }
}