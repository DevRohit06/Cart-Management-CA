<script>
	import { onMount } from "svelte";
	import ProductList from "../components/ProductList.svelte";
	import { refreshUser } from "$lib/core/services/AuthService";
	import { RefreshCart } from "$lib/core/services/CartServices";
	onMount(async () => {
		await refreshUser();
		await RefreshCart()
	});
</script>
<ProductList />
