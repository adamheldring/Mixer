<script lang="ts">
	export let volume: number;
	export let handleVolumeChange: (e: any) => void;

	$: zeroBasedVolume = Math.round(volume * 100) - 80;
</script>

<div class="h-58 rounded overflow-hidden">
	<div class="volume-wrapper-outer border-1 bg-gray-400 relative w-10 h-44">
		<div
			class="w-40 absolute -rotate-90"
			style={`
        top: 80px;
        left: -60px;
        height: 28px
    `}
		>
			<input
				type="range"
				min={0}
				max={1}
				step={0.05}
				value={volume}
				on:input={(e) => handleVolumeChange(e)}
			/>
		</div>
	</div>
	<div
		class="flex justify-center items-center text-sm bg-gray-400 h-10 text-gray-800 font-bold w-10"
	>
		{#if zeroBasedVolume <= -80}
			-<span class="text-lg">∞</span>
		{:else}
			{zeroBasedVolume > 0 ? "+" : ""}{zeroBasedVolume}
		{/if}
	</div>
</div>

<style lang="less">
	@track-color: #4b5563;
	@thumb-color: #4b5563;

	@thumb-radius: 8px;
	@thumb-height: 30px;
	@thumb-width: 50px;
	@thumb-shadow-size: 1px;
	@thumb-shadow-blur: 1px;
	@thumb-shadow-color: #111;
	@thumb-border-width: 1px;
	@thumb-border-color: white;

	@track-width: 100%;
	@track-height: 10px;
	@track-shadow-size: 2px;
	@track-shadow-blur: 2px;
	@track-shadow-color: #222;
	@track-border-width: 1px;
	@track-border-color: black;

	@track-radius: 5px;
	@contrast: 20%;

	.shadow(@shadow-size,@shadow-blur,@shadow-color) {
		box-shadow: @shadow-size @shadow-size @shadow-blur @shadow-color,
			0px 0px @shadow-size lighten(@shadow-color, 5%);
	}

	.track() {
		width: @track-width;
		height: @track-height;
		cursor: pointer;
	}

	.thumb() {
		.shadow(@thumb-shadow-size,@thumb-shadow-blur,@thumb-shadow-color);
		border: @thumb-border-width solid @thumb-border-color;
		height: @thumb-height;
		width: @thumb-width;
		border-radius: @thumb-radius;
		background: @thumb-color;
		cursor: pointer;
	}

	input[type="range"] {
		background-color: transparent;
		-webkit-appearance: none;
		margin: @thumb-height / 2 0;
		width: @track-width;

		&:focus {
			outline: none;
		}

		&::-webkit-slider-runnable-track {
			.track();
			.shadow(@track-shadow-size,@track-shadow-blur,@track-shadow-color);
			background: @track-color;
			border-radius: @track-radius;
			border: @track-border-width solid @track-border-color;
		}

		&::-webkit-slider-thumb {
			.thumb();
			-webkit-appearance: none;
			margin-top: ((-@track-border-width * 2 + @track-height) / 2) - (@thumb-height / 2);
		}

		&:focus::-webkit-slider-runnable-track {
			background: lighten(@track-color, @contrast);
		}

		&::-moz-range-track {
			.track();
			.shadow(@track-shadow-size,@track-shadow-blur,@track-shadow-color);
			background: @track-color;
			border-radius: @track-radius;
			border: @track-border-width solid @track-border-color;
		}
		&::-moz-range-thumb {
			.thumb();
		}

		&::-ms-track {
			.track();
			background: transparent;
			border-color: transparent;
			border-width: @thumb-width 0;
			color: transparent;
		}

		&::-ms-fill-lower {
			background: darken(@track-color, @contrast);
			border: @track-border-width solid @track-border-color;
			border-radius: @track-radius*2;
			.shadow(@track-shadow-size,@track-shadow-blur,@track-shadow-color);
		}
		&::-ms-fill-upper {
			background: @track-color;
			border: @track-border-width solid @track-border-color;
			border-radius: @track-radius*2;
			.shadow(@track-shadow-size,@track-shadow-blur,@track-shadow-color);
		}
		&::-ms-thumb {
			.thumb();
		}
		&:focus::-ms-fill-lower {
			background: @track-color;
		}
		&:focus::-ms-fill-upper {
			background: lighten(@track-color, @contrast);
		}
	}
</style>
