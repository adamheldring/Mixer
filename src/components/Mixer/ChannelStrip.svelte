<script lang="ts">
	import type { Channel } from "../../helpers/types";
	import { onMount } from "svelte";

	// Props
	export let channelNr: number;
	export let channel: Channel;

	// State
	let channelGain: number = 0;

	$: {
		channelGain = channel.gainNode.gain.value;
	}

	onMount(() => {
		channel.players.forEach((player) => {
			player.mute = channel.isMuted;
		});
	});
	// State
	let alternateTrack = false;

	const handleToggleMute = () => {
		const action = channel.isMuted ? "turnon" : "turnoff";
		if (action === "turnon") {
			// To turn on channel sound - Unmute first or second track depending on "alternateTrack" setting
			channel.players[0].mute = alternateTrack ? true : false;
			channel.players[1].mute = alternateTrack ? false : true;
		} else {
			// To turnoff channel sound – Mute both track
			channel.players.forEach((player) => (player.mute = true));
		}
		channel.isMuted = !channel.isMuted;
	};

	const handleGainChange = (e: any) => {
		const newGain = e.target.value;
		if (newGain <= 1) {
			channel.gainNode.gain.rampTo(newGain, 0);
		}
	};

	const handleToggleAlternateTrack = () => {
		alternateTrack = !alternateTrack;
		if (!channel.isMuted) {
			channel.players[0].mute = alternateTrack ? true : false;
			channel.players[1].mute = alternateTrack ? false : true;
		}
	};
</script>

<div class="w-24 flex flex-col items-center bg-gray-300 m-1 pb-3">
	<div
		class="bg-stone-500 text-white w-7 h-7 mt-3 flex justify-center items-center font-bold rounded-full text-sm"
	>
		{channelNr + 1}
	</div>
	<div>
		<div class="bg-gray-600 text-white w-20 h-20 flex justify-center items-center mt-3 rounded">
			ICON
		</div>
	</div>
	<div>
		<button
			on:click={handleToggleAlternateTrack}
			class="w-10 h-10 text-white shadow-xl m-5 rounded hover:bg-orange-600 focus:bg-orange-600 active:shadow-none outline-none text-sm"
			style={`background-color: ${alternateTrack ? "#3b82f6" : "#a78bfa"}`}
			>{alternateTrack ? "ORG" : "ALT"}</button
		>
	</div>
	<div>
		<button
			on:click={handleToggleMute}
			class=" w-10 h-10 text-white shadow-xl m-5 mt-0 rounded hover:bg-orange-600 focus:bg-orange-600 active:shadow-none outline-none text-sm"
			style={`background-color: ${channel.isMuted ? "#f87171" : "#4ade80"}`}
			>{channel.isMuted ? "OFF" : "ON"}</button
		>
	</div>
	<div class="volume-container rounded-sm">
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
	<div
		class="bg-yellow-50 text-normal-400 w-5/6 mx-3 h-7 mt-4 flex justify-center items-center font-semibold rounded-sm text-sm"
	>
		{channel.name.toUpperCase()}
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
