<script context="module">
	export async function load({ url }) {
		return {
			props: { url }
		};
	}
</script>

<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';

	import { ThemeStore } from '$lib/stores';
	import Transition from '$lib/components/Transition.svelte';
	import Nav from '$lib/components/Nav.svelte';

	export let url: string;
</script>

<main class:dark={$ThemeStore === 'dark'}>
	<div class="scroll">
		<Nav />

		<Transition {url}>
			<slot />
		</Transition>
	</div>
</main>

<style lang="scss">
	:global {
		@import '../routes/global';
		@import 'verdu/verdu.scss';
	}

	main {
		background: $white;
		transition: 200ms;
	}

	.dark {
		background: $black;
		color: $white;
	}
</style>
