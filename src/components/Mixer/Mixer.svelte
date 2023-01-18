<script lang="ts">
	import type { Channel } from "../../helpers/types";
	import type { Gain } from "tone";
	import { fade } from "svelte/transition";

	import ChannelStrip from "./ChannelStrip.svelte";
	import MasterSection from "./MasterSection.svelte";
	import LoaderDots from "../LoaderDots/LoaderDots.svelte";

	// Props
	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
	export let channels: Channel[];
	export let masterGainNode: Gain;
</script>

<div class="flex justify-center p-5 mt-5">
	<div class="channels-container pl-1 py-1 bg-gray-400">
		{#if channels.length > 0}
			<div transition:fade class="flex">
				{#each channels as channel, channelIdx}
					<ChannelStrip channelNr={channelIdx} {channel} />
				{/each}
			</div>
		{:else}
			<LoaderDots />
		{/if}
	</div>
	<MasterSection {handlePlay} {handleStop} {isPlaying} {masterGainNode} />
</div>

<style>
	.channels-container {
		min-width: 524px;
		min-height: 581px;
	}
</style>
