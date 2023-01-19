<script lang="ts">
	import type { Gain, Meter } from "tone";

	import PlayIconSvg from "../../assets/icons/PlayIconSvg.svelte";
	import StopIconSvg from "../../assets/icons/StopIconSvg.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";

	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
	export let masterGainNode: Gain;
	export let masterMeter: Meter;

	let masterGain: number = 0;
	$: masterGain = masterGainNode?.gain.value || 0.8;

	const handleMasterGainChange = (e: any) => {
		const newGain = e.target.value;
		if (newGain <= 1) {
			masterGainNode?.gain.rampTo(newGain, 0);
			masterGain = newGain;
		}
	};

	// Master meter logic
	let meterValue: number | number[] = 0;
	let meterReaderIntervalId: NodeJS.Timer | null = null;
	$: {
		if (isPlaying) {
			let intervalId = setInterval(() => (meterValue = masterMeter.getValue()), 100);
			meterReaderIntervalId = intervalId;
		} else {
			if (meterReaderIntervalId) {
				clearInterval(meterReaderIntervalId);
				meterReaderIntervalId = null;
				meterValue = 0;
			}
		}
	}
</script>

<div class="flex justify-center bg-gray-400 w-64">
	<div class="flex flex-col justify-between items-center bg-gray-300 w-full m-2 ml-1 pb-3">
		<div>
			<h1 class="text-gray-700 flex justify-center font-thin tracking-wider text-3xl pt-5">
				MIXER
			</h1>
		</div>
		{meterValue}
		<div class="flex flex-col items-center">
			<div class="mb-5 bg-gray-400 rounded w-20 h-80 relative ">
				<div class="master-volume-container">
					<VolumeSlider volume={masterGain} handleVolumeChange={handleMasterGainChange} />
				</div>
			</div>
			<div class="flex">
				<button
					class={`mixer-button shadow-lg active:shadow-none bg-violet-600 hover:bg-violet-500  focus:bg-violet-600 active:bg-violet-400 text-white flex justify-center items-center ${
						isPlaying ? "play-button--active" : ""
					}`}
					on:click={handlePlay}
				>
					<span class="text-3xl">
						<PlayIconSvg />
					</span>
				</button>
				<button
					class="mixer-button shadow-lg active:shadow-none bg-violet-600 hover:bg-violet-500  focus:bg-violet-600 active:bg-violet-400  text-white flex justify-center items-center"
					on:click={handleStop}
				>
					<span class="text-3xl">
						<StopIconSvg />
					</span>
				</button>
			</div>
			<div
				class="bg-yellow-50 text-normal-400 mx-3 h-7 mt-4 flex justify-center items-center font-semibold rounded-sm text-sm"
				style={`
          width: 176px
        `}
			>
				MASTER
			</div>
		</div>
	</div>
</div>

<style>
	.master-volume-container {
		transform: scale(1.3);
		position: absolute;
		top: 50px;
		left: 21px;
	}

	.mixer-button {
		padding: 16px 20px;
		margin: 4px 8px;
		border-radius: 4px;
		width: 80px;
		height: 80px;
	}
	.play-button--active {
		animation: blink 1s infinite;
		transition: background 1s;
	}

	@keyframes blink {
		0% {
			background: #9333ea;
		}
		50% {
			background: #a855f7;
		}
	}
</style>
