import {setupGraphEditor, Nodes} from '@selenite/graph-editor'
export async function get_cpp_sources_from_graph() {
  console.log("Hello from JS!");
  const {factory, editor} = await setupGraphEditor()

  const node = await factory.addNode(Nodes.Math.AddNode, {initialValues: {b: 2}});
  const a = await factory.addNode(Nodes.Data.Number.NumberNode, {initial: 1});

  await editor.addNewConnection(a, 'value', node, 'a');
  // node;

  const res = await factory.dataflowEngine.fetch(node);
  
  return res.value;

}
