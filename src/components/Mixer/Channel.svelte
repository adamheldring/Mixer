<script lang="ts">
	import type { Gain, Player } from "tone";
	import { trackNames } from "../../helpers/tracks";

	// Props
	export let channelNr: number;
	export let channel: Player;
	export let gainNode: Gain<"gain">;

	// State
	let channelGain: number = 0;
	let test: number = 0.5;

	$: {
		channelGain = gainNode.gain.value;
	}

	// State
	let isMuted = true;

	const handleToggleMute = () => {
		channel.mute = !channel.mute;
	};

	const handleGainChange = (e: any) => {
		const newGain = e.target.value;
		if (newGain <= 1) {
			gainNode.gain.rampTo(newGain, 0);
		}
	};
</script>

<div class="w-24 flex flex-col items-center bg-gray-300 m-1">
	<div>
		{channelNr + 1}
	</div>
	<div>
		<button
			on:click={handleToggleMute}
			class="bg-gray-700 w-10 h-10 text-white shadow-xl m-5 rounded hover:bg-orange-600 focus:bg-orange-600 active:shadow-none outline-none text-sm"
			style={`background-color: ${channel.mute ? "#f87171" : "#4ade80"}`}
			>{channel.mute ? "OFF" : "ON"}</button
		>
	</div>
	<div class="volume-container rounded-sm mb-5">
		<input
			type="range"
			class="volume-slider"
			min={0}
			max={1}
			step={0.05}
			value={channelGain}
			on:input={handleGainChange}
		/>
	</div>
</div>

<style>
	.volume-container {
		background: darkgray;
		position: relative;
		width: 40px;
		height: 150px;
	}
	.volume-slider {
		transform: rotate(-90deg);
		position: absolute;
		top: 66px;
		left: -44px;
		background: lightgreen;
		padding: "20px";
	}
</style>
