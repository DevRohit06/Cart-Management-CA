<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import CartButton from './CartButton.svelte';
	import { onMount } from 'svelte';
	import { logout, refreshUser } from '$lib/core/services/AuthService';
	import { RefreshCart } from '$lib/core/services/CartServices';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { theme } from '$lib/core/stores/ThemeStore';
	import type { User } from 'firebase/auth';
	import { get } from 'svelte/store';
	import { userStore } from '$lib/core/stores/authStore';

	function switchTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}

	let user: any = null;

	onMount(async () => {
		user = get(userStore);
		await refreshUser();
		await RefreshCart();
	});
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex h-16 w-full flex-row items-center justify-between bg-background px-4">
		<div class="flex flex-row items-center">
			<a href="/" class="flex flex-row items-center">
				<img
					src="https://static.vecteezy.com/system/resources/thumbnails/021/616/897/small/shop-3d-render-icon-illustration-png.png"
					alt="logo"
					class="h-8 w-8"
				/>
				<span class="ml-2 text-2xl font-bold text-foreground">Store</span>
			</a>
		</div>
		<div class="flex flex-row items-center space-x-4">
			{#if user?.email}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<DropdownMenu.Trigger>
							<img class="w-8 rounded-full" src={user?.photoURL} alt={user?.displayName} />
						</DropdownMenu.Trigger>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56">
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Orders</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={switchTheme}
							>Switch to {$theme === 'light' ? 'dark' : 'light'}
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button href="/login" class="">Login</Button>
				<Button href="/register" class="">Register</Button>
			{/if}
			<CartButton />
		</div>
	</div>
</div>

<div class="absolute"></div>
