// Inicialización del mapa
const map = L.map('map').setView([32.5241, -117.0382], 13); // Coordenadas iniciales de Tijuana

// Cargar mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Variable para almacenar la ubicación seleccionada
let selectedLocation = null;

// Variable para la capa de la ruta
let routeLayer = null;

// Función para agregar lugares turísticos
function addLocation(lat, lng, title, description, rating, userLat, userLng, searchRadius) {
  const distance = map.distance([lat, lng], [userLat, userLng]); // Calcular la distancia entre la ubicación y el usuario

  // Verificar si la ubicación está dentro del radio de búsqueda
  if (distance <= searchRadius) {
    const content = `
      <h3>${title}</h3>
      <p>${description}</p>
      <p>Calificación: ${'⭐'.repeat(rating)}</p>
    `;
    const marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(content)
      .on('click', function () {
        selectedLocation = { lat, lng }; // Al hacer clic, se selecciona el lugar
        alert(`Destino seleccionado: ${title}`);
      });
  }
}

// Icono personalizado para la ubicación actual
const userIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64572.png', // Cambia esta URL por la imagen de tu icono
  iconSize: [30, 30], // Tamaño del icono
  iconAnchor: [15, 30], // Punto de anclaje del icono
});

// Función para obtener y mostrar la ubicación actual del usuario con un radio
function updateUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Agregar un marcador personalizado
        L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup('Tu ubicación actual.')
          .openPopup();

        // Agregar un círculo para representar el radio de búsqueda
        const searchRadius = 1000; // Radio en metros
        const userCircle = L.circle([latitude, longitude], {
          color: 'blue',
          fillColor: '#a1c4fd',
          fillOpacity: 0.3,
          radius: searchRadius,
        }).addTo(map);

        // Agregar los lugares turísticos
        addLocation(32.53159553695682, -117.03643604488893, 'Avenida Revolución', 'Es la avenida más conocida de Tijuana, llena de tiendas, bares y restaurantes, ideal para disfrutar de la cultura local y la vida nocturna.', 5, latitude, longitude, searchRadius);
        addLocation(32.530468358048886, -117.02309510626823, 'Museo de las Californias', 'Un museo dedicado a la historia y cultura de Baja California, ideal para los amantes de la historia.', 4, latitude, longitude, searchRadius);
        addLocation(32.52205127864349, -117.12554648295162, 'Playas de Tijuana', 'Hermosas playas en la zona costera de Tijuana, donde puedes disfrutar de un ambiente relajado y diversas actividades acuáticas.', 5, latitude, longitude, searchRadius);
        addLocation(32.503318697261456, -116.93476099519317, 'Parque Morelos', 'Un parque recreativo ideal para pasar tiempo en familia, con espacios verdes, lago y actividades al aire libre.', 4, latitude, longitude, searchRadius);
        addLocation(32.53035424699357, -117.02347854674241, 'Centro Cultural Tijuana (Cecut)', 'Un importante centro cultural donde se realizan exposiciones artísticas, conciertos y actividades culturales.', 5, latitude, longitude, searchRadius);
        addLocation(32.49404058634641, -116.92843620107793, 'Plaza Río Tijuana', 'Un moderno centro comercial con una amplia variedad de tiendas, restaurantes y entretenimiento.', 4, latitude, longitude, searchRadius);
        addLocation(32.495162771865246, -116.93848994674416, 'El Trompo – Museo Interactivo Tijuana', 'Un museo interactivo donde los niños pueden aprender de manera divertida sobre ciencia, arte y tecnología.', 5, latitude, longitude, searchRadius);
        addLocation(32.532057153888445, -117.05192652954403, 'La Casa de la Cultura Tijuana', 'Un espacio dedicado a las artes, donde se realizan exposiciones, talleres y presentaciones culturales.', 4, latitude, longitude, searchRadius);
        addLocation(32.5385, -117.0197, 'Bocana del Río Tijuana', 'Un lugar natural donde el río Tijuana se encuentra con el mar, ideal para los amantes de la naturaleza y el ecoturismo.', 5, latitude, longitude, searchRadius);
        addLocation(32.517988717305684, -117.07950608204237, 'Cañón del Matadero', 'Un área natural para hacer caminatas, con vistas panorámicas de la ciudad y el mar.', 4, latitude, longitude, searchRadius);
        addLocation(32.53040852029597, -117.02338198721658, 'Tijuana Cultural Center (CECUT)', 'Centro de la cultura en la región, con exhibiciones, películas y actividades educativas.', 5, latitude, longitude, searchRadius);
        addLocation(19.421712748502706, -99.17923450308959, 'Monumento a los Niños Héroes', 'Un monumento en honor a los niños héroes, que es una de las estructuras más representativas de Tijuana.', 4, latitude, longitude, searchRadius);
        addLocation(32.30175144579846, -117.04288817365907, 'El Popotla', 'Un pintoresco pueblo de pescadores donde puedes disfrutar de mariscos frescos y el ambiente tranquilo junto al mar.', 5, latitude, longitude, searchRadius);
        addLocation(32.53622763293952, -117.03742670389718, 'Plaza Santa Cecilia', 'Una plaza vibrante llena de arte, música y cultura popular, ideal para un paseo relajado.', 4, latitude, longitude, searchRadius);
        addLocation(32.53884171837604, -116.94109703874197, 'Parque de la Amistad', 'Un parque familiar con áreas verdes, zonas deportivas y juegos para niños.', 4, latitude, longitude, searchRadius);
        addLocation(32.452979548069536, -116.84037453406044, 'Essilor Luxottica', 'Trabajo', 4, latitude, longitude, searchRadius);
        addLocation(32.452979548069536, -116.84037453406044, 'UTT', 'Escuela', 4, latitude, longitude, searchRadius);

        // Centrar el mapa en la ubicación del usuario
        map.setView([latitude, longitude], 15);
        map.fitBounds(userCircle.getBounds()); // Ajustar el mapa al círculo de búsqueda
      },
      () => {
        alert('No se pudo obtener tu ubicación.');
      }
    );
  }
}

// Función para mostrar la ruta desde la ubicación del usuario hasta el destino seleccionado
function showRoute() {
  if (selectedLocation) {
    // Si ya hay una ruta previa, eliminarla
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    // Crear la ruta usando Leaflet Routing Machine
    routeLayer = L.Routing.control({
      waypoints: [
        L.latLng(map.getCenter()), // Punto de inicio (ubicación del usuario)
        L.latLng(selectedLocation.lat, selectedLocation.lng), // Destino seleccionado
      ],
      routeWhileDragging: true,
    }).addTo(map);
  } else {
    alert('Por favor, selecciona un destino primero.');
  }
}

// Configurar el botón para actualizar la ubicación
document.getElementById("updateLocationBtn").addEventListener("click", updateUserLocation);

// Configurar el botón para mostrar la ruta
document.getElementById("showRouteBtn").addEventListener("click", showRoute);

// Actualizar la ubicación al cargar la página por primera vez
updateUserLocation();

// Función para detectar los movimientos del giroscopio y mover el mapa
function handleOrientation(event) {
  const alpha = event.alpha; // Rotación en el eje Z
  const beta = event.beta; // Rotación en el eje X
  const gamma = event.gamma; // Rotación en el eje Y

  // Limitar el rango de valores para evitar movimientos bruscos
  const maxTilt = 45; // Ángulo máximo de inclinación permitido
  const minTilt = -45;

  // Calcular la dirección de desplazamiento del mapa según la inclinación
  const offsetX = (gamma / maxTilt) * 0.1; // Ajuste de desplazamiento horizontal
  const offsetY = (beta / maxTilt) * 0.1; // Ajuste de desplazamiento vertical

  // Mover el mapa en función del desplazamiento
  const currentCenter = map.getCenter();
  map.setView([currentCenter.lat + offsetY, currentCenter.lng + offsetX], map.getZoom());
}

// Añadir un listener de orientación
window.addEventListener('deviceorientation', handleOrientation);
