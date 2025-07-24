import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html'
})

export class MapComponent implements AfterViewInit {
  @Output() outCoords = new EventEmitter<{ lat: number, lon: number }>();
  map : any;
  marker: L.Marker | null = null;
  markerUrl = window.getComputedStyle(document.body).getPropertyValue('--markerUrl').replace(/"/g, '');

  myIcon = L.icon({
    iconUrl: this.markerUrl,
    iconSize: [32, 38],
    iconAnchor: [16, 38],
    shadowUrl: '/media/marker-shadow.png',
    shadowSize: [38, 32],
    shadowAnchor: [6, 30]
  });

  ngAfterViewInit() {
    this.map = L.map('map').setView([47.20, -1.56], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: 'map-tiles'
    }).addTo(this.map);

    this.map.on('click', (e: any) => this.setMarker(e));
  }

  setMarker(e : any){
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = L.marker(e.latlng, { icon: this.myIcon, draggable: true }).addTo(this.map);
    this.marker.on('dragend', () => {
      // @ts-ignore
      this.outCoords.emit({ lat: this.marker.getLatLng().lat, lon: this.marker.getLatLng().lng } );
    });
    this.outCoords.emit({ lat: e.latlng.lat, lon: e.latlng.lng } );
  }
}
