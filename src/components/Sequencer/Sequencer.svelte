<script lang="ts">
	import type { Player, Gain } from "tone";
	import type { Channel } from "../../helpers/types";
	import { onMount } from "svelte";
	import * as Tone from "tone";
	import { TRACKS, trackNames, channelNames } from "../../helpers/tracks";

	import Mixer from "../Mixer/Mixer.svelte";

	let channels: Channel[] = [];
	const createChannels = (gainNodes: Gain<"gain">[], multiPlayer: Player[]): Channel[] =>
		channelNames.map((channelName, idx) => {
			return {
				name: channelName,
				gainNode: gainNodes[idx],
				players: multiPlayer.slice(idx * 2, idx * 2 + 2),
				isMuted: true
			};
		});

	onMount(async () => {
		// Create gain nodes for each channel
		const createGainNodes = async () => {
			return await trackNames.map((track) => new Tone.Gain(0.8).toDestination());
		};
		const gainNodes = await createGainNodes();

		// Create players for each track and connect to corresponding track
		const players = await new Tone.Players(TRACKS);
		const multiPlayer = trackNames.map((trackName) => players.player(trackName));
		multiPlayer.forEach((player, playerIdx) => {
			const gainIdx = Math.floor(playerIdx / 2);
			player.mute = true;
			player.loop = true;
			player.connect(gainNodes[gainIdx]).sync().start();
		});

		// Combine GainNode(for channel volume) and Players (alternate channel instrument tracks) into channel objects.
		channels = await createChannels(gainNodes, multiPlayer);
	});

	const handleStop = () => {
		Tone.Transport.stop();
	};

	const handlePlay = async () => {
		await Tone.start();
		console.log("Tone started...");

		Tone.Transport.start();
	};
</script>

<Mixer {handlePlay} {handleStop} {channels} />
