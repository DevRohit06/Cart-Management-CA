<script lang="ts">
	import { goto } from '$app/navigation';
	let email: string = '';
	let password: string = '';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { loginUsingGoogle, loginWithEmailAndPassword } from '$lib/core/services/AuthService';

	async function LoginWithEmailAndPassword() {
		try {
			await loginWithEmailAndPassword(email, password);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div>

	<section class="mx-auto flex h-[100%] sm:w-3/6 w-5/6 flex-col justify-center">
		<h1 class="text-3xl font-extrabold text-center py-12">Login</h1>
		<div class="flex flex-col gap-2">
			<Input bind:value={email} type="email" placeholder="Email address" />
			<Input bind:value={password} type="password" placeholder="Password" />
		</div>
		<div class="mt-4 flex justify-between sm:gap-12 gap-2">
			<Button on:click={LoginWithEmailAndPassword} class="w-full">Login</Button>
			<Button on:click={() => goto('/register')} class="w-full">Register</Button>
		</div>
		<div class="mt-1 flex items-center justify-center gap-4">
			<Separator class="w-1/6" />
			<h1>or</h1>
			<Separator class="w-1/6" />
		</div>
		<div class="mt-4">
			<Button on:click={loginUsingGoogle} class="w-full">Login with Google</Button>
		</div>
	</section>
</div>
