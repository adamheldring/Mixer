<script lang="ts">
	import Speedometer from "svelte-speedometer";
	export let meterValue: number;
</script>

<div
	class="border-4 border-gray-500 bg-amber-50 rounded-md"
	style={`
				background-color: ${meterValue === 0.2 ? "#fee2e2" : "#fffbeb"};
				transition: background-color 0.3s;
				box-shadow: inset 2px 2px 0px #9ca3af, 1px 1px 0px #9ca3af, 2px 2px 0px #9ca3af;
				`}
>
	<Speedometer
		value={meterValue}
		minValue={0}
		maxValue={0.2}
		ringWidth={10}
		width={130}
		height={80}
		segments={4}
		needleColor="#4b5563"
		segmentColors={["#d1d5db", "#d1d5db", "#f87171", "#dc2626"]}
		maxSegmentLabels={0}
		currentValueText=" "
		needleTransition="easePolyOut"
		needleTransitionDuration={300}
	/>
</div>

<style>
</style>
