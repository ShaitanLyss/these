<script lang="ts">
  // import { code_gen_from_yaml, sum } from "@selenial/hecate";
  console.log(window)

  let schema = $state(
    `
meshes:
    mesh:
        type: hyper_cube
        range: -1 m .. 1 m
        subdivisions: 5
        show_info: true

equations:
    wave: diff(u, t, 2) - c^2 * laplacian * u = f

time: 0 .. 5 s
time_step: 0.1 s

parameters:
    c: 
      type: speed
      value: 1

solve:
  equations:
    - wave
  mesh: mesh
  element: Q1

unknowns:
  u:
    initial: u0
    boundary: g
    derivative:
      initial: v0


functions:
    f: 0
    u0: 0 
    v0: 0
    g:
      - expr: sin(4 * pi * t)
        t: 0 .. 0.5 s
        x: -1 m
        y: -0.33 .. 0.33 m
      - expr: 0
`.trim(),
  );

  let code = $derived(schema);
  
  let a = sum(1, 2);
</script>

Hello from svelte

<section>
  <div></div>

  <pre>{code}</pre>
</section>

<style>
  section {
    width: 100%;
    height: 50vh;
    overflow-y: auto;

    display: grid;
  }
</style>
