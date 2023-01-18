<script lang="ts">
	import type { Channel } from "../../helpers/types";
	import type { Gain } from "tone";
	import { fade } from "svelte/transition";

	import ChannelStrip from "./ChannelStrip.svelte";
	import MasterSection from "./MasterSection.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";
	import LoaderDots from "../LoaderDots/LoaderDots.svelte";

	// Props
	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
	export let channels: Channel[];
	export let masterGainNode: Gain;

	let isLoading = true;
	$: {
		if (channels.length > 0) isLoading = false;
		console.log(isLoading);
	}
</script>

<div class="flex justify-center p-5 mt-5">
	<div class="mixer-container bg-gray-400">
		{#if channels.length > 0}
			<div transition:fade class="flex">
				<div class="channels-container flex pl-1 py-1 bg-gray-400">
					<div class="flex">
						{#each channels as channel, channelIdx}
							<ChannelStrip channelNr={channelIdx} {channel} />
						{/each}
					</div>
				</div>
				<MasterSection {handlePlay} {handleStop} {isPlaying} {masterGainNode} />
			</div>
		{:else}
			<div class="h-full border-4 border-gray-400">
				<LoaderDots />
			</div>
		{/if}
	</div>
</div>

<style>
	.mixer-container {
		min-width: 780px;
		min-height: 581px;
	}
	.channels-container {
		min-width: 524px;
		min-height: 581px;
	}
</style>
