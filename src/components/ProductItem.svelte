<script lang="ts">
	import { addProductToCart } from '$lib/core/services/CartServices';
	import * as Card from '$lib/components/ui/card';
	import { Product } from '$lib/core/entities/Product';
	import { ShoppingBag } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { auth } from '$lib/firebase';
	export let title: string;
	export let image: string;
	export let price: number;
	export let id: string;
	export let description: string;
	export let category: string;

	const productItem = new Product(
		id,
		title,
		price,
		description,
		category,
		image,
		1,
		auth.currentUser?.uid || ''
	);

	async function addToCart() {
		try {
			await addProductToCart(productItem);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<Card.Root class="flex flex-col justify-between">
	<Card.Content>
		<div class="mt-4 flex justify-center">
			<img class="h-56" src={image} alt={title} />
		</div>
	</Card.Content>
	<Card.Header class="flex justify-between">
		<Card.Title>{title}</Card.Title>
		<h1>${price}</h1>
	</Card.Header>
	<Card.Footer>
		<Button on:click={addToCart} class="flex w-full items-center gap-2">
			<ShoppingBag /> Add to Cart
		</Button>
	</Card.Footer>
</Card.Root>

<!-- <div class="flex h-full flex-col justify-between">


	<div class="mt-4 flex items-center justify-between">
		<h1>{title}</h1>
		<h1>${price}</h1>
	</div>
	<div class="">
		<Button on:click={addToCart} class="w-full">Add to cart</Button>
	</div>
</div> -->
