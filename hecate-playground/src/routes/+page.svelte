<script lang="ts">
	import { code_gen_from_yaml } from '@selenial/hecate';
	import example from './schema.yaml?raw';
	import { getContext, untrack } from 'svelte';
	import { Highlight } from 'svelte-rune-highlight';

	import cpp from 'svelte-rune-highlight/languages/cpp';
	import CodeMirror from 'svelte-codemirror-editor';
	import { yaml } from '@codemirror/lang-yaml';
	import { oneDark } from '@codemirror/theme-one-dark';
  import {ayuLight, tomorrow} from 'thememirror'

  let lightmode = getContext<() => boolean>('lightmode');

	let schema = $state(example);
	let code = $state('');
	let error = $state('');
	$effect(() => {
		schema;

		untrack(() => {
			try {
				code = code_gen_from_yaml(schema);
				error = '';
			} catch (e) {
				error = e as string;
				console.error(e);
			}
		});
	});
</script>

<section class="relative grid h-screen w-screen grid-cols-2">
	<CodeMirror
		bind:value={schema}
		lang={yaml()}
		theme={lightmode() ? undefined : oneDark}
    placeholder="Input Schema"
		class="h-full overflow-auto text-lg"
		nodebounce
		styles={{
			'&': {
        padding: '1rem 0',
				width: '100%',
			}
		}}
	/>

	{#if error}
		<div class="text-error-content bg-error absolute bottom-0 col-start-1 w-1/2 p-2 text-center">
			{error}
		</div>
	{/if}
	<div class="relative h-full w-full overflow-x-auto outline outline-base-content/10">
		<div class=" absolute overflow-y-auto">
			<Highlight language={cpp} {code} wrapLines={true} langtag />
		</div>
	</div>
</section>
