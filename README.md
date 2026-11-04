# APARUC

Sitio corporativo en React, TypeScript, Vite, Tailwind CSS, Lucide y Motion.

## Desarrollo local

Requiere Node.js 20.19+ o 22.12+ y npm.

```sh
npm install
npm run dev
```

Abre la dirección local que indica Vite. Para producción: `npm run build`. Para revisar la compilación: `npm run preview`.

## Contenido y funcionamiento

- Servicios y antecedentes del personal: `src/data.ts`.
- Secciones: `src/App.tsx`; componentes y formulario: `src/components.tsx`.
- Diseño responsive: `src/styles.css`, integrado con Tailwind CSS v4.
- Contacto mediante enlaces de tel?fono, correo e Instagram. El formulario se retir? temporalmente; su env?o se probar? en una p?gina aparte antes de incorporarlo al sitio.
- La cifra de 16 servicios conserva el indicador solicitado del portafolio. Las seis categorías muestran íntegramente todas las prestaciones solicitadas; no se recalcula la cifra a partir de los ítems agrupados.
- Credenciales presentadas según los datos aportados, con atribución al personal. Verificar documentos vigentes antes de publicación.

## Imágenes y publicación

`public/fjord.svg`: ilustración vectorial original de fiordos y una embarcación, utilizada como placeholder diseñado. No representa operaciones de APARUC. Las descargas de fotografía no estuvieron disponibles en el entorno de implementación. Para incorporar fotografías propias o licenciadas de la Patagonia, agregar el archivo en `public/`, reemplazar las tres referencias a `/fjord.svg` de `src/styles.css` y actualizar los textos alternativos y el pie de imagen en `src/App.tsx`.

La ilustración se sirve localmente y se reutiliza con distintos recortes. No necesita un proveedor externo al navegar. Las tipografías usan Google Fonts con alternativas locales. La portada social es un SVG original, `public/social-cover.svg`; para redes que requieran un formato raster, exportarlo a PNG y actualizar `og:image` con la URL absoluta del dominio definitivo. Configurar también canonical y `og:url` cuando se conozca ese dominio.

Navegación con anclas, menú móvil con Escape, servicios mediante elementos nativos `details`, enlace de salto y respeto de movimiento reducido. No se publica automáticamente.

## Estado de verificación del entorno

La instalación se intentó con npm y en modo offline. El entorno restringe el acceso de red y no contiene las dependencias React/Tailwind necesarias en caché. Por ello, no fue posible completar la instalación ni verificar la compilación o el renderizado en navegador. Ejecutar `npm install`, `npm run build` y `npm run dev` en un entorno con acceso al registro npm antes de considerar validada la entrega para producción.
