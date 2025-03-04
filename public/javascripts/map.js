// creates the map
var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(listing.geometry.coordinates),
    zoom: 10,
  }),
});

//adding a marker
const marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat(listing.geometry.coordinates)),
  name: listing.location,
});

marker.setStyle(
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "/images/marker-icon.png",
      scale: 0.7,
    }),
  })
);

map.addLayer(
  new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [marker],
    }),
  })
);

// creates a popup
var popup = new ol.Overlay.Popup();
map.addOverlay(popup);

let listingCoordinates = ol.proj.fromLonLat(listing.geometry.coordinates);
var listingAddress = `<h4>${listing.location}</h4><p>Exact location will be provided after booking.</p>`;
popup.show(listingCoordinates, listingAddress);
