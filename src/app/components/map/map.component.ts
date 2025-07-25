import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html'
})

export class MapComponent implements AfterViewInit {
  @Input() mapId: string = 'map-' + Math.floor(Math.random() * 10000);
  @Input() type: 'classic' | 'readonly' = 'classic';
  @Input() lat: number = 0;
  @Input() lon: number = 0;

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
    if (this.type === 'readonly') {
      this.initReadonlyMap();
    } else {
      this.initClassicMap();
    }
  }

  initClassicMap(){
    this.map = L.map(this.mapId).setView([47.20, -1.56], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: 'map-tiles'
    }).addTo(this.map);

    this.map.on('click', (e: any) => this.setMarker(e));
  }

  initReadonlyMap(){
    this.map = L.map(this.mapId, {
      center: [this.lat, this.lon],
      zoom: 5,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: 'map-tiles'
    }).addTo(this.map);

    this.marker = L.marker([this.lat, this.lon], { icon: this.myIcon }).addTo(this.map);
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
