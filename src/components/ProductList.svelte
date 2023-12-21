<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product } from '$lib/core/entities/Product';
	import { updateProductToStore } from '$lib/core/services/ProductService';
	import { ProductStore } from '$lib/core/stores/productStore';
	import ProductItem from './ProductItem.svelte';

	let products: Product[] = [];
	$: products = $ProductStore;
	onMount(async () => {
		await updateProductToStore();
	});
</script>

<section class="mt-8">
	<div class="grid grid-cols-4 gap-12 ">
		{#each products as product (product.id)}
			<ProductItem
				title={product.title}
				image={product.image}
				price={product.price}
			/>
		{/each}
	</div>
</section>
