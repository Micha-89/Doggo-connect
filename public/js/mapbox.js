// const User = require("../../models/User");
// 
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbWFyaWFnIiwiYSI6ImNrbDI2cnNwczFhYzQycnFvanRhOHpvNnoifQ.3qmM7cisXOM7SVZBH3hHSQ'

const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/anamariag/ckl9eu0io0val17k4xvan8wp1', 
  center: [13.405, 52.52], // LONGITUDE, LATITUDE
  zoom: 4 
});

 
 
let coord = document.querySelector('.address').innerText.split(',')

let coordNumbers = coord.map(el=> Number(el))
console.log(coordNumbers)


let marker = new mapboxgl.Marker()
   .setLngLat(coordNumbers)
   .addTo(map)