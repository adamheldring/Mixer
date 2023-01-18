<script lang="ts">
	import { onMount } from "svelte";
	let dots = "...";
	let count = 0 + 3; // Start with three dots

	onMount(() => {
		const timerId = setInterval(() => count++, 500);
		return () => {
			clearInterval(timerId);
		};
	});
	$: {
		let modCount = count % 4;
		const dotString = " " + "...";
		dots = modCount === 0 ? "" : dotString.slice(-modCount);
	}
</script>

<div
	class="flex h-full w-full justify-center items-center text-9xl mb-5 bg-gray-300 border-4 border-gray-400 text-gray-400 tracking-wider"
>
	<span
		class="flex items-center relative w-20"
		style={`
    top: -20px;
  }
  `}
	>
		{dots}
	</span>
</div>
