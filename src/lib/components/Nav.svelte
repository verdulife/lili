<script lang="ts">
	import { ThemeStore } from '$lib/stores';

	function toggleTheme() {
		if ($ThemeStore === 'dark') ThemeStore.set('light');
		else ThemeStore.set('dark');
	}
</script>

<nav class="row jcenter xfill" class:dark={$ThemeStore === 'dark'}>
	<img class="yfill" src="/favicon.svg" alt="Logo" on:click={toggleTheme} />
</nav>

<style lang="scss">
	nav {
		position: sticky;
		inset: 0 0 auto 0;
		height: 80px;
		background: $white;
		border-bottom: 1px solid $border;
		padding: 20px;
		transition: 200ms;
		
		img {
			cursor: pointer;
			filter: invert(1);
			transition: 200ms;
		}
	}

	.dark {
		background: $black;
		color: $white;
		border-color: $grey;

		img {
			filter: invert(0);
		}
	}
</style>
