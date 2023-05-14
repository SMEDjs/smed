<script>
	import emojis from "../emoji";
	const emoji =
		emojis[Math.floor(Math.random() * emojis.length)] +
		emojis[Math.floor(Math.random() * emojis.length)];
	const year = new Date().getFullYear();
</script>

<footer class="flex items-center justify-center w-full fixed bottom-0">
	<p class="text-secondary my-4">© <span class="text-primary">SMED</span> {year} {emoji}</p>
</footer>
