<script lang="ts">
	let form: HTMLFormElement;
	let input: HTMLInputElement;
	let container: HTMLDivElement;
	let image: HTMLImageElement;
	let showImage = false;
	let response: any;

	const submit = async (e: any) => {
		try {
			const body = new FormData(form);
			const res = await fetch(form.action, { method: form.method, body }).then((res) => res.json());
			response = res;
			if (!res.error) form.reset();
		} catch (err) {
			console.error(err);
		}
	};

	function onChange() {
		const file = input.files?.[0];

		if (file) {
			showImage = true;
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result?.toString() ?? '');
			});
			reader.readAsDataURL(file);
			return;
		}
		showImage = false;
	}
</script>

<div>
	<form
		method="POST"
		action="/api/cdn/upload"
		enctype="multipart/form-data"
		on:submit|preventDefault={submit}
		bind:this={form}
	>
		<fieldset name="uploadFields" class="flex justify-center items-center text-secondary">
			<div>
				<div class="flex mb-10 flex-col">
					<label for="imageDescription" class="text-xl">Image Description</label>
					<textarea
						class="rounded-lg text-dark"
						name="description"
						placeholder="Say something about this image..."
						id="imageDescription"
						maxlength="100"
					/>
				</div>
				<div class="flex mb-10 flex-col">
					<label for="image" class="text-xl">Image</label>
					<input
						id="image"
						type="file"
						name="image"
						accept="image/png, image/jpeg, image/gif"
						required
						bind:this={input}
						on:change={onChange}
					/>
				</div>
				<button
					type="submit"
					class="btn btn-primary mb-10 text-xl bg-primary py-2 px-4 rounded-lg"
					on:submit|preventDefault>Upload</button
				>
			</div>
			<div bind:this={container} class="w-96 h-96 flex items-center">
				{#if showImage}
					<img bind:this={image} src="" alt="Preview" />
				{:else}
					<img
						src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
						alt="User Avatar"
					/>
				{/if}
			</div>
		</fieldset>
	</form>
	<div class="my-6">
		{#if response}
			<div>{response?.message}</div>
		{/if}
	</div>
</div>
