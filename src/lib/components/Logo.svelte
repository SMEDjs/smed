<script lang="ts">
	export let logo: string;
    export let color: string;
    export let path: string;
    // <img src={`${logo}.svg`} alt={logo} class="m-4 w-12 h-12 hover:w-14 hover:h-14 opacity-90 hover:opacity-100 duration-200" />
</script>

<svg class="mr-8 p-4 w-16 h-16 opacity-90 hover:opacity-100 duration-200 rounded-full" style={`background-color: ${color}1a`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={color}><title>{logo}</title><path d={path}/></svg>