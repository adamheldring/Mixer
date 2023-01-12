<script lang="ts">
	import type { Player, Gain } from "tone";
	import { onMount } from "svelte";

	import { TRACKS, trackNames } from "../../helpers/tracks";
	import * as Tone from "tone";

	import Mixer from "../Mixer/Mixer.svelte";

	let multiPlayer: Player[] = [];
	let gainNodes: Gain<"gain">[] = [];

	onMount(async () => {
		// Create gain nodes for each track
		const createGainNodes = async () => {
			return await trackNames.map((track) => new Tone.Gain(0.8).toDestination());
		};
		gainNodes = await createGainNodes();
		// Create players for each track and connect to corresponding track
		const players = await new Tone.Players(TRACKS);
		multiPlayer = trackNames.map((trackName) => players.player(trackName));
		multiPlayer.forEach((player, playerIdx) => {
			player.mute = true;
			player.loop = true;
			player.connect(gainNodes[playerIdx]).sync().start();
		});
	});

	const handleStop = () => {
		Tone.Transport.stop();
	};

	const handlePlay = async () => {
		await Tone.start();
		console.log("Tone started...");

		// setInitialValues(); // TODO: Replace and

		Tone.Transport.start();
	};

	// const setInitialValues = () => {
	// 	gainNodes[2].gain.rampTo(1, 0);
	// };
</script>

<Mixer {handlePlay} {handleStop} {gainNodes} {multiPlayer} />
