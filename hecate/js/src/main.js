
import {setupGraphEditor} from '@selenite/graph-editor'
export async function get_cpp_sources_from_graph() {
  const graph = await setupGraphEditor()
  const res = [1, 2 ,3].values().map(x => String(x)).reduce((a, b) => a + b, '')
  // console.log(res)

  return res;

}
