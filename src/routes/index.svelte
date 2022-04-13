<script context="module">
	import { AuthStore } from '$lib/stores';
	import { get } from 'svelte/store';

	export async function load({ fetch, session, props }) {
		if (!session.loggedIn) {
			return {
				status: 303,
				redirect: '/login'
			};
		}

		return { props };
	}
</script>

<script lang="ts">
	import type { ClientEmpty } from '$lib/types';
	import NewClientForm from '$lib/components/NewClientForm.svelte';
	import { _clients } from '$lib/stores';

	export let clients: ClientEmpty[];
	let creating: boolean = false;

	$_clients = clients.sort((a, b) => {
		return +new Date(b.createdAt) - +new Date(a.createdAt);
	});

	function newClient() {
		creating = true;
	}
</script>

<svelte:head>
	<title>Lili</title>
</svelte:head>

<div class="wrapper col acenter xfill">
	{#if !creating}
		<button class="pri" on:click={newClient}>NUEVO CLIENTE</button>

		{#if $_clients.length === 0}
			<p>NO HAS CREADO NINGUN CLIENTE</p>
		{:else}
			<ul class="col xfill">
				{#each $_clients as { name, image }}
					<li class="box xfill">
						<a class="row acenter" href="/{name}">
							<img src={image} width="50" height="50" alt="Logotipo de {name}" />
							<p>{name}</p>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	{:else}
		<NewClientForm bind:creating />
	{/if}
</div>

<style lang="scss">
	.wrapper {
		padding: 40px;
	}

	ul {
		max-width: 600px;
		gap: 10px;
	}

	li {
		img {
			object-fit: contain;
			border: 1px solid $border;
			margin-right: 10px;
		}
	}

	button {
		color: $sec;
		margin-bottom: 40px;
	}
</style>
