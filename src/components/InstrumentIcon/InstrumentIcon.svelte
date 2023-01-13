<script lang="ts">
	import DrumkitSvg from "../../assets/icons/DrumkitSvg.svelte";
	import BassGuitarSvg from "../../assets/icons/BassGuitarSvg.svelte";
	import BeatsSvg from "../../assets/icons/BeatsSvg.svelte";
	import ClapsSvg from "../../assets/icons/ClapsSvg.svelte";
	import GrandPianoSvg from "../../assets/icons/GrandPianoSvg.svelte";
	import OrganSvg from "../../assets/icons/OrganSvg.svelte";
	import StringsSvg from "../../assets/icons/StringsSvg.svelte";
	import SynthSvg from "../../assets/icons/SynthSvg.svelte";
	import TambourineSvg from "../../assets/icons/TambourineSvg.svelte";
	import ClapsAltSvg from "../../assets/icons/ClapsAltSvg.svelte";

	export const test = "this is a test";

	// Props
	export let channelName: string;
	export let alternateTrack: boolean;
</script>

<div class="text-4xl">
	<span>
		{#if channelName === "drums"}
			<span>
				{#if !alternateTrack} <DrumkitSvg /> {:else}<BeatsSvg /> {/if}
			</span>
		{:else if channelName === "lead"}
			<span>
				{#if !alternateTrack} <GrandPianoSvg /> {:else}<SynthSvg /> {/if}
			</span>
		{:else if channelName === "bass"}
			<span>
				{#if !alternateTrack} <BassGuitarSvg /> {:else}<SynthSvg /> {/if}
			</span>
		{:else if channelName === "pad"}
			<span>
				{#if !alternateTrack} <StringsSvg /> {:else}<OrganSvg /> {/if}
			</span>{:else if channelName === "shaker"}
			<span>
				{#if !alternateTrack} <TambourineSvg /> {:else}<ClapsSvg /> {/if}
			</span>{/if}
	</span>
</div>
