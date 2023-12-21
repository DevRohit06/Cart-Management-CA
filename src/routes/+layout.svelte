<script>
	import '../app.pcss';
	import Navbar from '../components/Navbar.svelte';
</script>

<section class="w-10/12 mx-auto">
	<Navbar />
	<slot />
</section>
