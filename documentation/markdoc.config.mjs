import { component, defineMarkdocConfig, Markdoc } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';

export default defineMarkdocConfig({
  extends: [starlightMarkdoc()],
  tags: {
    diagram: {
      render: component('./src/components/Diagram.astro'),
      selfClosing: true,
      attributes: {
        code: {
          type: "String"

        }
      }
      // transform(node) {
      //   // console.log(node)
      //   Markdoc.transformransform
      //
      // }

    }

  }
});
