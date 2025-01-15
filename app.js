// Inicialización del mapa
const map = L.map('map').setView([32.5241, -117.0382], 13); // Coordenadas iniciales de Tijuana

// Cargar mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Función para agregar lugares turísticos
function addLocation(lat, lng, title, description, rating) {
  const content = `
    <h3>${title}</h3>
    <p>${description}</p>
    <p>Calificación: ${'⭐'.repeat(rating)}</p>
  `;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(content);
}

// Agregar ubicaciones turísticas en Tijuana con coordenadas reales
addLocation(32.53159553695682, -117.03643604488893, 'Avenida Revolución', 'Es la avenida más conocida de Tijuana, llena de tiendas, bares y restaurantes, ideal para disfrutar de la cultura local y la vida nocturna.', 5);
addLocation(32.530468358048886, -117.02309510626823, 'Museo de las Californias', 'Un museo dedicado a la historia y cultura de Baja California, ideal para los amantes de la historia.', 4);
addLocation(32.52205127864349, -117.12554648295162, 'Playas de Tijuana', 'Hermosas playas en la zona costera de Tijuana, donde puedes disfrutar de un ambiente relajado y diversas actividades acuáticas.', 5);
addLocation(32.503318697261456, -116.93476099519317, 'Parque Morelos', 'Un parque recreativo ideal para pasar tiempo en familia, con espacios verdes, lago y actividades al aire libre.', 4);
addLocation(32.53035424699357, -117.02347854674241, 'Centro Cultural Tijuana (Cecut)', 'Un importante centro cultural donde se realizan exposiciones artísticas, conciertos y actividades culturales.', 5);
addLocation(32.49404058634641, -116.92843620107793, 'Plaza Río Tijuana', 'Un moderno centro comercial con una amplia variedad de tiendas, restaurantes y entretenimiento.', 4);
addLocation(32.495162771865246, -116.93848994674416, 'El Trompo – Museo Interactivo Tijuana', 'Un museo interactivo donde los niños pueden aprender de manera divertida sobre ciencia, arte y tecnología.', 5);
addLocation(32.532057153888445, -117.05192652954403, 'La Casa de la Cultura Tijuana', 'Un espacio dedicado a las artes, donde se realizan exposiciones, talleres y presentaciones culturales.', 4);
addLocation(32.5385, -117.0197, 'Bocana del Río Tijuana', 'Un lugar natural donde el río Tijuana se encuentra con el mar, ideal para los amantes de la naturaleza y el ecoturismo.', 5);
addLocation(32.517988717305684, -117.07950608204237, 'Cañón del Matadero', 'Un área natural para hacer caminatas, con vistas panorámicas de la ciudad y el mar.', 4);
addLocation(32.53040852029597, -117.02338198721658, 'Tijuana Cultural Center (CECUT)', 'Centro de la cultura en la región, con exhibiciones, películas y actividades educativas.', 5);
addLocation(19.421712748502706, -99.17923450308959, 'Monumento a los Niños Héroes', 'Un monumento en honor a los niños héroes, que es una de las estructuras más representativas de Tijuana.', 4);
addLocation(32.30175144579846, -117.04288817365907, 'El Popotla', 'Un pintoresco pueblo de pescadores donde puedes disfrutar de mariscos frescos y el ambiente tranquilo junto al mar.', 5);
addLocation(32.53622763293952, -117.03742670389718, 'Plaza Santa Cecilia', 'Una plaza vibrante llena de arte, música y cultura popular, ideal para un paseo relajado.', 4);
addLocation(32.53884171837604, -116.94109703874197, 'Parque de la Amistad', 'Un parque familiar con áreas verdes, zonas deportivas y juegos para niños.', 4);

// Función para obtener y mostrar la ubicación actual del usuario
function updateUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup('Tu ubicación actual.')
          .openPopup();
        map.setView([latitude, longitude], 15);
      },
      () => {
        alert('No se pudo obtener tu ubicación.');
      }
    );
  }
}

// Configurar el botón para actualizar la ubicación
document.getElementById("updateLocationBtn").addEventListener("click", updateUserLocation);

// Actualizar la ubicación al cargar la página por primera vez
updateUserLocation();
