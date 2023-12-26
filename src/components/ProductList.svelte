<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product } from '$lib/core/entities/Product';
	import { updateProductToStore } from '$lib/core/services/ProductService';
	import { ProductStore } from '$lib/core/stores/productStore';
	import ProductItem from './ProductItem.svelte';
	import { userStore } from '$lib/core/stores/authStore';

	let products: Product[] = [];
	$: products = $ProductStore;
	onMount(async () => {
		await updateProductToStore();
	});
</script>

<section class="mt-8">
	<div class="grid gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each products as product (product.id)}
			<ProductItem
				id={product.id}
				title={product.title}
				image={product.image}
				price={product.price}
				description={product.description}
				category={product.category}
			/>
		{/each}
	</div>
</section>
