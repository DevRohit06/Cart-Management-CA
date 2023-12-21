<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	export let title: string;
	export let image: string;
	export let price: number;
</script>

<div class="flex h-full flex-col justify-between">
	<div class="flex justify-center">
		<img class="h-56" src={image} alt={title} />
	</div>

	<div class="flex items-center justify-between mt-4">
		<h1>{title}</h1>
		<h1>${price}</h1>
	</div>
	<div class="">
		<Button class="w-full">Add to cart</Button>
	</div>
</div>
