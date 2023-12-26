<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveUser } from '$lib';
	let email: string = '';
	let password: string = '';
	let name: string = '';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { loginUsingGoogle, registerWithEmailAndPassword } from '$lib/core/services/AuthService';

	async function RegisterWithEmailAndPassword() {
		try {
			await registerWithEmailAndPassword(email, password, name);
		} catch (error) {
			console.log(error);
		}
	}
	async function loginWithGoogle() {
		await loginUsingGoogle();

		// await saveUser(user, name, []);
	}
</script>

<div>
	<section class="mx-auto flex h-[100%] w-3/6 flex-col justify-center">
		<h1 class="py-12 text-center text-3xl font-extrabold">Register</h1>
		<div class="flex flex-col gap-2">
			<Input bind:value={name} type="text" placeholder="full name" />
			<Input bind:value={email} type="email" placeholder="Email address" />
			<Input bind:value={password} type="password" placeholder="Password" />
		</div>
		<div class="mt-4 flex justify-between gap-12">
			<Button on:click={RegisterWithEmailAndPassword} class="w-full">Register</Button>
			<Button on:click={() => goto('/register')} class="w-full">Login</Button>
		</div>
		<div class="mt-1 flex items-center justify-center gap-4">
			<Separator class="w-1/6" />
			<h1>or</h1>
			<Separator class="w-1/6" />
		</div>
		<div class="mt-4">
			<Button on:click={loginWithGoogle} class="w-full">Continue with Google</Button>
		</div>
	</section>
</div>
