let data = document.querySelectorAll(".data");
let button = document.querySelector(".ip_bt");
let display_map = document.querySelector("#map");  // Select by ID


let map = L.map('map', {
    center: [51.505, -0.09], 
    zoom: 13,
});


// Add OpenStreetMap tile layer (necessary for the map to display)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);



async function get_ip_info(){
    let ip = document.querySelector(".get_ip").value;
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_HhUFl9h3OSH5WkNuwUcmq8SRY3A8P&ipAddress=${ip}`)
    const ip_data = await response.json();
    
    data[0].innerText = ip_data.ip;
    data[1].innerHTML = `${ip_data.location.region}, ${ip_data.location.country} <br> ${ip_data.location.city}`;
    data[2].innerText = ip_data.location.timezone;
    data[3].innerText = ip_data.isp;

    let lat = ip_data.location.lat;  // Correct key for latitude
    let lng = ip_data.location.lng;  // Correct key for longitude

    // Update the map center to the new location
    map.setView([lat, lng], 13);
    map.scrollWheelZoom.enable();  // Enable zoom with mouse scroll
    map.doubleClickZoom.enable();  // Enable zoom with double-click
    map.touchZoom.enable();        // Enable zoom on touch devices
    map.dragging.enable();         // Enable dragging the map


    // Add a marker at the new location
    L.marker([lat, lng]).addTo(map)
      .bindPopup(`<b>${ip_data.ip}</b><br>${ip_data.location.city}, ${ip_data.location.country}`)
      .openPopup();
}

button.addEventListener("click", get_ip_info);

