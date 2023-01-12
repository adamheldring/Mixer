<script lang="ts">
	import { trackNames } from "../../helpers/tracks";

	import type { Gain, Player } from "tone";
	import Channel from "./Channel.svelte";

	// Props
	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let gainNodes: Gain<"gain">[];
	export let multiPlayer: Player[];

	// TODO Bundle track pairings - 10 tracks should be 5 channels
</script>

<div class="flex flex-col items-center">
	<div>
		<button class="mixer-button" on:click={handlePlay}>PLAY</button>
		<button class="mixer-button" on:click={handleStop}>STOP</button>
	</div>
</div>

<h2 class="bg-blue-200 flex justify-center mt-5 py-5">CHANNELS</h2>
<div class="flex justify-center p-5 mt-5">
	<div class="flex pl-1 py-1 bg-gray-400">
		{#each multiPlayer as player, playerIdx}
			<Channel channelNr={playerIdx} channel={player} gainNode={gainNodes[playerIdx]} />
		{/each}
	</div>
	<div class="flex justify-center bg-gray-400 w-64">
		<div class="flex flex-col justify-center items-center bg-gray-300 w-full m-2 ml-1">MASTER</div>
	</div>
</div>

<style>
	.mixer-button {
		background-color: darkgray;
		padding: 16px 20px;
		margin: 4px 8px;
		border-radius: 4px;
	}
</style>
