<script lang="ts">
	import type { Channel } from "../../helpers/types";
	import type { Gain, Meter } from "tone";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { SyncLoader } from "svelte-loading-spinners";

	import ChannelStrip from "./ChannelStrip.svelte";
	import MasterSection from "./MasterSection.svelte";

	// Props
	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
	export let channels: Channel[];
	export let masterGainNode: Gain;
	export let masterMeter: Meter;
	export let isAudioLoaded: boolean;

	// State
	let isAltKeyPressed = false;

	// Listen for alt-key – for "zero-clicking" volume bars
	onMount(() => {
		const listenPressAlt = (e: any) => {
			if (e.key === "Alt") {
				isAltKeyPressed = true;
			}
		};
		const listenReleaseAlt = (e: any) => {
			if (e.key === "Alt") {
				isAltKeyPressed = false;
			}
		};
		addEventListener("keydown", listenPressAlt);
		addEventListener("keyup", listenReleaseAlt);
		return () => {
			removeEventListener("keydown", listenPressAlt);
			removeEventListener("keyup", listenReleaseAlt);
		};
	});
</script>

<div class="app flex justify-center p-5 mt-5">
	<div class="relative outer-wrapper">
		<div class="mixer-bottom-wrapper absolute w-full h-full rounded-lg shadow-2xl" />
		<div class="mixer-top-wrapper box-shadow-3d p-5 bg-gray-600 rounded-lg relative z-10 h-full">
			<div class="mixer-container bg-gray-400 rounded overflow-hidden h-full">
				{#if channels.length > 0}
					<div transition:fade class="flex">
						<div class="channels-container flex pl-1 py-1 bg-gray-400">
							<div class="flex">
								{#each channels as channel, channelIdx}
									<ChannelStrip channelNr={channelIdx} {channel} {isPlaying} {isAltKeyPressed} />
								{/each}
							</div>
						</div>
						<MasterSection
							{handlePlay}
							{handleStop}
							{isPlaying}
							{masterGainNode}
							{masterMeter}
							{isAudioLoaded}
							{isAltKeyPressed}
						/>
					</div>
				{:else}
					<div class="h-full border-4 border-gray-400 flex justify-center items-center">
						<SyncLoader size="100" color="#e5e7eb" unit="px" duration="1s" />
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.outer-wrapper {
		width: 820px;
		height: 687px;
	}
	.mixer-bottom-wrapper {
		top: 24px;
		left: 6px;
	}
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
