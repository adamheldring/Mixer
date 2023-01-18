<script lang="ts">
	import type { Channel } from "../../helpers/types";
	import type { Gain } from "tone";

	import ChannelStrip from "./ChannelStrip.svelte";
	import MasterSection from "./MasterSection.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";

	// Props
	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
	export let channels: Channel[];
	export let masterGainNode: Gain;
</script>

<div class="flex justify-center p-5 mt-5">
	<div class="flex pl-1 py-1 bg-gray-400">
		{#each channels as channel, channelIdx}
			<ChannelStrip channelNr={channelIdx} {channel} />
		{/each}
	</div>
	<MasterSection {handlePlay} {handleStop} {isPlaying} {masterGainNode} />
</div>
