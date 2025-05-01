import "regenerator-runtime/runtime.js";
import {setupGraphEditor} from '@selenite/graph-editor'


export async function get_cpp_sources_from_graph() {
  const graph = await setupGraphEditor()
  console.log(graph)
  return "Hello from js!"

  

}
