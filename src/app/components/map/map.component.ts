import {AfterViewInit, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import * as L from 'leaflet';
import {Icon} from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html'
})

export class MapComponent implements AfterViewInit {
  @Output() setCoords = new EventEmitter<{ lat: number, lon: number }>();
  map : any;
  marker: L.Marker | null = null;

  ngAfterViewInit() {
    this.map = L.map('map').setView([47.20, -1.56], 5);

    Icon.Default.mergeOptions({
      shadowUrl: ''
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.map.on('click', (e: any) => this.onMapClick(e));
  }

  onMapClick(e : any){
    if (this.marker) {
      this.marker.remove(); // supprime l’ancien
    }
    this.marker = L.marker(e.latlng).addTo(this.map);
    this.setCoords.emit({ lat: e.latlng.lat, lon: e.latlng.lng } );
  }
}
