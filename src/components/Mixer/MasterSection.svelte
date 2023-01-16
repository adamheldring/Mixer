<script lang="ts">
	import PlayIconSvg from "../../assets/icons/PlayIconSvg.svelte";
	import StopIconSvg from "../../assets/icons/StopIconSvg.svelte";

	export let handlePlay: () => void;
	export let handleStop: () => void;
	export let isPlaying: boolean;
</script>

<div class="flex justify-center bg-gray-400 w-64">
	<div class="flex flex-col justify-between items-center bg-gray-300 w-full m-2 ml-1 pb-3">
		<div>
			<div class="h-7" />
			<h1 class="text-gray-700 flex justify-center font-thin tracking-wider text-3xl py-5 mb-5">
				MIXER
			</h1>
		</div>
		<div class="flex flex-col items-center">
			<!-- <div class="volume-container rounded-sm mb-5">
			<input
				type="range"
				class="volume-slider"
				min={0}
				max={1}
				step={0.05}
				value={0}
				on:input={() => {}}
			/>
		</div> -->
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
	.volume-container {
		background: darkgray;
		position: relative;
		width: 40px;
		height: 186px;
		/* transform: scale(1.3); */
	}
	.volume-slider {
		transform: rotate(-90deg) scale(1.3);
		position: absolute;
		top: 85px;
		left: -44px;
		background: lightgreen;
		padding: "20px";
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
