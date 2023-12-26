<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { RefreshCart, removeProductFromCart } from '$lib/core/services/CartServices';
	import { CartStore } from '$lib/core/stores/CartStore';
	import { auth } from '$lib/firebase';
	import { ShoppingCart } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import CartProductCard from './CartProductCard.svelte';
	let openCart: boolean = false;

	let currentUserCartSize = 0;
	onMount(async () => {
		await RefreshCart();
	});

	$: currentUserCartSize = $CartStore?.length;

	let unsubscribe = CartStore.subscribe(async () => {
		await RefreshCart();
	});

	onDestroy(() => {
		unsubscribe();
	});

	console.log($CartStore);
</script>

<div>
	<button on:click={() => (openCart = !openCart)} class="relative">
		<span class="absolute -right-1 -top-2.5 rounded-full bg-primary px-[4px] text-xs text-white"
			>{currentUserCartSize || 0}</span
		>
		<ShoppingCart />
	</button>
</div>

{#if openCart}
	<div in:fly={{ x: 200 }} out:fly={{ x: 200 }} class="fixed inset-0 z-40 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
				<div class="pointer-events-auto w-screen max-w-md">
					<div class="flex h-full flex-col bg-white dark:bg-black shadow-xl">
						<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
							<div class="flex items-start justify-between">
								<h1 class="text-lg font-medium text-gray-900 dark:text-gray-100">Shopping cart</h1>
								<div class="ml-3 flex h-7 items-center">
									<Button
										on:click={() => (openCart = !openCart)}
										class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
									>
										<svg
											fill="#000000"
											viewBox="0 0 32 32"
											height="2em"
											xmlns="http://www.w3.org/2000/svg"
											><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
												id="SVGRepo_tracerCarrier"
												stroke-linecap="round"
												stroke-linejoin="round"
											></g><g id="SVGRepo_iconCarrier">
												<path
													d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"
												></path>
											</g></svg
										>
										<span class="absolute -inset-0.5" />
										<span class="sr-only">Close panel</span>
									</Button>
								</div>
							</div>

							<div class="mt-8">
								<div class="flow-root">
									<ul role="list" class="-my-6 divide-y divide-gray-200 overflow-y-visible">
										{#if $CartStore === null}
											no items in cart
										{:else}
											{#each $CartStore as product}
												<li class="flex py-6">
													<CartProductCard
														id={product.id}
														title={product.title}
														price={product.price}
														image={product.image}
														quantity={product.quantity}
													/>
												</li>
											{/each}
										{/if}
									</ul>
								</div>
							</div>
						</div>

						<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
							<!-- <div 
                    class="flex gap-4 justify-between text-base font-medium text-gray-900"
                  >
                    <div class="flex flex-col w-full">
                      <input
                        class="bg-gray-100 px-2 h-10 w-full mb-2 rounded-md border-2 border-gray-300 placeholder:text-center"
                        type="text"
                        placeholder="Coupon Code"
                      />
                      <div
                        class="flex justify-between items-center px-4 transition-opacity w-full text-sm bg-green-600 rounded-md text-white text-center"
                      >
                        Coupon Applied Succcessfully
                        <Button
                          
                          class="relative -m-2 p-2 text-white hover:text-gray-500"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                        </Button>
                      </div>
  
                      <div
                        class="flex justify-between items-center px-4 transition-opacity w-full text-sm bg-red-400 rounded-md text-white text-center"
                      >
                        Invalid coupon code
                        <Button
                          
                          class="relative -m-2 p-2 text-white hover:text-gray-500"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                        </Button>
                      </div>
                    </div>
                    <Button
                      class="h-10 px-5 text-white rounded-md py-2.5 bg-indigo-600"
                    >
                      Apply
                    </Button>
                  </div> -->

							<div class="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
								<p>Subtotal</p>
								<p>₹ 500</p>
							</div>
							<p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
							<div class="mt-6">
								<Button class="w-full">CheckOut</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
