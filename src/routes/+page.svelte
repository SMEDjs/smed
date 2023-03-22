<script>
	console.log('test');
	const icons = ['nodedotjs', 'mongodb', 'react', 'docker', 'git', 'linux'];
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Raleway:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<body>
	<div class="container">
		<h1 class="title">SMED</h1>
		<p class="description">motivated and curious developer who loves learning new things</p>
		<div class="icons">
			{#each icons as icon}
				<img src={`${icon}.svg`} alt={icon} class="icon" />
			{/each}
		</div>
	</div>
</body>

<style>
	body {
		background: #222223;
		font-family: 'Raleway', sans-serif;
		color: white;
		margin: 0;
		height: 100vh;
		width: 100vw;
	}
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
		height: 100%;
	}
	.title {
		font-size: 8rem;
		background: linear-gradient(135deg, #ffdf81, #ffd24e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-top: 8rem;
		margin-bottom: 1rem;
	}
	.description {
		font-size: 1.5rem;
		text-align: center;
	}
	.icon {
		width: 50px;
		height: 50px;
		margin: 10px;
	}
	.icons {
		display: flex;
	}
</style>
