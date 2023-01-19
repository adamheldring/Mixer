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
	<div class="relative">
		<div
			class="mixer-bottom absolute bg-red-400 rounded-lg z-0 shadow-2xl"
			style={`
		top: 20px;
		left: 6px;
		width: 820px;
		height: 625px;
	`}
		/>
		<div class="mixer-top box-shadow-3d p-5 bg-gray-600 rounded-lg relative z-10">
			<div class="mixer-container bg-gray-400 rounded overflow-hidden h-full">
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
	</div>
</div>

<style>
	.box-shadow-3d {
		--var-shadow-color: #9ca3af;
		box-shadow: 1px 1px 0px var(--var-shadow-color), 1px 2px 0px var(--var-shadow-color),
			1px 3px 0px var(--var-shadow-color), 1px 4px 0px var(--var-shadow-color),
			2px 5px 0px var(--var-shadow-color), 2px 6px 0px var(--var-shadow-color),
			2px 7px 0px var(--var-shadow-color), 2px 8px 0px var(--var-shadow-color),
			3px 9px 0px var(--var-shadow-color), 3px 10px 0px var(--var-shadow-color),
			3px 11px 0px var(--var-shadow-color), 3px 12px 0px var(--var-shadow-color),
			4px 13px 0px var(--var-shadow-color), 4px 14px 0px var(--var-shadow-color),
			4px 15px 0px var(--var-shadow-color), 4px 16px 0px var(--var-shadow-color),
			5px 17px 0px var(--var-shadow-color), 5px 18px 0px var(--var-shadow-color),
			5px 19px 0px var(--var-shadow-color), 5px 20px 0px var(--var-shadow-color),
			6px 21px 0px var(--var-shadow-color), 6px 22px 0px var(--var-shadow-color),
			6px 23px 0px var(--var-shadow-color), 6px 24px 0px var(--var-shadow-color);
	}
	.mixer-container {
		min-width: 780px;
		min-height: 581px;
	}
	.channels-container {
		min-width: 524px;
		min-height: 581px;
	}
</style>
