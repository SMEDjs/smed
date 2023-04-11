<script lang="ts">
	let form: HTMLFormElement;

	const submit = async (e: any) => {
		try {
			const body = new FormData(form);
			const res = await fetch(form.action, { method: form.method, body }).then((res) => res.json());
		} catch (err) {
			console.error(err);
		}
	};
</script>

<div>
	<img
		src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
		alt="User Avatar"
	/>
	<form
		method="POST"
		action="/api/host/sendHook"
		enctype="multipart/form-data"
		on:submit|preventDefault={submit}
		bind:this={form}
	>
		<fieldset name="uploadFields">
			<div>
				<div>
					<textarea
						name="description"
						placeholder="Say something about this image..."
						id="imageDescription"
						maxlength="100"
					/>
					<label for="imageDescription">Image Description</label>
				</div>
				<div>
					<label for="image">Image</label>
					<input
						id="image"
						type="file"
						name="image"
						accept="image/png, image/jpeg, image/gif"
						required
					/>
				</div>
				<button type="submit" class="btn btn-primary" on:submit|preventDefault>Upload</button>
			</div>
		</fieldset>
	</form>
</div>
