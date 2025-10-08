<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import 'bootstrap/dist/css/bootstrap.min.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Wi-Fi ルーター サポートフロー</title>
</svelte:head>

{@render children?.()}
