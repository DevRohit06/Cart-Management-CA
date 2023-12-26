<script lang="ts">
	import { Description, Title } from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';

	import * as Select from '$lib/components/ui/select';
	import {
		decreaseQuantity,
		increaseQuantity,
		removeProductFromCart
	} from '$lib/core/services/CartServices';
	import { Trash2 } from 'lucide-svelte';

	export let title: string;
	export let id: string;
	export let price: number;
	export let image: string;
	export let quantity: number;
	function handleDecreaseQuantity() {
		if (quantity > 0) {
			quantity--;
			decreaseQuantity(id);
		}
	}

	function handleIncreaseQuantity() {
		quantity++;
		increaseQuantity(id);
	}
</script>

<Card.Root class="w-full">
	<div class="flex w-full">
		<img class="m-2 flex h-full w-24 items-center" src={image} alt={title} />
		<div class="w-full">
			<Card.Header>
				<Card.Title>{title}</Card.Title>
				<Card.Description>{price}</Card.Description>
			</Card.Header>
			<Card.Footer>
				<div class="flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						<Label for="framework">Qty</Label>
						<div class="flex gap-2 pr-8">
							<Button class="text-gray-900 dark:text-gray-100" on:click={handleDecreaseQuantity}>-</Button>
							<Input bind:value={quantity} type="text" name="quantity" id="" />
							<Button class="text-gray-900 dark:text-gray-100" on:click={handleIncreaseQuantity}>+</Button>
						</div>
					</div>
					<button
						on:click={() => removeProductFromCart(id)}
						class="h-9 rounded-md bg-primary px-3 py-1.5 text-white"
					>
						<Trash2 class="h-5" />
					</button>
				</div>
			</Card.Footer>
		</div>
	</div>
</Card.Root>
