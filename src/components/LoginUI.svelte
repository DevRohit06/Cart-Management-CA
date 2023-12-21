<script>
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<div >
	<section class="mx-auto flex h-[100%] w-3/6 flex-col justify-center">
		<div class="flex flex-col gap-2">
			<Input type="email" placeholder="Email address" />
			<Input type="password" placeholder="Password" />
		</div>
		<div class="mt-4 flex justify-between gap-12">
			<Button class="w-full">Login</Button>
			<Button class="w-full">Register</Button>
		</div>
		<div class="mt-1 flex items-center justify-center gap-4">
			<Separator class="w-1/6" />
			<h1>or</h1>
			<Separator class="w-1/6" />
		</div>
		<div class="mt-4">
			<Button class="w-full">Login with Google</Button>
		</div>
	</section>
</div>
