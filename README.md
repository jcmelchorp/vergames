# VerGames

VerGames es una plataforma web diseñada para ofrecer una variedad de juegos y aplicaciones interactivas. Este proyecto consta de dos aplicaciones principales: **VerGames** y **YouSuck**, cada una con características únicas y tecnologías modernas.

## Descripción del Proyecto

### VerGames

- **Descripción**: Una colección de juegos clásicos como Tetris, Buscaminas, Ahorcado, entre otros. Cada juego está diseñado para ser intuitivo y divertido, con gráficos simples pero atractivos.
- **Framework**: Angular 19.
- **Diseño**: Personalizado con Angular Material para garantizar una experiencia de usuario moderna y responsiva.
- **Backend**: Firebase (Auth, Database, Firestore) para autenticación y almacenamiento de datos en tiempo real.
- **Captura de Pantalla**: ![VerGames Screenshot](https://vergames.web.app/assets/screenshots/vergames.png)
- **Demo**: [VerGames Demo](https://vergames.web.app)

### YouSuck

- **Descripción**: Una aplicación complementaria que permite a los usuarios personalizar avatares con múltiples opciones, como peinados, ropa y accesorios. También incluye funcionalidades adicionales para gestionar perfiles.
- **Framework**: Angular 19.
- **Estado Global**: Implementado con Signals y NgRx para un manejo eficiente del estado de la aplicación.
- **Diseño**: PrimeNG para una interfaz moderna y profesional.
- **Captura de Pantalla**: ![YouSuck Screenshot](https://yousuck.web.app/assets/screenshots/yousuck.png)
- **Demo**: [YouSuck Demo](https://yousuck.web.app)

## Tecnologías Utilizadas

- **Frontend**: Angular 19.
- **UI Libraries**: Angular Material, PrimeNG.
- **Estado Global**: NgRx con Signals.
- **Backend**: Firebase (Authentication, Firestore Database).
- **Hosting**: Firebase Hosting.

## Características

- **VerGames**:

  - Juegos clásicos como Tetris, Buscaminas, Ahorcado, entre otros.
  - Interfaz amigable y responsiva.
  - Integración con Firebase para autenticación y almacenamiento de datos.

- **YouSuck**:
  - Personalización de avatares con múltiples opciones.
  - Arquitectura standalone para mayor modularidad.
  - Uso de Signals para un manejo eficiente del estado.
  - **PWA** con soporte para un web service, permitiendo funcionalidad offline y mejor rendimiento.

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/vergames.git
   cd vergames
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura Firebase:

   - Crea un proyecto en Firebase.
   - Configura Authentication y Firestore.
   - Agrega el archivo `environment.ts` con las credenciales de Firebase.

4. Ejecuta la aplicación:
   ```bash
   ng serve
   ```

## Vistas Previas

### VerGames

![VerGames Preview](https://vergames.web.app/assets/preview.png)

### YouSuck

![YouSuck Preview](https://yousuck.web.app/assets/preview.png)

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para sugerencias o mejoras.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
