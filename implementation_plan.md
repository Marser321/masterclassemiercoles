# Plan de Integración: Reestructuración y Nuevas Ideas de AD Media Solution

Este plan de integración detalla la estrategia controlada para implementar el feedback masivo del cliente y reestructurar el sitio web de AD Media Solution sin romper el SEO actual, limpiando código obsoleto y organizando la arquitectura para la posterior intervención del modelo Opus 4.8.

---

## 14. Sesion Local con Anotador

<pending_approval_plan>
  <summary>
    Levantar el sitio en local para revisar el feedback visual con el anotador y ejecutar cambios concretos de forma controlada.
  </summary>

  <business_goal>
    <item>Convertir observaciones visuales del anotador en mejoras puntuales del sitio sin abrir una refactorizacion amplia.</item>
    <item>Acelerar el ciclo de decision: ver, anotar, corregir y validar en navegador local.</item>
  </business_goal>

  <read_only_context>
    <item>Proyecto Next.js con scripts `dev`, `build`, `lint` y auditorias Playwright.</item>
    <item>Worktree ya contiene cambios previos en multiples archivos y `implementation_plan.md` ya estaba modificado antes de esta sesion.</item>
  </read_only_context>

  <execution_scope>
    <item>Arrancar el servidor local con `npm run dev`, usando otro puerto si `3000` esta ocupado.</item>
    <item>Abrir el sitio en navegador local para que el anotador pueda marcar cambios concretos.</item>
    <item>Implementar solo los cambios explicitamente derivados de esas anotaciones.</item>
    <item>Validar cada ajuste con navegador y checks automaticos proporcionales al alcance.</item>
  </execution_scope>

  <guardrails>
    <item>No revertir cambios existentes del worktree que no pertenezcan a esta sesion.</item>
    <item>No tocar claims, metricas, testimonios, enlaces o assets sensibles sin instruccion concreta.</item>
    <item>No escribir secretos ni credenciales en codigo, prompts persistentes o archivos versionados.</item>
    <item>Mantener una tarea por vez: local, anotacion, implementacion y validacion.</item>
  </guardrails>

  <validation>
    <item>Verificar visualmente en navegador local la ruta afectada por cada anotacion.</item>
    <item>Ejecutar `npm run lint` y, si el cambio toca rutas o componentes criticos, `npm run build`.</item>
    <item>Declarar cualquier limitacion si una validacion externa o automatica no puede ejecutarse.</item>
  </validation>
</pending_approval_plan>

---

## 15. Feedback del Anotador: Sistema Comercial Animado

<pending_approval_plan>
  <source>Comentario visual sobre la seccion `#crm` en la home local.</source>

  <request>
    Recuperar el protagonismo de las animaciones SVG del CRM: flechas flotantes, diagrama animado y sensacion de sistema vivo, evitando que la seccion quede reducida a tarjetas planas.
  </request>

  <business_goal>
    <item>Hacer que la seccion explique visualmente como funciona el sistema comercial antes de que el usuario lea cada tarjeta.</item>
    <item>Reforzar percepcion premium y valor tecnologico del CRM con movimiento util, no decoracion gratuita.</item>
  </business_goal>

  <implementation_scope>
    <item>Reintegrar `CRMWorkflow` como visual principal dentro de `CRMSection`.</item>
    <item>Usar `GhlLogoBackground` o sus flechas SVG flotantes como capa ambiental visible sobre/detras del diagrama.</item>
    <item>Reducir el peso visual de las tarjetas actuales para que funcionen como leyenda o beneficios secundarios.</item>
    <item>Mantener la seccion en una sola pieza, pero con jerarquia clara: copy, diagrama animado, beneficios y CTA.</item>
    <item>Conservar responsive mobile/desktop y evitar overlaps entre textos, nodos y animaciones.</item>
  </implementation_scope>

  <guardrails>
    <item>No restaurar secciones completas antiguas si duplican contenido o rompen el flujo actual Home, VSL, Testimonios, CRM.</item>
    <item>No inventar metricas, resultados, integraciones o claims nuevos.</item>
    <item>Respetar preferencias de reduced motion donde los componentes ya lo soportan o donde se agregue movimiento infinito.</item>
    <item>No revertir cambios existentes ajenos a esta anotacion.</item>
  </guardrails>

  <validation>
    <item>Verificar `http://localhost:3000/#crm` en desktop y mobile con Playwright/headless si el navegador integrado no esta disponible.</item>
    <item>Ejecutar `lint` y `build` si el cambio afecta imports o estructura de componentes.</item>
  </validation>
</pending_approval_plan>

---

## 16. Feedback del Anotador: Flechas Centradas en Tarjeta CRM

<pending_approval_plan>
  <source>Comentario visual sobre el visual `CENTRO DE COMANDO COMERCIAL` dentro de `#crm`.</source>

  <request>
    Reposicionar las tres flechas SVG para que vuelvan a estar centradas en la parte superior de la tarjeta animada del CRM, funcionando como corona visual del diagrama y no como elemento desplazado hacia la derecha.
  </request>

  <business_goal>
    <item>Recuperar la composicion original que comunicaba crecimiento y niveles ascendentes directamente sobre el sistema comercial.</item>
    <item>Hacer que la animacion se perciba integrada al CRM, no flotando accidentalmente fuera del diagrama.</item>
  </business_goal>

  <implementation_scope>
    <item>Ajustar la posicion de `GhlLogoBackground` dentro de `CRMSection` para centrarlo horizontalmente sobre `CRMWorkflow`.</item>
    <item>Revisar tamaños desktop, tablet y mobile para evitar que tape el badge `Centro de comando comercial` o los nodos superiores.</item>
    <item>Mantener el diagrama como protagonista y conservar las tarjetas de leyenda debajo.</item>
  </implementation_scope>

  <guardrails>
    <item>No cambiar copy, beneficios, CTA ni estructura general de la seccion.</item>
    <item>No reemplazar el SVG ni crear assets nuevos.</item>
    <item>No tocar otras secciones de la home.</item>
  </guardrails>

  <validation>
    <item>Verificar `http://localhost:3000/#crm` en desktop y mobile con captura visual.</item>
    <item>Ejecutar ESLint si se edita JSX/TSX.</item>
  </validation>
</pending_approval_plan>

---

## 1. Fase de Limpieza e Higiene del Código (Código Viejo)

Antes de añadir nuevas funcionalidades, sanearemos el espacio de trabajo para evitar "ruido cognitivo" en los modelos de lenguaje:

### Archivos Temporales a Eliminar
*   Log de compilación y lint obsoletos: `build_log*.txt`, `lint*.json`, `lint*.txt`.

### Componentes Huérfanos
*   Identificar componentes no utilizados en `src/app/page.tsx` como `ProblemSection.tsx` y `ScannerSection.tsx`.
*   Moverlos a una carpeta temporal `src/components/archive/` en lugar de borrarlos definitivamente por si contienen código reutilizable.

---

## 2. Fase de Menú y Redirecciones (SEO)

### Estructura de Menú (10 Celdas)
Actualizar el componente [Navbar.tsx](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/src/components/layout/Navbar.tsx) e [IslandBar.tsx](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/src/components/layout/IslandBar.tsx) para incluir las siguientes 10 opciones de navegación estructuradas:
1.  **Inicio** (Home)
2.  **Sobre Nosotros** (Historia y Oficinas)
3.  **CRM & Automatización** (AD Media CRM)
4.  **Meta & Google Ads** (Tráfico y Conversión)
5.  **Redes Sociales** (Gestión de Contenido)
6.  **Desarrollo Web** (Sitios y E-commerce)
7.  **Comunidad** (Acceso y Eventos)
8.  **Casos de Éxito** (Danger Fernández)
9.  **Equipo** (Líderes de Media)
10. **Planificación** (Agendamiento de Citas)

### Redirecciones SEO (301)
*   Configurar redirecciones en `next.config.ts` para conservar el valor SEO de los enlaces antiguos indexados de `mediuso.com` (como catálogos o precios genéricos) apuntándolos a las nuevas secciones correspondientes (ej. `/catalogo-servicios` o planes específicos).

---

## 3. Fase de Rediseño y UI de la Página de Inicio (Home)

### Sección de Testimonios Dinámicos con Scroll (Concepto BTL)
*   **Diseño**: Se implementará un componente interactivo basado en Framer Motion donde, al hacer scroll, se alterne el diseño vertical: un testimonio a la izquierda y un bloque de texto descriptivo con flecha a la derecha, invirtiendo la posición en la siguiente sección.
*   **Optimización**: Las tarjetas de testimonio cargarán con placeholders difuminados para garantizar una carga ultrarrápida.

### Copys de Alta Conversión y Dirección Comercial
*   Actualizar [HeroSection.tsx](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/src/components/sections/HeroSection.tsx) con la propuesta de valor enfocada a escala de facturación ($30k, $40k, $50k, $100k USD).
*   Integrar de forma prominente el mensaje: *"Damos dirección de marketing y ventas a los negocios."*

### Widget Flotante y Pop-up de Agendamiento
*   **Widget Flotante**: Modificar el widget existente para incluir una llamada a la acción clara para agendar cita sin costo (enlazado a `/planificacion`).
*   **Pop-up de 5 segundos**: Desarrollar un componente de pop-up inteligente con retraso de 5 segundos que invite al usuario a agendar una cita con el copy *"Agenda tu cita ahora. Hay un cupón disponible."*

---

## 4. Fase de Creación de Páginas Internas

Se estructurarán las siguientes nuevas rutas utilizando el App Router de Next.js (`src/app/`):

### [NEW] `/planificacion` (Página de Consulta)
*   Contendrá un formulario de calificación de leads integrado con el calendario de citas.

### [NEW] `/danger` (Página de Danger Fernández)
*   Página enfocada en el perfil del CEO, compartiendo testimonios reales, capturas de chats reales, y un estilo más cercano y humano.

### [NEW] `/equipo` (Página de Equipo por Departamentos)
*   Estructura por departamentos (Dirección, Marketing, Comercial, Desarrollo).
*   Visualización coherente de fotos profesionales y sinopsis que refuercen la solidez del equipo ("Principales Líderes de la Media").

### [NEW] `/comunidad` (Comunidad de AD Media)
*   Integración de enlaces directos a la comunidad y galería de videos embebidos de eventos y masterclasses pasadas.

### [NEW] `/about-us` (Sobre Nosotros)
*   Narrativa de los 10 años de historia de la agencia.
*   Línea de tiempo visual con fotos de la 1ª oficina, 2ª oficina y las oficinas actuales.

### [NEW] `/servicios` (Catálogo Completo y Planes)
*   Desglose visual de servicios (Meta Ads, Google Ads, Redes Sociales, CRM, Sitios Web y Producción Audiovisual con fotos reales de los fotógrafos).
*   Tablas comparativas interactivas de planes según los datos extraídos del sitio actual.

---

## 5. Preparación para Opus 4.8 (Arquitectura y Tipos)

Para facilitar que el modelo de 1M de contexto implemente la lógica compleja de las páginas internas en la siguiente fase:
*   **Contratos de Datos**: Crear interfaces claras en `src/lib/types.ts` para testimonios, planes de precios, proyectos de galería, y perfiles de equipo.
*   **Estructuración del Estado**: Modularizar las configuraciones de los servicios en un archivo JSON común (`src/lib/data/servicesData.json`) de modo que tanto la Home como la página de servicios leer de la misma fuente de verdad.

---

## Plan de Verificación

### Pruebas Automatizadas
*   Ejecutar `npm run build` para asegurar la integridad de tipos y compilación de Next.js tras las limpiezas iniciales.
*   Ejecutar `npm run lint` para validar la calidad del código TypeScript.

### Verificación Manual
*   Revisar la correcta navegación y visualización de la barra de menú expandida en dispositivos móviles y de escritorio.

---

## 6. Auditoria de Rendimiento y Pendientes Aprobada

<approved_execution_plan>
  <summary>
    Primera pasada balanceada para corregir bloqueos tecnicos que impiden feedback confiable sin apagar el look premium del sitio.
  </summary>

  <baseline>
    <item>`next build` pasa con Next.js 16.1.6 y Turbopack.</item>
    <item>`tsc --noEmit` pasa sin errores.</item>
    <item>ESLint falla por un patron de rendimiento React en `VSLSection`.</item>
    <item>La auditoria estatica de motion falla en `GhlLogoBackground` por animaciones infinitas sin reduced motion.</item>
    <item>Playwright visual pasa 64/72; las fallas se concentran en la ausencia de `#servicios` dentro de la home.</item>
  </baseline>

  <implementation_scope>
    <item>Montar `ServicesSection` en `src/app/page.tsx` para restaurar el ancla `#servicios`, el CTA del hero y la navegacion inferior.</item>
    <item>Refactorizar `VSLSection.tsx` para evitar `setState` sincronico dentro de efectos, limpiar imports/vars sin uso y reemplazar el `img` del logo por `next/image`.</item>
    <item>Agregar `useReducedMotion` en `GhlLogoBackground.tsx` para que las animaciones infinitas queden estaticas cuando el usuario pide menos movimiento.</item>
    <item>Revisar `AnimatePresence mode="wait"` en componentes compartidos, priorizando `Button`, que genera warnings repetidos por multiples hijos.</item>
    <item>Limpiar warnings de lint que no cambian copy ni decisiones de contenido.</item>
  </implementation_scope>

  <out_of_scope>
    <item>No inventar testimonios, metricas, chats, videos, enlaces reales de comunidad ni cifras no verificadas.</item>
    <item>No eliminar el hero 3D en esta pasada; si despues del feedback sigue pesado, se difiere o degrada en mobile como fase posterior.</item>
    <item>No instalar Lighthouse ni analizadores de bundle en esta pasada.</item>
  </out_of_scope>

  <validation>
    <item>Usar el Node empaquetado de Codex porque el `npm` global local falla antes de ejecutar scripts.</item>
    <item>Validar TypeScript, ESLint, auditoria estatica de motion, build de Next y Playwright motion.</item>
    <item>Dejar corriendo `next dev` en `127.0.0.1` para anotaciones despues de validar.</item>
  </validation>
</approved_execution_plan>

---

## 13. Refinamiento de Home, Claims y Despliegue

<approved_execution_plan>
  <summary>
    Simplificar el sitio desplegado para reducir ruido visual, retirar claims no verificados y dejar una base mas limpia para los siguientes refinamientos de copy, portafolio, equipo y videos.
  </summary>

  <business_goal>
    <item>Reducir secciones repetitivas en la home para que el usuario entienda mejor el sistema comercial sin sentirse saturado.</item>
    <item>Mantener la prueba social real ya integrada: VSL optimizado, testimonios destacados y biblioteca `/casos`.</item>
    <item>Evitar promesas numericas o casos escritos no verificados hasta recibir datos reales del CEO.</item>
  </business_goal>

  <implementation_scope>
    <item>Reemplazar el bloque `CRMSection + BlueprintSection + ScrollytellingSection` por una unica seccion de sistema comercial/CRM.</item>
    <item>Retirar `ProjectsGallery` del flujo publico de la home porque contiene casos y metricas placeholder.</item>
    <item>Limpiar claims no verificados en `/danger`, `/servicios`, detalles de servicios y `/comunidad`.</item>
    <item>Eliminar assets no referenciados en `public/` que no aportan al despliegue final.</item>
    <item>Actualizar `.gitignore` para evitar subir carpetas fuente pesadas como `VSL/` y `Testimonios/`.</item>
  </implementation_scope>

  <guardrails>
    <item>No borrar ni mover fuentes originales grandes en esta pasada.</item>
    <item>No tocar `public/media/` porque contiene VSL y testimonios optimizados.</item>
    <item>No crear rutas nuevas ni cambiar la funcion de `/casos` como biblioteca oficial de testimonios.</item>
    <item>No romper la identidad premium; reducir repeticion de efectos, no apagar el sitio.</item>
  </guardrails>

  <validation>
    <item>Ejecutar lint y build con Node empaquetado si el `npm` global falla.</item>
    <item>Verificar home, `/casos`, `/danger`, `/servicios` y `/comunidad` en navegador local.</item>
    <item>Confirmar que el VSL sigue cargando solo bajo clic y que `/casos` conserva 18 testimonios.</item>
    <item>Comparar peso de `public/` antes/despues de limpiar assets no usados.</item>
  </validation>
</approved_execution_plan>

## 7. Feedback del Anotador: Home Directo a VSL

<browser_feedback_resolution>
  <source>Comentario sobre `section#servicios` en la home.</source>
  <request>Sacar la seccion "Lo que hacemos" del flujo principal y pasar directo a VSL.</request>
  <implementation_scope>
    <item>Eliminar `ServicesSection` de `src/app/page.tsx` sin tocar la pagina interna `/servicios`.</item>
    <item>Actualizar el CTA secundario del hero para navegar a `#vsl-masterclass`.</item>
    <item>Actualizar `IslandBar` para usar un item `VSL` en lugar del ancla removida `#servicios`.</item>
    <item>Actualizar la prueba de estabilidad de scroll para auditar `#vsl-masterclass`.</item>
  </implementation_scope>
</browser_feedback_resolution>

---

## 12. Integracion Profesional de VSL y Testimonios

<approved_execution_plan>
  <summary>
    Integrar el VSL real y una coleccion curada de testimonios optimizados para elevar prueba social sin penalizar velocidad de carga.
  </summary>

  <business_goal>
    <item>Reordenar la home para que el flujo principal sea Hero, VSL real, testimonios destacados y luego el resto del sitio.</item>
    <item>Reutilizar `/casos` como biblioteca completa de testimonios/casos para evitar URLs competidoras.</item>
    <item>Publicar solo videos optimizados en `public/media`, manteniendo los originales fuera del render publico.</item>
  </business_goal>

  <implementation_scope>
    <item>Sustituir el mockup de `VSLSection` por un reproductor real con poster, carga bajo clic y CTA a `/planificacion`.</item>
    <item>Rehacer `BTLTestimonialsSection` como franja curada de 6 a 8 testimonios con tarjetas ligeras y modal de reproduccion.</item>
    <item>Convertir `/casos` en libreria completa con filtros simples, grilla de videos optimizados y lightbox.</item>
    <item>Crear un registro tipado de videos con `id`, `client`, `category`, `duration`, `orientation`, `poster`, `videoSrc` y `featured`.</item>
    <item>Deduplicar `TEST_LFIVE_.mp4` y no inventar citas, metricas ni claims no verificados.</item>
  </implementation_scope>

  <asset_optimization>
    <item>Generar version web del VSL con `faststart`, poster y variante ligera mobile.</item>
    <item>Normalizar testimonios verticales a formato web, priorizando 720x1280, audio AAC y bitrate moderado.</item>
    <item>Generar posters por video para que la pagina cargue imagenes primero y MP4 solo bajo interaccion.</item>
  </asset_optimization>

  <validation>
    <item>Ejecutar `npm run lint` y `npm run build`.</item>
    <item>Verificar home y `/casos` en desktop/mobile con navegador.</item>
    <item>Confirmar que los MP4 no se descargan en carga inicial antes de interactuar.</item>
    <item>Probar VSL, testimonios destacados, lightbox, pausa/cierre y CTA a `/planificacion`.</item>
  </validation>
</approved_execution_plan>

## 8. Feedback del Anotador: Legibilidad del Footer

<browser_feedback_resolution>
  <source>Comentario sobre el `IslandBar` flotante en la parte inferior de la home.</source>
  <request>Evitar que la navegacion inferior bloquee la legibilidad del pie de pagina.</request>
  <implementation_scope>
    <item>Marcar el bloque legal del footer como zona de lectura sensible.</item>
    <item>Actualizar `IslandBar` para ocultarse cuando esa zona entra en viewport.</item>
    <item>Mantener la navegacion flotante intacta fuera del footer y sin alterar contenido legal ni CTAs.</item>
  </implementation_scope>
  <business_benefit>
    <item>Mejora la confianza al dejar visibles copyright, privacidad y terminos sin competir con controles flotantes.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 9. Feedback del Anotador: Centrado de Iconos del IslandBar

<browser_feedback_resolution>
  <source>Comentario sobre el item `Contacto` dentro del `IslandBar` inferior.</source>
  <request>Centrar cada icono correctamente dentro de su burbuja correspondiente.</request>
  <implementation_scope>
    <item>Eliminar el desplazamiento visual causado por `gap` cuando las etiquetas estan colapsadas.</item>
    <item>Dar a cada icono una celda fija con `items-center` y `justify-center`.</item>
    <item>Mantener las etiquetas desktop/mobile, pero con margen solo cuando son visibles.</item>
  </implementation_scope>
  <business_benefit>
    <item>La navegacion flotante se percibe mas precisa y premium, especialmente durante scroll cuando queda compacta.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 10. Feedback del Anotador: Tecnologias del Hero

<browser_feedback_resolution>
  <source>Comentario sobre el marquee `Plataformas conectadas` del hero.</source>
  <request>Quitar TikTok Ads y Google Ads; enfocar el stack en WhatsApp API, GoHighLevel, Meta Ads y tecnologias compatibles.</request>
  <implementation_scope>
    <item>Actualizar `LogoMarquee` para representar integraciones reales de CRM, WhatsApp, Meta y automatizacion.</item>
    <item>Eliminar del marquee las etiquetas `Google Ads` y `TikTok Ads`.</item>
    <item>Agregar tecnologias afines como OpenAI, Make, Calendly y Stripe sin inventar metricas ni claims.</item>
  </implementation_scope>
  <business_benefit>
    <item>El primer viewport comunica mejor el stack operativo que sostiene la promesa comercial del sitio.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 11. Feedback del Anotador: Quitar Meta CAPI

<browser_feedback_resolution>
  <source>Comentario sobre la tecnologia `Meta CAPI` dentro del marquee del hero.</source>
  <request>Quitar `Meta CAPI` porque no es una tecnologia reconocida por el equipo.</request>
  <implementation_scope>
    <item>Eliminar la etiqueta `Meta CAPI` de `LogoMarquee`.</item>
    <item>Limpiar el icono/import asociado para evitar codigo muerto.</item>
    <item>Mantener el resto del stack conectado sin agregar nuevas siglas no aprobadas.</item>
  </implementation_scope>
  <business_benefit>
    <item>Reduce friccion y mantiene el hero alineado con tecnologias que el equipo puede explicar con seguridad.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 12. Ejecucion Local para Feedback Visual

<local_visual_review_plan>
  <summary>
    Levantar el sitio en local para que el vibe pueda mostrar detalles visuales directamente sobre la experiencia en navegador.
  </summary>

  <implementation_scope>
    <item>Ejecutar el servidor de desarrollo de Next.js con `npm run dev`.</item>
    <item>Usar el puerto disponible que asigne Next.js, preferentemente `http://localhost:3000` si esta libre.</item>
    <item>Abrir o compartir la URL local para inspeccion visual y anotaciones.</item>
  </implementation_scope>

  <validation>
    <item>Confirmar que el servidor arranca sin errores criticos.</item>
    <item>Verificar que la home carga en navegador antes de recibir feedback visual.</item>
  </validation>

  <business_benefit>
    <item>Permite revisar detalles de marca, layout, legibilidad y conversion en contexto real antes de tocar codigo.</item>
  </business_benefit>
</local_visual_review_plan>

---

## 13. Feedback del Anotador: Popup como Banner Glass de Alta Conversion

<browser_feedback_resolution>
  <source>Comentario sobre el popup `CUPON DISPONIBLE` en la home local.</source>
  <request>Elevar el popup para que se perciba como un banner de cristal premium, con borde neon celeste vivo recorriendo el perimetro.</request>

  <implementation_scope>
    <item>Actualizar `src/components/ui/PromoPopup.tsx` manteniendo su logica actual de apertura, cierre y enlace a `/planificacion`.</item>
    <item>Reemplazar la tarjeta simple por un contenedor glass con capas de profundidad, transparencia, blur y reflejos sutiles.</item>
    <item>Agregar un borde neon celeste animado que recorra el popup usando Framer Motion/CSS sin introducir dependencias nuevas.</item>
    <item>Mejorar jerarquia visual del cupón, CTA y boton de cierre para que se sienta mas premium y orientado a conversion.</item>
    <item>Respetar legibilidad mobile/desktop y evitar que el efecto bloquee texto o acciones.</item>
  </implementation_scope>

  <validation>
    <item>Verificar en navegador local que el popup aparece, no muestra overlay de error y el borde animado se ve vivo.</item>
    <item>Revisar que el CTA `/planificacion` sigue funcionando y que el cierre persiste por `sessionStorage`.</item>
  </validation>

  <business_benefit>
    <item>Un popup premium reduce la sensacion de plantilla generica y aumenta la probabilidad de que el visitante perciba valor inmediato en la cita gratuita.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 14. Feedback del Anotador: CTA Hero no Centrado en Masterclass

<browser_feedback_resolution>
  <source>Comentario sobre el CTA secundario `Ver la masterclass` en el hero.</source>
  <request>Evitar que el sitio parezca pensado especificamente para masterclasses; el posicionamiento debe ser mas amplio y orientado a negocios, CRM, ventas y direccion de marketing.</request>

  <implementation_scope>
    <item>Actualizar el copy del CTA secundario en `src/components/sections/HeroSection.tsx` para quitar la palabra `masterclass`.</item>
    <item>Mantener el comportamiento de scroll hacia la seccion actual `#vsl-masterclass` para no romper navegacion ni pruebas existentes.</item>
    <item>Elegir un texto de accion mas transversal, por ejemplo `Ver como funciona`, `Ver la estrategia` o `Conocer el sistema`, alineado con la propuesta de direccion comercial.</item>
    <item>Revisar referencias visibles relacionadas con `VSL` o `masterclass` si aparecen en la primera pantalla y degradarlas a lenguaje de sistema, estrategia o diagnostico cuando corresponda.</item>
  </implementation_scope>

  <validation>
    <item>Verificar en navegador local que el hero ya no comunica un enfoque exclusivo de masterclass.</item>
    <item>Confirmar que el CTA secundario mantiene scroll correcto y que no aparece overlay de error.</item>
  </validation>

  <business_benefit>
    <item>El sitio se percibe como una solucion integral para direccionar marketing y ventas, no como una pagina de venta de una clase puntual.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 15. Auditoria de Ritmo Visual y Modo Celeste Experimental

<approved_execution_plan>
  <summary>
    Auditar y corregir espaciados, alturas, jerarquia tipografica y legibilidad en rutas publicas, agregando un cuarto modo visual `sky` para explorar una direccion mas celeste sin reemplazar los modos existentes.
  </summary>

  <implementation_scope>
    <item>Crear una auditoria visual Playwright para rutas publicas, breakpoints `390x844`, `430x932`, `768x1024`, `1440x900` y temas `classic`, `luxury`, `white`, `sky`.</item>
    <item>Reducir espaciados excesivos en mobile y tablet/desktop, priorizando home y rutas con `py-32`, `h-screen` o secciones largas.</item>
    <item>Agregar `.theme-sky` en los tokens globales como modo celeste profundo, con contraste legible y profundidad azul en bordes/detalles.</item>
    <item>Extender el toggle de `IslandBar` a `luxury`, `classic`, `sky`, `white`, manteniendo `classic` como fallback por defecto.</item>
    <item>Tratar `/logos` como revision publica basica, corrigiendo solo overflow o legibilidad evidente.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar `tsc --noEmit`.</item>
    <item>Ejecutar ESLint en archivos tocados.</item>
    <item>Ejecutar la auditoria visual nueva contra rutas, temas y breakpoints.</item>
    <item>Verificar manualmente home mobile en `classic`, `sky` y `white`, y rutas internas principales en mobile.</item>
  </validation>

  <business_benefit>
    <item>Mejora la sensacion premium y la claridad mobile, reduciendo fatiga por espaciados excesivos y permitiendo comparar una direccion celeste mas cercana a marca sin perder profundidad.</item>
  </business_benefit>
</approved_execution_plan>

---

## 16. Auditoria Total de Alineacion del Proyecto

<approved_execution_plan>
  <summary>
    Auditar el proyecto completo contra el feedback del CEO, el plan operativo existente, las rutas publicas y el estado tecnico/visual actual antes de continuar con nuevos redisenos.
  </summary>

  <source_of_truth>
    <item>`docs/CLIENT_FEEDBACK.md` como fuente primaria del pedido del CEO.</item>
    <item>`docs/CEO_TASKS_AND_OPUS_PROMPT.md` como consolidado de requerimientos y pendientes.</item>
    <item>`implementation_plan.md` como historial de decisiones, feedback del anotador y fases aprobadas.</item>
    <item>Codigo real en `src/app`, `src/components`, `src/lib/data` y `next.config.ts` como fuente del estado implementado.</item>
  </source_of_truth>

  <audit_scope>
    <item>Revisar Home, navegacion, popup, widget flotante, paginas internas, servicios, equipo, comunidad, Danger, About Us, planificacion, SEO y redirecciones.</item>
    <item>Cruzar cada requerimiento documentado contra la implementacion real y clasificarlo como `cumplido`, `parcial`, `faltante`, `bloqueado por contenido` o `requiere validacion visual`.</item>
    <item>Clasificar hallazgos por impacto de conversion, marca, contenido faltante, SEO, accesibilidad, responsive, performance y deuda tecnica.</item>
    <item>Confirmar que no se inventen testimonios, metricas, enlaces, fotos, casos o claims no respaldados.</item>
  </audit_scope>

  <validation>
    <item>Ejecutar TypeScript, ESLint, build de Next.js y auditorias Playwright existentes.</item>
    <item>Levantar el sitio localmente y revisar rutas publicas principales en mobile y desktop.</item>
    <item>Validar CTAs hacia `/planificacion`, anclas de Home, popup de cupon, widget flotante y legibilidad del footer.</item>
  </validation>

  <business_benefit>
    <item>Ordena el proyecto por impacto comercial antes de seguir invirtiendo en redisenos, reduciendo retrabajo y protegiendo conversion, marca y SEO.</item>
  </business_benefit>
</approved_execution_plan>

---

## 17. Registro de Claims Pendientes de Aprobacion

<approved_execution_plan>
  <summary>
    Mantener el impacto comercial visible del sitio, pero registrar todos los claims, testimonios, metricas, chats, enlaces, fotos y assets que requieren aprobacion del vibe/CEO antes de publicacion final.
  </summary>

  <credibility_guardrails>
    <item>No cambiar copy visible, layout, rutas, navegacion ni componentes en esta fase.</item>
    <item>No ocultar secciones ni degradar claims automaticamente; la decision editorial queda para una fase posterior.</item>
    <item>No marcar como aprobado ningun claim sin evidencia verificable en el repositorio o aprobacion explicita del vibe/CEO.</item>
    <item>Clasificar cada hallazgo como `aprobado`, `pendiente de evidencia`, `placeholder visible`, `enlace provisional`, `foto/asset provisional` o `claim comercial sensible`.</item>
  </credibility_guardrails>

  <source_of_truth>
    <item>`docs/CLIENT_FEEDBACK.md` como intencion comercial original.</item>
    <item>`docs/ALIGNMENT_AUDIT.md` como auditoria previa de riesgos de credibilidad.</item>
    <item>Codigo visible en rutas publicas bajo `src/app` y secciones compartidas bajo `src/components`.</item>
  </source_of_truth>

  <implementation_scope>
    <item>Crear `docs/CLAIMS_APPROVAL_REGISTER.md` con matriz por ruta publica, ubicacion, claim visible, tipo de riesgo, evidencia actual, estado y accion requerida.</item>
    <item>Revisar Home, Danger, Casos, Servicios, Equipo, Comunidad, About Us, Planificacion y paginas de detalle de servicios.</item>
    <item>Registrar como sensibles cifras tipo `$80K`, `4.2x ROI`, `+45%`, textos de `casos reales`, `testimonios reales`, claims de partners/certificaciones, chats simulados, enlaces genericos de WhatsApp, videos sin URL real y assets/fotos provisionales.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar TypeScript, ESLint directo con Node empaquetado, build de Next.js, auditoria estatica motion y Playwright motion/rhythm.</item>
    <item>Confirmar que no se haya cambiado la UI publica ni la navegacion.</item>
    <item>Confirmar que no quede servidor local corriendo al finalizar.</item>
  </validation>

  <business_benefit>
    <item>Permite sostener conversion y presencia premium mientras se reduce riesgo reputacional, comercial y operativo mediante trazabilidad de aprobaciones pendientes.</item>
  </business_benefit>
</approved_execution_plan>

---

## 18. Auditoria SEO y Fondos Narrativos

<approved_execution_plan>
  <summary>
    Auditar todas las rutas publicas desde SEO, claridad comercial y coherencia narrativa de fondos antes de redisenar secciones adicionales.
  </summary>

  <seo_visual_guardrails>
    <item>No cambiar UI publica, copy visible, navegacion, claims ni componentes en esta fase.</item>
    <item>Tratar cada fondo como una capa comunicativa: debe reforzar lo que la seccion explica, no operar solo como decoracion generica.</item>
    <item>Priorizar la tesis comercial del proyecto: direccion de marketing y ventas, conversion a cita, CRM, pauta, soporte y confianza visual.</item>
    <item>No proponer claims, metricas, testimonios, fotos, partners, certificaciones o casos nuevos sin evidencia o aprobacion futura del vibe/CEO.</item>
    <item>Separar hallazgos SEO tecnicos, SEO de contenido, narrativa visual, credibilidad y deuda de implementacion para facilitar fases atomicas posteriores.</item>
  </seo_visual_guardrails>

  <source_of_truth>
    <item>Documentacion oficial de Google Search Central para expectativas SEO base.</item>
    <item>`src/app/layout.tsx`, `next.config.ts` y rutas bajo `src/app` para el estado SEO real.</item>
    <item>`src/components/backgrounds`, `src/components/sections` y assets en `public` para evaluar fondos, imagenes y narrativa visual.</item>
    <item>`docs/ALIGNMENT_AUDIT.md` y `docs/CLAIMS_APPROVAL_REGISTER.md` para no duplicar riesgos ya trazados.</item>
  </source_of_truth>

  <audit_scope>
    <item>Crear `docs/SEO_VISUAL_NARRATIVE_AUDIT.md` con matriz por ruta y seccion publica.</item>
    <item>Definir para cada ruta que deberia comunicar a SEO y al usuario: intencion, oferta, prueba, CTA y riesgo actual.</item>
    <item>Identificar fondos que se sienten genericos, demasiado AI-like, desconectados del contenido o insuficientemente utiles para explicar valor.</item>
    <item>Listar que conviene remover, ajustar o reforzar antes de seguir redisenando cada seccion.</item>
    <item>Priorizar mejoras por conversion, SEO, marca, credibilidad, accesibilidad/performance y operacion.</item>
  </audit_scope>

  <validation>
    <item>Confirmar que esta fase solo modifica documentacion operativa.</item>
    <item>Verificar que el registro cubra Home, Danger, Casos, Servicios, detalles de servicios, Equipo, Comunidad, About Us, Planificacion y Logos.</item>
    <item>Confirmar que no quede servidor local corriendo tras la revision.</item>
  </validation>

  <business_benefit>
    <item>Reduce retrabajo visual, fortalece SEO y convierte los fondos en soporte de venta, ayudando a que cada centimetro del sitio explique direccion, confianza y proxima accion.</item>
  </business_benefit>
</approved_execution_plan>

---

## 19. SEO Tecnico P0: Rastreo, Metadata y Canonicals

<approved_execution_plan>
  <summary>
    Implementar la primera fase tecnica derivada de la auditoria SEO: hacer que cada ruta publica principal tenga seniales claras para buscadores sin cambiar la UI visible.
  </summary>

  <seo_guardrails>
    <item>No cambiar copy visible, layout, navegacion, fondos, claims ni CTAs en esta fase.</item>
    <item>No inventar datos estructurados de direccion fisica, telefono, reviews, premios, certificaciones, partners o resultados no aprobados.</item>
    <item>Usar titulos y descripciones sobrios, alineados a la tesis comercial real: direccion de marketing y ventas, CRM, pauta, soporte, contenido, web y planificacion.</item>
    <item>Preservar URLs actuales; cualquier cambio de slug queda fuera de esta fase y requiere aprobacion separada con redirects.</item>
    <item>Tratar `/logos` como ruta de exploracion interna: aplicar `noindex` si el vibe confirma que no debe competir con paginas comerciales.</item>
  </seo_guardrails>

  <implementation_scope>
    <item>Crear `src/app/sitemap.ts` con rutas publicas canonicas y detalles de servicios actuales.</item>
    <item>Crear `src/app/robots.ts` enlazando al sitemap y permitiendo crawl general del sitio publico.</item>
    <item>Agregar metadata por ruta en Home, Servicios, Planificacion, Danger, Casos, Equipo, Comunidad, About Us y Logos.</item>
    <item>Agregar metadata dinamica en `src/app/servicios/[slug]/page.tsx` usando datos reales de `src/lib/data/servicesData.json`.</item>
    <item>Agregar `alternates.canonical` por ruta para reforzar URLs principales.</item>
    <item>Mantener OG/Twitter con assets existentes, sin crear imagenes nuevas ni claims visuales nuevos.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar `tsc --noEmit` con el Node disponible.</item>
    <item>Ejecutar ESLint directo con el Node empaquetado si el `npm` local sigue fallando.</item>
    <item>Ejecutar `next build`.</item>
    <item>Verificar que `/sitemap.xml` y `/robots.txt` se generen en build o respondan en dev.</item>
    <item>Confirmar que la UI publica no cambie visualmente por ser cambios de metadata/routing SEO.</item>
    <item>Confirmar que no quede servidor local corriendo al finalizar.</item>
  </validation>

  <business_benefit>
    <item>Mejora rastreo, claridad de intencion por pagina y preservacion SEO sin distraer la fase visual; ayuda a que Google y usuarios entiendan que cada ruta tiene una funcion comercial distinta.</item>
  </business_benefit>
</approved_execution_plan>

---

## 20. Fondos Narrativos P1: Sistema Comercial y Produccion

<pending_vibe_approval status="superseded" superseded_by="26-27">
  <superseded_note>
    Esta fase quedo cubierta por la integracion de video (secciones 26 y 27). `RevenueSystemMap`
    y `ProductionPipeline` nunca se construyeron y sus puntos de aplicacion ya no existen: el
    Hero (target de `RevenueSystemMap`) ahora usa el video de marca, y los fondos por tab de
    Servicios (target de `ProductionPipeline`, antes `ConstellationField`) fueron reemplazados
    por un unico `VideoBackground`. No se construiran estos componentes. Bloque conservado como
    historial de decision (refine-not-delete).
  </superseded_note>
  <summary>
    Implementar el primer paquete visual de fondos narrativos sin tocar claims sensibles: Hero/Footer como sistema comercial y Servicios de contenido/produccion como pipeline real de trabajo.
  </summary>

  <visual_guardrails>
    <item>No modificar copy visible, testimonios, metricas, casos, chats, partners, certificaciones ni enlaces provisionales.</item>
    <item>No hacer mas persuasivas las secciones bloqueadas por evidencia: BTL, ProjectsGallery, Casos, Danger y Authority quedan fuera salvo reduccion visual de riesgo.</item>
    <item>Usar fondos SVG/React deterministas, accesibles a reduced motion y compatibles con el contrato `ContextBackgroundProps`.</item>
    <item>Mantener `AuroraBackground` y `FloatingIcons` como capas secundarias cuando aporten profundidad, no como narrativa principal.</item>
    <item>Evitar imagenes generadas o stock-like; si no hay asset real, usar diagramas abstractos funcionales que comuniquen proceso.</item>
  </visual_guardrails>

  <implementation_scope>
    <item>Crear `RevenueSystemMap` para representar pauta/contenido, CRM, agenda, soporte y venta convergiendo hacia direccion comercial.</item>
    <item>Aplicar `RevenueSystemMap` en `HeroSection.tsx` y ajustar el fondo del footer para reforzar la cita/diagnostico como siguiente accion.</item>
    <item>Crear `ProductionPipeline` para representar guion, grabacion, edicion, calendario, publicacion y aprendizaje por canal.</item>
    <item>Remapear los tabs `social-media` y `production` en `src/app/servicios/page.tsx` para usar `ProductionPipeline` en vez de `ConstellationField`.</item>
    <item>Mantener CRM, Ads, Web, Mantenimiento, Equipo, Comunidad, About Us y Planificacion con sus fondos actuales salvo ajustes menores de opacidad/legibilidad.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar TypeScript, ESLint directo con Node empaquetado y `next build`.</item>
    <item>Ejecutar auditoria estatica de motion y Playwright motion/rhythm si sigue disponible.</item>
    <item>Revisar screenshots desktop/mobile de Home, Servicios y Planificacion para confirmar que los fondos no compitan con el texto.</item>
    <item>Verificar reduced motion y que no se introduzcan loops no pausables.</item>
    <item>Confirmar que no quede servidor local corriendo al finalizar.</item>
  </validation>

  <business_benefit>
    <item>Convierte las secciones de mayor conversion en explicaciones visuales del sistema comercial, corrigiendo fondos genericos sin aumentar riesgo reputacional por claims no aprobados.</item>
  </business_benefit>
</pending_vibe_approval>

---

## 29. Feedback del Anotador: Auditoria de Contraste por Modos de Color

<pending_vibe_approval>
  <summary>
    Auditar y corregir los problemas de legibilidad que aparecen al cambiar al modo blanco desde el `IslandBar`, cubriendo CTAs de planes, navegacion global, badges/eyebrows y textos introductorios sobre fondos claros o de video.
  </summary>

  <contrast_guardrails>
    <item>No cambiar copy, precios, planes, tabs, rutas, CTAs ni comportamiento de navegacion.</item>
    <item>No eliminar los modos `luxury`, `classic`, `sky` o `white`; solo estabilizar su contraste.</item>
    <item>Priorizar botones, tarjetas, navegacion, badges de orientacion, bajadas introductorias y controles donde el usuario decide, navega o convierte.</item>
    <item>Mantener la estetica premium de vidrio, pero sin sacrificar lectura en fondos claros.</item>
    <item>Evitar fixes aislados que mejoren un tema y rompan otro.</item>
  </contrast_guardrails>

  <implementation_scope>
    <item>Corregir el CTA secundario de `PlanCard` en `src/app/servicios/page.tsx`, que hoy usa `bg-muted text-foreground` y queda poco legible en modo blanco.</item>
    <item>Corregir links desktop de `src/components/layout/Navbar.tsx`, que hoy usan `text-muted-foreground` sobre navbar transparente y pierden contraste en paginas como `/comunidad`.</item>
    <item>Revisar dropdown de Servicios en `Navbar`, asegurando que sus items tengan fondo y texto legibles en modo blanco y modo sky.</item>
    <item>Revisar el menu mobile de `Navbar` para que los links y sublinks mantengan contraste sobre `bg-background/95` en todos los modos.</item>
    <item>Revisar `IslandBar` como control de cambio de modo para asegurar que sus botones sigan siendo distinguibles en modos claros.</item>
    <item>Revisar el contraste de los tabs de servicios y tarjetas de planes en `theme-white`, `theme-sky`, `theme-classic` y modo base.</item>
    <item>Corregir badges/eyebrows de seccion como `AD Media Community` y `Biblioteca de Workshops` en `src/app/comunidad/page.tsx`, que hoy usan `text-primary` con fondos muy transparentes.</item>
    <item>Corregir la bajada del hero de `/comunidad` (`Grupo privado de WhatsApp...`) que hoy usa `text-muted-foreground` y pierde contraste sobre el video en casi todos los modos.</item>
    <item>Crear o aplicar una utilidad reusable para textos introductorios sobre fondos visuales, con color, opacidad y sombra ajustados por tema.</item>
    <item>Crear o aplicar una utilidad reusable para badges contrastados, evitando repetir combinaciones fragiles de `text-primary bg-primary/10` en headers internos.</item>
    <item>Revisar los badges equivalentes en paginas principales (`/servicios`, `/planificacion`, `/about-us`, `/equipo`, `/danger`) sin cambiar copy ni estructura.</item>
    <item>Revisar patrones equivalentes de botones secundarios en `/planificacion`, especialmente `bg-muted text-foreground`.</item>
    <item>Si corresponde, agregar clases o utilidades tematicas especificas en `globals.css` para botones secundarios y badges sobre fondos claros.</item>
    <item>Mantener los CTAs primarios en azul de marca con texto blanco.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint sobre los archivos tocados.</item>
    <item>Verificar visualmente `/servicios?tab=web-development` en modo blanco: botones `Seleccionar Plan`, cards, tabs y texto deben ser legibles.</item>
    <item>Verificar visualmente `/comunidad` en modo blanco y sky: `Navbar` desktop debe ser legible antes y despues de scroll.</item>
    <item>Verificar visualmente `/comunidad` en modo blanco y sky: `AD Media Community`, la bajada `Grupo privado de WhatsApp...`, `Acceso Privado Exclusivo` y `Biblioteca de Workshops` deben ser legibles sobre el video.</item>
    <item>Verificar una pagina adicional con badge similar (`/servicios` o `/planificacion`) para confirmar que la utilidad reusable no rompe la estetica.</item>
    <item>Verificar dropdown de Servicios en desktop y menu mobile de `Navbar` en modo claro.</item>
    <item>Verificar rapidamente los otros modos desde el `IslandBar` para confirmar que no se degradan CTAs ni tabs.</item>
    <item>Verificar mobile en `/servicios?tab=web-development` para asegurar que los cambios no generen overflow ni solapes.</item>
    <item>Confirmar que no aparezcan errores de consola ni overlay de Next.</item>
  </validation>

  <business_benefit>
    <item>Protege la conversion en la pagina de planes: si el usuario cambia de vibe visual, los botones de seleccion siguen siendo claros, clicables y confiables.</item>
  </business_benefit>
</pending_vibe_approval>

---

## 28. Feedback del Anotador: Encaje Profesional de Imagen en Popup

<pending_vibe_approval>
  <summary>
    Ajustar el popup de diagnostico para que la imagen `ad-media-diagnostic-glass.png` se vea completa, proporcionada y mas profesional dentro del modal.
  </summary>

  <visual_guardrails>
    <item>No cambiar copy, CTA, delay de apertura, destino de agenda ni comportamiento de cierre del popup.</item>
    <item>No reemplazar la imagen ni generar claims nuevos.</item>
    <item>Evitar recortes visibles del asset cuadrado `1254x1254` causados por el contenedor horizontal y `object-cover`.</item>
    <item>Mantener el look premium glassmorphism, brillo azul y jerarquia visual actual.</item>
  </visual_guardrails>

  <implementation_scope>
    <item>Actualizar `src/components/ui/PromoPopup.tsx` para que el contenedor de imagen use una proporcion compatible con el asset cuadrado.</item>
    <item>Cambiar el ajuste de imagen de recorte agresivo a encaje controlado, preservando fondo, borde y overlay.</item>
    <item>Revisar espaciados internos y altura maxima del modal para que siga entrando bien en desktop y mobile.</item>
    <item>Asegurar que la etiqueta `Sistema Comercial` quede integrada sin tapar partes importantes de la imagen.</item>
  </implementation_scope>

  <validation>
    <item>Verificar en navegador local que el popup renderiza sin imagen cortada en el viewport actual `1967x1215`.</item>
    <item>Verificar al menos un viewport mobile para confirmar que el modal no queda demasiado alto ni pierde el CTA.</item>
    <item>Confirmar que no aparezcan errores de consola ni overlay de Next.</item>
  </validation>

  <business_benefit>
    <item>Un popup mas pulido mejora la percepcion de calidad en el primer punto de conversion y evita que el diagnostico gratis se vea como una pieza improvisada.</item>
  </business_benefit>
</pending_vibe_approval>

---

## 27. Ejecucion Local para Feedback Real

<pending_vibe_approval>
  <summary>
    Levantar el sitio en entorno local para que el vibe pueda revisar la experiencia real en navegador y priorizar mejoras con feedback visual directo.
  </summary>

  <execution_guardrails>
    <item>No editar componentes, copy, estilos, rutas ni configuracion durante esta fase.</item>
    <item>No escribir secretos, tokens, API keys ni credenciales en archivos versionados o prompts persistentes.</item>
    <item>Si el puerto 3000 esta ocupado, usar el siguiente puerto libre y comunicar la URL exacta.</item>
    <item>Separar ejecucion local, verificacion visual y cambios posteriores en fases distintas.</item>
  </execution_guardrails>

  <implementation_scope>
    <item>Detectar el comando local correcto desde `package.json`.</item>
    <item>Arrancar `npm run dev` para servir la app Next.js en local.</item>
    <item>Abrir la URL local en navegador para comprobar que la home renderiza y queda lista para feedback.</item>
    <item>Registrar errores visibles de consola o compilacion si aparecen, sin corregirlos hasta nueva aprobacion.</item>
  </implementation_scope>

  <validation>
    <item>Confirmar que el servidor responde en navegador.</item>
    <item>Verificar que la pagina principal carga sin pantalla en blanco.</item>
    <item>Dejar el servidor corriendo mientras el vibe revisa y comenta.</item>
  </validation>

  <business_benefit>
    <item>Permite evaluar la propuesta comercial como la veria un prospecto real, reduciendo decisiones abstractas y acelerando iteraciones de conversion.</item>
  </business_benefit>
</pending_vibe_approval>

---

## 27. Integracion de Videos en Comunidad, Servicios y Sobre Nosotros

<approved_execution_plan>
  <summary>
    Integrar los videos provistos como fondos visuales premium en `/comunidad`, `/servicios` y el hito `2027+` de `/about-us`, sin cambiar copy ni estructura comercial.
  </summary>

  <visual_guardrails>
    <item>Mantener copy, CTAs, navegacion, datos comerciales y flujo de cada pagina.</item>
    <item>Usar los videos como capas ambientales con overlays suficientes para priorizar lectura y accion.</item>
    <item>Respetar reduced motion: no montar ni reproducir video si el usuario pide menos movimiento.</item>
    <item>Conservar los fondos contextuales por tab en Servicios como textura secundaria sobre el video base.</item>
    <item>Preservar los cambios locales previos del hero principal y no revertir archivos ajenos.</item>
  </visual_guardrails>

  <implementation_scope>
    <item>Copiar `comunidad.mp4`, `SERVICIOS.mp4` y `Futuro e integracion 2027.mp4` a `public/videos/` con nombres ASCII.</item>
    <item>Generar posters JPG para carga inicial y fallback estatico.</item>
    <item>Crear un componente reutilizable de video background con autoplay, muted, loop, playsInline, preload metadata, poster y fallback reduced motion.</item>
    <item>Usar el video de Comunidad como fondo full-bleed del header, manteniendo `PresenceField` suavizado.</item>
    <item>Usar el video de Servicios como fondo base y conservar `ServiceBackground` por tab con menor opacidad.</item>
    <item>Extender el milestone 2027+ para renderizar video cuando tenga `videoUrl`, reemplazando solo la imagen generica de futuro.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint sobre archivos tocados.</item>
    <item>Ejecutar TypeScript y build de Next.js.</item>
    <item>Verificar `/comunidad`, `/servicios` y `/about-us` en desktop/mobile y reduced motion: videos o posters correctos, textos legibles, sin controles ni errores de consola.</item>
  </validation>

  <business_benefit>
    <item>Eleva la percepcion visual de las paginas internas con piezas de marca propias, mostrando comunidad, servicios e integracion futura de forma mas directa y profesional.</item>
  </business_benefit>
</approved_execution_plan>

---

## 22. Integracion Profesional del Equipo 2026

<team_page_integration_plan status="approved_by_vibe">
  <summary>
    Reemplazar los perfiles placeholder de `/equipo` por miembros reales con foto, ordenados como CEO, damas y chicos, manteniendo una narrativa profesional, verificable y coherente con la operacion de AD Media Solution.
  </summary>

  <content_guardrails>
    <item>No inventar metricas, certificaciones, partners, resultados garantizados ni claims comerciales sensibles.</item>
    <item>Usar los nombres y roles inferidos de los archivos de `/Users/mariomorera/Downloads/EQUIPO 2026/` como fuente de verdad inicial.</item>
    <item>Publicar solo miembros reales y remover placeholders o proximas incorporaciones.</item>
    <item>Mantener el orden editorial aprobado: CEO primero, luego damas, luego chicos, con prioridad interna por rol senior.</item>
  </content_guardrails>

  <implementation_scope>
    <item>Copiar fotos reales a `public/team/equipo-2026/` con nombres ASCII limpios.</item>
    <item>Actualizar el dataset local de `src/app/equipo/page.tsx` con bios sobrias, fortalezas/tareas e iconos por rol.</item>
    <item>Renderizar fotos reales para todos los miembros en desktop y mobile.</item>
    <item>Corregir el calculo del carrusel horizontal para depender del numero real de integrantes.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint y build de Next.js.</item>
    <item>Levantar `npm run dev` y validar `/equipo` en desktop y mobile.</item>
    <item>Confirmar que todas las fotos cargan, no hay superposiciones y el carrusel llega al ultimo miembro.</item>
  </validation>

  <business_benefit>
    <item>Eleva la confianza visual y comercial de la pagina de equipo mostrando personas reales, responsabilidades claras y una estructura operativa creible.</item>
  </business_benefit>
</team_page_integration_plan>

---

## 23. Feedback del Anotador: Remover Especializacion por Nicho

<browser_feedback_resolution status="approved_by_browser_comment">
  <source>Comentario sobre la seccion `Personalizacion Absoluta / Especializacion por Nicho` en `/servicios`.</source>
  <request>Sacar esta seccion del flujo publico de la pagina de servicios.</request>

  <implementation_scope>
    <item>Eliminar de `src/app/servicios/page.tsx` el bloque general de nichos con el titular `Especializacion por Nicho` y la frase `Un YouTube para cada persona`.</item>
    <item>Mantener intactos los planes, tabs, detalles condicionales de `social-media` y `marketing-ads`, footer, navegacion y CTAs.</item>
    <item>Evitar dejar margen vertical innecesario entre el contenido de servicios y el footer.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint sobre `src/app/servicios/page.tsx`.</item>
    <item>Ejecutar build de Next.js.</item>
    <item>Verificar visualmente `/servicios` para confirmar que la seccion ya no aparece y el footer sube correctamente.</item>
  </validation>

  <business_benefit>
    <item>Reduce ruido editorial y elimina un claim/frase no aprobada, manteniendo la pagina enfocada en planes, servicios y conversion a cita.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 24. Feedback del Anotador: Imagen Glass para Popup de Diagnostico

<browser_feedback_resolution status="approved_by_browser_comment">
  <source>Comentario sobre el popup de Home y asset provisto en `/Users/mariomorera/Desktop/fondos ad media solution/carpeta sin título/ChatGPT Image 3 jun 2026, 10_07_14 p.m..png`.</source>
  <request>Integrar la imagen en el popup, manteniendo sensacion de banner de vidrio, borde cristal animado y copy mas enfocado a vender servicios.</request>

  <implementation_scope>
    <item>Copiar el asset a `public/popups/` con nombre ASCII limpio.</item>
    <item>Actualizar `src/components/ui/PromoPopup.tsx` para usar la imagen como visual principal del popup sin sobrecargarlo.</item>
    <item>Cambiar el copy de cupón generico a diagnostico de servicios: CRM, Ads, WhatsApp, agenda y ventas.</item>
    <item>Mantener cierre, delay, sessionStorage, CTA a `/planificacion`, reduced motion y borde neon animado.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint sobre `PromoPopup.tsx`.</item>
    <item>Ejecutar TypeScript y build de Next.js.</item>
    <item>Verificar visualmente el popup en Home desktop/mobile confirmando imagen cargada, copy legible y sin overflow.</item>
  </validation>

  <business_benefit>
    <item>Convierte el popup en una pieza mas visual y orientada a diagnostico comercial, mostrando de un vistazo el sistema que vende AD Media Solution antes de pedir la cita.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 25. Feedback del Anotador: Legibilidad de Resultados que Damos

<browser_feedback_resolution status="approved_by_browser_comment">
  <source>Comentario sobre `section#estrategia` en Home.</source>
  <request>Repensar la seccion para aumentar tamanos, opacidades y legibilidad general.</request>

  <implementation_scope>
    <item>Actualizar `src/components/sections/ScrollytellingSection.tsx` para reforzar jerarquia del titular, descripcion, bloque de proceso y tarjetas KPI.</item>
    <item>Aumentar contraste/opacidad de textos secundarios, bordes, fondos de tarjetas y elementos de proceso.</item>
    <item>Reducir la competencia visual del fondo narrativo mediante overlays internos y mejor profundidad sin removerlo.</item>
    <item>Mantener el contenido, CTAs, animaciones principales y navegacion hacia `/planificacion`.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint sobre `ScrollytellingSection.tsx`.</item>
    <item>Ejecutar TypeScript y build de Next.js.</item>
    <item>Verificar visualmente Home desktop/mobile para confirmar lectura clara y sin solapes.</item>
  </validation>

  <business_benefit>
    <item>Mejora la capacidad de escaneo de la propuesta comercial y hace mas evidente el valor: CRM, soporte, marketing y ventas conectados para facturar mas.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 26. Integracion de Video en Hero Principal

<approved_execution_plan>
  <summary>
    Reemplazar el nucleo 3D del hero principal de Home por el video `AD_Media_Solution_logo_waves_202606032158.mp4`, manteniendo legibilidad, rendimiento y fallback estatico.
  </summary>

  <visual_guardrails>
    <item>No cambiar copy, CTAs, navegacion, popup, claims ni estructura comercial del hero.</item>
    <item>Usar el video como capa ambiental premium, detras del contenido y con overlays para que el H1 siga siendo protagonista.</item>
    <item>Respetar reduced motion: no reproducir video si el usuario pide menos movimiento.</item>
    <item>Conservar AuroraBackground y LogoMarquee como soporte visual secundario.</item>
  </visual_guardrails>

  <implementation_scope>
    <item>Copiar el MP4 a `public/hero/ad-media-logo-waves.mp4`.</item>
    <item>Generar poster `public/hero/ad-media-logo-waves-poster.jpg` para carga inicial y fallback.</item>
    <item>Remover import/render de `OrbitalCore` en `HeroSection.tsx`.</item>
    <item>Agregar capa de video con `autoplay`, `muted`, `loop`, `playsInline`, `preload=metadata`, poster y opacidad responsive.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar ESLint sobre `HeroSection.tsx`.</item>
    <item>Ejecutar TypeScript y build de Next.js.</item>
    <item>Verificar Home desktop/mobile: video visible sin controles, copy legible, reduced motion con poster y sin errores de consola.</item>
  </validation>

  <validation_follow_up>
    <item>Si reduced motion revela diferencias de hidratacion en animaciones compartidas, estabilizar la lectura de `prefers-reduced-motion` despues del primer montaje sin cambiar copy ni estructura comercial.</item>
    <item>Validar que el fallback estatico del hero permanezca activo y que no aparezca overlay de errores en mobile/reduced motion.</item>
  </validation_follow_up>

  <business_benefit>
    <item>Da un primer impacto mas propio de marca y reduce dependencia del canvas 3D, usando un asset visual directo de AD Media Solution.</item>
  </business_benefit>
</approved_execution_plan>

---

## 21. Semantica SEO y QA Visual de Claims

<pending_vibe_approval>
  <summary>
    Corregir hallazgos puntuales de la auditoria visual local que afectan SEO, accesibilidad y confianza: heading principal de Danger y metricas animadas que pueden capturarse en valores intermedios.
  </summary>

  <semantic_guardrails>
    <item>No cambiar copy visible, estilo visual, layout, claims, rutas, fondos ni navegacion en esta fase.</item>
    <item>No aprobar metricas sensibles; solo evitar que la UI o capturas automaticas muestren valores transitorios ambiguos.</item>
    <item>Mantener el impacto visual actual, pero mejorar la semantica HTML y la estabilidad de QA.</item>
    <item>Aplicar cambios de bajo riesgo y verificables: headings, props de contador o configuracion de animacion.</item>
  </semantic_guardrails>

  <implementation_scope>
    <item>Cambiar el titulo principal de `AuthoritySection.tsx` de `motion.h2` a `motion.h1`, preservando clases y apariencia.</item>
    <item>Evaluar `AnimatedCounter.tsx` para permitir un modo `stableOnFirstPaint` o equivalente en claims sensibles.</item>
    <item>Usar el modo estable en `src/app/casos/page.tsx` para evitar capturas con valores intermedios como `$56K` cuando el claim final esperado es `$80K`.</item>
    <item>Revisar usos existentes en Scrollytelling y detalles de servicios para no romper animaciones aceptadas.</item>
  </implementation_scope>

  <validation>
    <item>Ejecutar TypeScript, ESLint directo con Node empaquetado y `next build`.</item>
    <item>Levantar localmente y confirmar que `/danger` expone un `h1` detectable.</item>
    <item>Capturar `/casos` y confirmar que las metricas sensibles no quedan en valores intermedios durante QA visual.</item>
    <item>Confirmar que no cambie la apariencia percibida salvo estabilidad de contador.</item>
    <item>Confirmar que no quede servidor local corriendo al finalizar.</item>
  </validation>

  <business_benefit>
    <item>Mejora la legibilidad para buscadores y reduce riesgos de confianza en screenshots, auditorias y revisiones comerciales sin alterar la propuesta visible.</item>
  </business_benefit>
</pending_vibe_approval>
