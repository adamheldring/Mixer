<script lang="ts">
	import type { Gain, Meter } from "tone";
	import { Circle } from "svelte-loading-spinners";

	import PlayIconSvg from "../../assets/icons/PlayIconSvg.svelte";
	import StopIconSvg from "../../assets/icons/StopIconSvg.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";
	import MasterMeter from "../../components/GaugeMeters/MasterMeter.svelte";

	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
	export let masterGainNode: Gain;
	export let masterMeter: Meter;
	export let isAudioLoaded: boolean;
	export let isAltKeyPressed: boolean;

	let masterGain: number = 0;
	$: masterGain = masterGainNode?.gain.value || 0.8;

	const handleMasterGainChange = (newGain: number) => {
		if (newGain <= 1) {
			masterGainNode?.gain.rampTo(newGain, 0);
			masterGain = newGain;
		}
	};

	// Master meter logic
	let meterValue: number = 0;
	let meterReaderIntervalId: NodeJS.Timer | null = null;

	const updateMeterValue = (currentValue: number | number[]) => {
		if (typeof currentValue !== "number") return;
		if (currentValue < 0) {
			meterValue = 0;
		} else if (currentValue > 0.2) {
			meterValue = 0.2;
		} else {
			meterValue = Math.round(currentValue * 100) / 100;
		}
	};
	$: {
		let meterReadInterval = 20;
		if (isPlaying) {
			let intervalId = setInterval(() => {
				updateMeterValue(masterMeter.getValue());
			}, meterReadInterval);
			meterReaderIntervalId = intervalId;
		} else {
			if (meterReaderIntervalId) {
				clearInterval(meterReaderIntervalId);
				meterReaderIntervalId = null;
				meterValue = 0;
			}
		}
	}

	const altClickVolumeReset = () => {
		if (isAltKeyPressed) {
			handleMasterGainChange(0.8);
		}
	};

	// Set focus on Play-button when all is loaded and ready to play.
	$: {
		if (isAudioLoaded) {
			const playButton = document.getElementById("play-button");
			setTimeout(() => {
				playButton?.focus();
			}, 0);
		}
	}
</script>

<div class="flex justify-center bg-gray-400 w-64">
	<div class="flex flex-col justify-between items-center bg-gray-300 w-full m-2 ml-1 pb-3">
		<section>
			<!-- TOP SECTION -->
			<h1 class="text-gray-700 flex justify-center font-thin tracking-wider text-3xl pt-2">
				MIXER
			</h1>
			<div class="mt-5 mb-3">
				<MasterMeter {meterValue} />
			</div>
		</section>
		<section>
			<!-- MIDDLE SECTION-->
			<div
				on:click={altClickVolumeReset}
				on:keypress={altClickVolumeReset}
				class="bg-gray-400 rounded w-20 h-72 relative mb-2"
			>
				<div class="master-volume-container">
					<VolumeSlider
						volume={masterGain}
						handleVolumeChange={(e) => handleMasterGainChange(e.target.value)}
					/>
				</div>
			</div>
		</section>
		<section class="flex flex-col items-center">
			<!-- BOTTOM SECTION-->
			<div class="flex">
				<button
					id="play-button"
					disabled={!isAudioLoaded}
					class={`mixer-button shadow-lg active:shadow-none bg-violet-600 hover:bg-violet-500  focus:bg-violet-600 active:bg-violet-400 text-white flex justify-center items-center ${
						isPlaying ? "play-button--active" : ""
					}`}
					on:click={handlePlay}
				>
					{#if !isAudioLoaded}
						<Circle size="40" color="#FFFFFF" unit="px" duration="1s" />
					{:else}
						<span class="text-3xl">
							<PlayIconSvg />
						</span>
					{/if}
				</button>
				<button
					id="stop-button"
					disabled={!isAudioLoaded}
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
		</section>
	</div>
</div>

<style>
	.master-volume-container {
		transform: scale(1.2);
		position: absolute;
		top: 44px;
		left: 21px;
	}

	.mixer-button {
		padding: 16px 20px;
		margin: 0px 8px;
		border-radius: 4px;
		width: 80px;
		height: 80px;
	}

	.play-button--active {
		animation: blink 1s infinite;
		transition: background 1s;
	}

	.mixer-button {
		transition: background-color 0.2s, opacity, 0.1s, box-shadow 0.2s;
	}
	.mixer-button:disabled {
		opacity: 0.5;
		background-color: #9ca3af;
		box-shadow: none;
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
