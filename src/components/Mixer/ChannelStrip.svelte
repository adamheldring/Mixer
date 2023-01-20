<script lang="ts">
	import type { Channel } from "../../helpers/types";
	import { onMount } from "svelte";
	import InstrumentIcon from "../InstrumentIcon/InstrumentIcon.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";
	import ChannelMeter from "../GaugeMeters/ChannelMeter.svelte";

	// Props
	export let channelNr: number;
	export let channel: Channel;

	// State
	let channelGain: number = 0;
	let alternateTrack = false;

	$: channelGain = channel.gainNode.gain.value;

	onMount(() => {
		channel.players.forEach((player, playerIdx) => {
			player.mute = playerIdx === 0 ? channel.isMuted : true;
		});
	});

	const handleMute = (action: "turnon" | "turnoff") => {
		if (action === "turnon") {
			// To turn on channel sound - Unmute first or second track depending on "alternateTrack" setting
			channel.players[0].mute = alternateTrack ? true : false;
			channel.players[1].mute = alternateTrack ? false : true;
			channel.isMuted = false;
		} else {
			// To turnoff channel sound – Mute both track
			channel.players.forEach((player) => (player.mute = true));
			channel.isMuted = true;
		}
	};

	const handleGainChange = (e: any) => {
		const newGain = e.target.value;
		if (newGain <= 1) {
			channel.gainNode.gain.rampTo(newGain, 0);
			channelGain = newGain;
		}
	};

	const handleToggleAlternateTrack = () => {
		alternateTrack = !alternateTrack;

		// handleMute("turnon");
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
	<div class="w-full mt-1 p-1 px-2">
		<ChannelMeter meterValue={0} />
	</div>
	<div>
		<div>
			<div class="bg-gray-600 text-white w-20 h-20 flex justify-center items-center mt-2 rounded-t">
				<InstrumentIcon channelName={channel.name} {alternateTrack} />
			</div>
			<div
				class="bg-gray-600 text-white w-20 h-5 text-xs font-extralight tracking-wide  flex justify-center items-center mt-px rounded-b"
			>
				{channel.instrumentNames[!alternateTrack ? 0 : 1].toUpperCase()}
			</div>
		</div>
	</div>
	<div>
		<button
			on:click={handleToggleAlternateTrack}
			class="button w-10 h-10 text-white shadow-xl m-5 rounded hover:bg-orange-600 focus:bg-orange-600 active:shadow-none text-sm"
			style={`background-color: ${!alternateTrack ? "#3b82f6" : "#a78bfa"}`}
			>{!alternateTrack ? "ORG" : "ALT"}</button
		>
	</div>
	<div>
		<button
			on:click={() => handleMute(channel.isMuted ? "turnon" : "turnoff")}
			class=" w-10 h-10 text-white shadow-xl m-5 mt-0 rounded hover:bg-orange-600 focus:bg-orange-600 active:shadow-none text-sm"
			style={`background-color: ${channel.isMuted ? "#f87171" : "#4ade80"}`}
			>{channel.isMuted ? "OFF" : "ON"}</button
		>
	</div>
	<div class="volume-container rounded-sm">
		<VolumeSlider volume={channelGain} handleVolumeChange={handleGainChange} />
	</div>
	<div
		class=" bg-yellow-50 text-normal-400 w-5/6 mx-3 h-7 mt-4 flex justify-center items-center font-semibold rounded-sm text-sm"
	>
		{channel.name.toUpperCase()}
	</div>
</div>
