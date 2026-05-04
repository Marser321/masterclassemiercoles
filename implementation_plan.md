# Implementation Plan: Auditorias De Refinamiento Motion/Parallax

<vibe_coding_protocol>
  <reasoning_before_action>
    Este plan debe aprobarse explicitamente antes de mutar componentes, scripts,
    dependencias o documentacion adicional del repositorio.
  </reasoning_before_action>

  <business_goal>
    Reducir parpadeos visuales en fondos parallax y convertir la estabilidad de
    motion en una practica auditable antes de publicar cambios.
  </business_goal>

  <security>
    No se escribiran tokens, API keys, PITs ni secretos en codigo, commits,
    prompts persistentes o archivos versionados.
  </security>
</vibe_coding_protocol>

## Fase 1: Auditoria Operativa

- Crear `docs/refinement-audits/motion-parallax.md` con guardrails XML para motion estable.
- Documentar que se revisa, por que importa y como beneficia al negocio: menos regresiones visuales, mayor calidad percibida y validacion repetible.
- Definir comandos locales para ejecutar la auditoria sin depender todavia de CI.

## Fase 2: Auditoria Automatica

- Agregar `@playwright/test` como dependencia de desarrollo para validacion visual.
- Agregar scripts en `package.json`:
  - `audit:motion:static`
  - `audit:motion:visual`
  - `audit:motion`
- Crear `scripts/audit-motion-parallax.mjs` para detectar patrones de riesgo:
  - conflicto entre `style.y`/MotionValue y `animate.y` en el mismo `motion.*`;
  - blur pesado en capas con loops infinitos;
  - `repeat: Infinity` sin manejo de reduced motion;
  - capas absolutas/parallax sin `pointer-events-none` o contencion visual clara.
- Crear una prueba Playwright que abra `/`, recorra hero/servicios/footer en desktop y mobile, capture frames y falle ante consola con errores, pantallas en blanco o variacion visual anomala en estado quieto.

## Fase 3: Estabilizacion De Focos Actuales

- Refactorizar `FloatingIcons` para separar el movimiento por scroll del flotado infinito en wrappers distintos.
- Ajustar `AuroraBackground` para usar `useReducedMotion`, desactivar loops decorativos cuando corresponda y bajar riesgo de repaint pesado por blur animado.
- Mantener el look premium de la landing, priorizando estabilidad de fondos sobre exceso de movimiento decorativo.

## Fase 4: Validacion

- Ejecutar `npm run lint`.
- Ejecutar `npm run audit:motion:static`.
- Ejecutar `npm run audit:motion:visual`.
- Ejecutar `npm run audit:motion`.
- Declarar cualquier limitacion si el browser automatizado o el entorno local impiden completar una validacion.

## Fase 5: Refinamiento De Fluidez En Barra Flotante

- Refactorizar `IslandBar` para evitar cambios de estado en cada frame de scroll.
- Mover tracking de direccion a refs, con delta minimo y cooldown para impedir alternancia rapida entre expandido y colapsado.
- Reemplazar animaciones de `width: auto` y multiples `AnimatePresence` por medidas estables con `max-width`, `opacity` y `transform`.
- Mantener `layoutId="active-pill"` solo para el indicador activo.
- Estabilizar `activeSection` durante clicks de navegacion suave para que el observer no cambie el estado en rafagas.
- Validar con scroll manual, clicks de navegacion, `npm run lint`, `npm run audit:motion:static` y `npm run audit:motion:visual`.

## Criterios De Aceptacion

- La auditoria estatica falla con patrones de motion inestables conocidos.
- La auditoria visual cubre `/` en desktop y mobile.
- Reduced motion deja fondos decorativos en un estado estable.
- Los focos actuales de parpadeo quedan corregidos sin eliminar el parallax principal.
- Los comandos de validacion quedan versionados y documentados para uso repetible.
