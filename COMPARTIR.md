# Compartir APARUC con todas sus imágenes

Todas las fotos y el logo están guardados dentro de `public/`. La página usa esas copias: no depende de los originales de Descargas o Escritorio.

Para compartir el proyecto, entrega el ZIP completo o copia la carpeta del proyecto incluyendo `src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, `tsconfig.json` y `vite.config.ts`. Mantén los nombres y la estructura de las carpetas.

En otro equipo, instala Node.js 20.19+ o 22.12+ y ejecuta desde la carpeta del proyecto:

```sh
npm ci
npm run dev
```

Abre la dirección que muestra la terminal. No se abre con doble clic en index.html. No necesitas compartir `node_modules/`, porque `npm ci` instala las dependencias.

Para publicar, ejecuta `npm run build` y sube TODO el contenido de `dist/`, incluidas las imágenes. El ZIP contiene el código fuente, no una compilación lista para hosting.

Las tipografías utilizan Google Fonts y cuentan con alternativas locales.

Las imágenes actuales ya reemplazan varias ilustraciones descritas en el README inicial. El contacto actual utiliza WhatsApp, correo e Instagram. TypeScript pasó; la compilación de Vite está pendiente de verificación fuera de este entorno, que bloquea la carga de su configuración por permisos.
