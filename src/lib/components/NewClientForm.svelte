<script lang="ts">
	import { _clients } from '$lib/stores';

	export let creating: boolean;

	let files: FileList;
	let image: string;

	function resizeImage() {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.src = image;
		img.onload = () => {
			const ratio = img.width / img.height;
			canvas.width = 100;
			canvas.height = 100 / ratio;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			image = canvas.toDataURL('image/png');
		};
	}

	$: if (files && files[0]) {
		const file = files[0];
		const reader = new FileReader();

		reader.onload = (e: any) => {
			image = e.target.result;
			resizeImage();
		};
		reader.readAsDataURL(file);
	}

	function resetAndOut() {
		const form = document.querySelector('form');
		form.reset();
		creating = false;
	}

	async function pushUser({ target }) {
		const formData = new FormData(target);
		const data = Object.fromEntries(formData as any);
		data.image = image;

		const req = await fetch('/api/newclient', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const res = await req.json();

		if (res.err) {
			alert('El nombre de usuario ya existe');
			return;
		}

		$_clients = [res.data, ...$_clients];
		resetAndOut();
	}
</script>

<form class="box col xfill" on:submit|preventDefault={(e) => pushUser(e)}>
	<h2>Nuevo cliente</h2>

	<div class="input-wrapper col xfill">
		<label for="name">nombre</label>
		<input class="xfill out" type="text" id="name" name="name" required />
	</div>
	<div class="input-wrapper col xfill">
		<label for="image">logotipo</label>
		<div class="row acenter xfill">
			<input
				class="grow out"
				type="file"
				id="image"
				name="image"
				accept="image/*"
				bind:files
				required
			/>

			{#if image}
				<img src={image} width="50" height="50" alt="Logotipo" />
			{/if}
		</div>
	</div>

	<div class="btns row acenter xfill">
		<button type="submit" class="pri">CREAR CLIENTE</button>
		<div class="cancel-btn" on:click={resetAndOut}>CANCELAR</div>
	</div>
</form>

<style lang="scss">
	form {
		max-width: 600px;
		padding: 20px;
	}

	h2 {
		margin-bottom: 20px;
	}

	.input-wrapper {
		margin-bottom: 20px;

		label {
			font-size: 12px;
			text-transform: uppercase;
			color: $grey;
			padding: 0 15px;
		}

		img {
			padding: 5px;
			object-fit: contain;
			border: 1px solid $border;
			margin-left: -1px;
		}
	}

	.btns {
		margin-top: 20px;

		button {
			color: $sec;
		}

		.cancel-btn {
			cursor: pointer;
			padding: 10px 20px;
		}
	}
</style>
