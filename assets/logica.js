async function cargarConversacionHTML(nombreUsuario) {
  try {
    const response = await fetch(`assets/conversaciones/${nombreUsuario.toLowerCase()}.html`);
    if (!response.ok) {
      throw new Error(`Error al cargar el archivo ${nombreUsuario.toLowerCase()}.html`);
    }
    const conversacionHTML = await response.text();
    return conversacionHTML;
  } catch (error) {
    console.error(error);
    return '';
  }
}

const usuariosEnChat = document.querySelectorAll('.bloquear');

usuariosEnChat.forEach(usuario => {
  usuario.addEventListener('click', async () => {
    const imagenPerfil = usuario.querySelector('.cobertura').getAttribute('src');
    const nombreUsuario = usuario.querySelector('.detalles .nombre').textContent;

    const contenidoChat = await cargarConversacionHTML(nombreUsuario);

    const chatContent = document.querySelector('.costadoDerecho');
    chatContent.innerHTML = `
      <div class="cabecera">
        <div class="imagenTexto">
        <div class="backButton"><ion-icon name="arrow-back-outline"></ion-icon></div>
          <div class="imagenUsuario">
            <img src="${imagenPerfil}" class="cobertura">
          </div>
          <div class="nombre">${nombreUsuario}<br><span>Online</span></div>
        </div>
        <ul class="nav_icons">
          <li><ion-icon name="search-outline"></ion-icon></li>
          <li><ion-icon name="ellipsis-vertical"></ion-icon></li>
        </ul>
      </div>
      <!-- contenido del chat -->
      <div class="chatBox">
        ${contenidoChat}
      </div>
      <!-- pestaña de escritura de chat -->
      <div class="chatBox_input">
        <ion-icon name="happy-outline"></ion-icon>
        <input type="text" placeholder="Escribe un mensaje">
        <ion-icon name="enter-outline"></ion-icon>
      </div> 
    `;

    const backButton = document.querySelector('.backButton');

    backButton.addEventListener('click', () => {
      const chatContainer = document.querySelector('.container');
      chatContainer.classList.remove('showChat');
    });

    const chatContainer = document.querySelector('.container');
    chatContainer.classList.add('showChat');
  });
});
