document.addEventListener('DOMContentLoaded', () => {
  // a) Mensaje de bienvenida general
  const mensaje = document.getElementById('mensajeBienvenida');
  if (mensaje) {
    const hora = new Date().getHours();
    const saludo =
      hora < 12 ? '¡Buen día!' :
      hora < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';
    mensaje.textContent = `${saludo} Bienvenido/a al TP6. Ingresa tu nombre y apellido.`;
  }

  // c) Pedir nombre y apellido y d) Dar bienvenida al usuario ingresado
  const form = document.getElementById('formNombre');
  const nombreLbl = document.getElementById('nombreIngresado');

  // Cargar si hay datos previos
  const prev = JSON.parse(localStorage.getItem('tp6_usuario') || 'null');
  if (prev && nombreLbl) {
    nombreLbl.textContent = `${prev.nombre} ${prev.apellido}`;
    if (mensaje) mensaje.textContent = `¡Hola ${prev.nombre} ${prev.apellido}! Bienvenido/a nuevamente.`;
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre')?.value.trim();
    const apellido = document.getElementById('apellido')?.value.trim();

    if (!nombre || !apellido) return;

    // Guardar y mostrar en la página (e)
    localStorage.setItem('tp6_usuario', JSON.stringify({ nombre, apellido }));
    if (nombreLbl) nombreLbl.textContent = `${nombre} ${apellido}`;
    if (mensaje) mensaje.textContent = `¡Hola ${nombre} ${apellido}! Gracias por visitar el proyecto.`;

    // Pequeña animación visual
    nombreLbl?.classList.add('flash');
    setTimeout(() => nombreLbl?.classList.remove('flash'), 800);
  });
});

// Estilo temporal por clase .flash (inyectado)
const style = document.createElement('style');
style.textContent = `
  .flash { outline: 2px solid #7aa2f7; border-radius: 999px; }
`;
document.head.appendChild(style);
