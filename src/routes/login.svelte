<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	async function logIn({ target }) {
		const formData = new FormData(target);
		const data = Object.fromEntries(formData as any);

		const req = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const res = await req.json();

		if (res.err) {
			alert(res.err);
			return;
		}

		$session['loggedIn'] = res.loggedIn;
		goto('/');
	}
</script>

<form class="box col acenter" on:submit|preventDefault={(e) => logIn(e)}>
	<h1>Iniciar sesión</h1>

	<div class="input-wrapper col xfill">
		<label for="email">email</label>
		<input class="out xfill" type="email" id="email" name="email" />
	</div>

	<div class="input-wrapper col xfill">
		<label for="password">password</label>
		<input class="out xfill" type="password" id="password" name="password" />
	</div>

	<button class="pri" type="submit">ENTRAR</button>
</form>

<style lang="scss">
	form {
		max-width: 600px;
		margin: 40px auto;
		padding: 20px;
	}
	.input-wrapper {
		margin-bottom: 20px;

		label {
			font-size: 12px;
			text-transform: uppercase;
			color: $grey;
			padding: 0 15px;
		}
	}

	button {
		width: 200px;
		color: $sec;
		margin-top: 20px;
	}
</style>
