<script lang="ts">
	import type { ClientWithLinks } from '$lib/types';
	export let client: ClientWithLinks;
</script>

{#if !client}
	<p>EL CLIENTE NO EXISTE O HA SIDO BORRADO</p>
{:else}
	<h1>{client.name}</h1>
{/if}
