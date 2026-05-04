# Motion Parallax Refinement Audit

<motion_parallax_audit>
  <business_reason>
    La landing vende precision. Si el fondo parpadea, la percepcion de calidad baja aunque el copy y la oferta sean fuertes.
    Esta auditoria convierte la estabilidad visual en un check repetible antes de publicar.
  </business_reason>

  <critical_guardrails>
    <single_transform_owner>
      Un mismo `motion.*` no debe combinar `style={{ y: motionValue }}` con `animate={{ y: [...] }}`.
      Separar scroll parallax y flotado infinito en wrappers distintos.
    </single_transform_owner>

    <paint_budget>
      Evitar blur pesado en capas con loops infinitos. El blur alto se permite solo en capas estaticas o de movimiento minimo.
    </paint_budget>

    <reduced_motion>
      Toda decoracion infinita de fondo debe respetar `useReducedMotion` o `prefers-reduced-motion`.
    </reduced_motion>

    <safe_background_layers>
      Las capas absolutas de fondo deben usar `pointer-events-none`, permanecer contenidas y animar principalmente `transform` y `opacity`.
    </safe_background_layers>
  </critical_guardrails>

  <commands>
    <static>npm run audit:motion:static</static>
    <visual>npm run audit:motion:visual</visual>
    <full>npm run audit:motion</full>
  </commands>
</motion_parallax_audit>

## What The Audit Checks

- Static audit: catches known unstable Framer Motion patterns before opening a browser.
- Visual audit: opens `/`, scrolls through the main landing sections in desktop and mobile, checks console errors, blank frames and excessive pixel drift while the page is idle.
- Reduced motion audit: verifies decorative background motion settles when the browser asks for reduced motion.

## Refinement Rule

When adding a parallax layer, decide which layer owns each transform:

- Outer wrapper: scroll-linked `x`/`y` MotionValue.
- Inner wrapper: optional ambient loop.
- Static child: icon, gradient, texture or canvas.

This keeps the browser compositor stable and prevents two animation systems from fighting over the same transform.
