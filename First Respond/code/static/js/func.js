const token =
  'pk.eyJ1IjoibGh6Mzc2NjA0MjQ3IiwiYSI6ImNrbTBxbGxtMjF3eTMybnBsOG92eWpnYnkifQ.mnRxYYWHOJ644qlBlfFQZA';

let markerCollection = [];
new Vue({
  el: "#app",
  data: {
    checkList: [],
    hospitalMarkers: [],
    fireMarkers: [],
    policeMarkers: [],
    dialogVisible: false,
    activeName: 'first',
    // hospitalInput: '729 e johnson st',
    hospitalInput: 'Madison State Capital',
    hospital: 'Mendota Mental Health Institute',
    hospitalOptions: [{
      "label": "Mendota Mental Health Institute",
      "value": "Mendota Mental Health Institute"
    },
    {
      "label": "Select Specialty Hospital Madison",
      "value": "Select Specialty Hospital Madison"
    },
    {
      "label": "SSM Health ST Mary's Hospital",
      "value": "SSM Health ST Mary's Hospital"
    },
    {
      "label": "Unitypoint Health - Meriter",
      "value": "Unitypoint Health - Meriter"
    },
    {
      "label": "Unitypoint Health Meriter Child & Adolescent PSYCH",
      "value": "Unitypoint Health Meriter Child & Adolescent PSYCH"
    },
    {
      "label": "University of WI Hospitals & Clinics Authority",
      "value": "University of WI Hospitals & Clinics Authority"
    },
    {
      "label": "University of Wisconsin Hospitals and Clinics",
      "value": "University of Wisconsin Hospitals and Clinics"
    },
    {
      "label": "UW Health Rehabilitation Hospital",
      "value": "UW Health Rehabilitation Hospital"
    },
    {
      "label": "Miramont Behavioral Health",
      "value": "Miramont Behavioral Health"
    },
    {
      "label": "Stoughton Hospital",
      "value": "Stoughton Hospital"
    }
    ],
    fireInput: 'Madison State Capital',
    fireStation: 'Fire Station # 1',
    fireOptions: [{
      "value": "Fire Station # 7",
      "label": "1810 McKenna Blvd"
    },
    {
      "value": "Fire Station # 2",
      "label": "421 Grand Canyon Dr"
    },
    {
      "value": "Fire Station # 9",
      "label": "201 N. Midvale Blvd"
    },
    {
      "value": "Fire Station # 6",
      "label": "825 West Badger Rd"
    },
    {
      "value": "Fire Station # 4",
      "label": "1437 Monroe St"
    },
    {
      "value": "Fire Station # 1",
      "label": "316 W Dayton St"
    },
    {
      "value": "Fire Station # 3",
      "label": "1217 Williamson St"
    },
    {
      "value": "Fire Station # 10",
      "label": "1517 Troy Dr"
    },
    {
      "value": "Fire Station # 5",
      "label": "4418 Cottage Grove Rd"
    },
    {
      "value": "Fire Station # 8",
      "label": "3945 Lien Rd"
    },
    {
      "value": "Fire Station # 11",
      "label": "4011 Morgan Way"
    },
    {
      "value": "Fire Station # 13",
      "label": "6350 Town Center Dr"
    },
    {
      "value": "Fire Station # 12",
      "label": "400 South Point Rd"
    },
    {
      "value": "Fire Station #14",
      "label": "3218 Dairy Drive"
    }
    ],
    policeInput: 'Madison State Capital',
    policeStation: 'West Police District',
    policeOptions: [{
      "value": "West Police District",
      "label": "West Police District"
    },
    {
      "value": "South Police District",
      "label": "South Police District"
    },
    {
      "value": "North Police District",
      "label": "North Police District"
    },
    {
      "value": "Main Police District",
      "label": "Main Police District"
    },
    {
      "value": "East Police District",
      "label": "East Police District"
    },
    {
      "value": "Midtown Police District",
      "label": "Midtown Police District"
    }
    ]
  },
  mounted() {
    this.initMap();
    // this.handleChangeCheck();
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoidWNmbmhlbiIsImEiOiJja2x1Njg1cjMwMWVpMm9xbHM1ZW00MG9sIn0.W-ZPMO8all-8rO3ahmwWMQ";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-89.384226, 43.074682],
        zoom: 11,
        pitch: 0,
      });
      this.map.addControl(new mapboxgl.NavigationControl());
    },
    renderMaker(html, coordinates, icon) {
      const el = document.createElement('div');
      const width = 30;
      const height = 30;
      el.id = 'marker';
      el.style.backgroundImage = `url(${icon})`;
      el.style.backgroundRepeat = 'no-repeat';
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100% 100%';
      const popup = new mapboxgl.Popup({
        closeButton: false,
        offset: 15
      }).setHTML(html);
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(this.map);
      markerCollection.push(marker);
    },
    handleChangeCheck() {
      const {
        hospitalStation,
        fireStation,
        policeStation
      } = dataCollection;
      if (markerCollection.length) {
        markerCollection.forEach((s) => {
          if (s) {
            s.remove();
          }
        });
        markerCollection = [];
      }

      if (this.checkList.includes('Hospital')) {
        hospitalStation.forEach(({
          name,
          lng,
          lat,
          address,
          web,
          phone,
          bed
        }) => {
          const html = `
            <div class='cx-popup'>
              <div class='title'>Name: ${name || '--'}</div>
              <div class='title'>Address: ${address || '--'}</div>
              <div class='title'>Bed: ${bed || '--'}</div>
              <div class='title'>Phone: ${phone || '--'}</div>
              <div class='title'>Web Url: <a href=${web || '--'}>${web}</a></div>
            </div>
          `;
          this.renderMaker(html, [lng, lat], './static/img/hospital.svg');
        })
      }
      if (this.checkList.includes('Fire Station')) {
        fireStation.forEach(({
          name,
          lng,
          lat,
          address,
          first_station_no,
          first_station_status
        }) => {
          const html = `
            <div class='cx-popup'>
              <div class='title'>Name: ${name || '--'}</div>
              <div class='title'>Address: ${address || '--'}</div>
              <div class='title'>Fire Station No: ${first_station_no || '--'}</div>        
              <div class='title'>Fire Station Status: ${first_station_status || '--'}</div>        
            </div>
          `;
          this.renderMaker(html, [lng, lat], './static/img/fire.svg');
        })
      }
      if (this.checkList.includes('Police Station')) {
        policeStation.forEach(({
          name,
          lng,
          lat,
          address,
          police_station_status
        }) => {
          const html = `
            <div class='cx-popup'>
              <div class='title'>Name: ${name || '--'}</div>
              <div class='title'>Address: ${address || '--'}</div>
              <div class='title'>Police Station Status: ${police_station_status || '--'}</div>
            </div>
          `;
          this.renderMaker(html, [lng, lat], './static/img/police.svg');
        })
      }
    },
    async handleSearchRoute() {
      const {
        hospitalStation,
        fireStation,
        policeStation
      } = dataCollection;

      let start = null;
      let end = null;
      let stationInfo = {};
      let routeColor = 'red';

      if (this.activeName === 'first') {
        if (!this.hospitalInput || !this.hospital) {
          this.$message({
            type: 'error',
            message: 'Please enter location！',
            offset: 80
          });
          return;
        }

        start = await this.getPlacePosition(this.hospitalInput);
        if (!start) {
          this.$message({
            type: 'error',
            message: 'Sorry, the location cannot be found！',
            offset: 80
          });
          return;
        }
        stationInfo = hospitalStation.find((s) => s.name === this.hospital);
        end = `${stationInfo.lng},${stationInfo.lat}`;
        routeColor = 'red';
      }
      if (this.activeName === 'second') {
        if (!this.fireInput || !this.fireStation) {
          this.$message({
            type: 'error',
            message: 'Please enter location！',
            offset: 80
          });
          return;
        }

        end = await this.getPlacePosition(this.fireInput);
        if (!end) {
          this.$message({
            type: 'error',
            message: 'Sorry, the location cannot be found！',
            offset: 80
          });
          return;
        }
        stationInfo = fireStation.find((s) => s.name === this.fireStation);
        start = `${stationInfo.lng},${stationInfo.lat}`;
        routeColor = 'blue';
      }
      if (this.activeName === 'third') {
        if (!this.policeInput || !this.policeStation) {
          this.$message({
            type: 'error',
            message: 'Please enter location！',
            offset: 80
          });
          return;
        }
        end = await this.getPlacePosition(this.policeInput);
        if (!end) {
          this.$message({
            type: 'error',
            message: 'Sorry, the location cannot be found！',
            offset: 80
          });
          return;
        }

        stationInfo = policeStation.find((s) => s.name === this.policeStation);
        start = `${stationInfo.lng},${stationInfo.lat}`;
        routeColor = 'gray';
      }

      const drivingUrl =
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?geometries=geojson&language=cn&overview=full&access_token=${token}`;
      const query = await fetch(drivingUrl, {
        method: 'GET'
      });
      const data = await query.json();
      if (!data.routes.length) {
        this.$message({
          type: 'error',
          message: 'Sorry, the route cannot be found！',
          offset: 80
        });
        return;
      }
      const {
        geometry,
        distance,
        duration
      } = data.routes[0];

      stationInfo = {
        ...stationInfo,
        distance,
        duration
      };

      if (geometry) {
        this.addRouteLayer(geometry, stationInfo, routeColor);
      }
    },
    handleRefresh() {
      this.map.setCenter([-89.384226, 43.074682]);
      this.map.setZoom(11);
    },
    async getPlacePosition(placeName) {
      const placeUrl =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?limit=1&types=poi,country,region,postcode,district,place,locality,neighborhood,address&access_token=${token}`;
      const query = await fetch(placeUrl, {
        method: 'GET'
      });
      const data = await query.json();
      if (data.features.length) {
        const poi = data.features[0].center || [];
        return poi.join();
      }
      return null;
    },
    getBounds(geometry) {
      const coordinates = geometry.coordinates;
      const maxLng = Math.max(...coordinates.map((s) => s[0]));
      const minLng = Math.min(...coordinates.map((s) => s[0]));
      const maxLat = Math.max(...coordinates.map((s) => s[1]));
      const minLat = Math.min(...coordinates.map((s) => s[1]));

      const lngDiff = maxLng - minLng;
      const latDiff = maxLat - minLat;

      this.map.fitBounds([
        [minLng - lngDiff / 2, minLat - latDiff / 2],
        [maxLng + lngDiff / 2, maxLat + latDiff / 2]
      ]);

    },
    async addRouteLayer(geometry, stationInfo, routeColor) {
      this.removeRouteLayer();
      this.getBounds(geometry);

      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': geometry
        }
      });
      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': routeColor,
          'line-width': 5
        }
      });
      const popupHtml = `
          <div class='popup-header'>
            <div><span class='label'>Name:</span> ${stationInfo.name}</div>
            <div><span class='label'>Distance:</span> ${parseInt(stationInfo.distance)} m</div>
            <div><span class='label'>Time:</span> ${(stationInfo.duration / 60).toFixed(2)} min</div>
            <div><span class='label'>Address:</span> ${stationInfo.address}</div>
          </div>
        `
      const popup = new mapboxgl.Popup({
        offset: 25
      }).setHTML(
        popupHtml
      );

      this.endMarker = new mapboxgl.Marker()
        .setLngLat([stationInfo.lng, stationInfo.lat])
        .setPopup(popup)
        .addTo(this.map);
    },
    removeRouteLayer() {
      if (this.endMarker) {
        this.endMarker.remove();
      }
      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
      }
      if (this.map.getSource("route")) {
        this.map.removeSource("route");
      }
    },
    handleDialog() {
      this.dialogVisible = true;
    },
    scrollToElement() {
      document.getElementById("targetElement").scrollIntoView({
        behavior: "smooth"
      });
    }
  },
});