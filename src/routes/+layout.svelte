<script>
	import '../app.pcss';
	import Navbar from '../components/Navbar.svelte';
	import { checkAuth, refreshUser } from '$lib/core/services/AuthService';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { RefreshCart, addCartToFirestore } from '$lib/core/services/CartServices';
	import { theme } from '$lib/core/stores/ThemeStore';
	onMount(async () => {
	
	});
	onMount(async () => {
		await RefreshCart();
		await refreshUser();
		let isAuth = await checkAuth();

		// @ts-ignore
		if (!isAuth) {
			await addCartToFirestore();
			// return goto('/login');
		}
	});
</script>

<main class="relative {$theme} ">
	<section class="mx-auto w-10/12">
		<Navbar />
		<slot />
	</section>
</main>

<style>
	.light {
		background-color: white;
		color: black;
	}

	.dark {
		background-color: black;
		color: white;
	}
</style>
