<script lang="ts">
	import type { Player, Gain } from "tone";
	import type { Channel } from "../../helpers/types";
	import { onMount } from "svelte";
	import * as Tone from "tone";
	import { TRACKS, trackNames, channelNames } from "../../helpers/tracks";

	import Mixer from "../Mixer/Mixer.svelte";

	let isPlaying = false;
	let masterGainNode: Gain;
	let channels: Channel[] = [];

	const createChannels = (gainNodes: Gain<"gain">[], multiPlayer: Player[]): Channel[] =>
		channelNames.map((channelName, idx) => {
			const getInstrumentName = (trackName: string) => trackName.slice(trackName.indexOf("_") + 1);
			return {
				name: channelName,
				gainNode: gainNodes[idx],
				players: multiPlayer.slice(idx * 2, idx * 2 + 2),
				isMuted: true,
				instrumentNames: [
					getInstrumentName(trackNames[idx * 2]),
					getInstrumentName(trackNames[idx * 2 + 1])
				]
			};
		});

	const setDefault = () => {
		channels[0].isMuted = false;
		channels[1].isMuted = false;
		channels[1].gainNode.gain.rampTo(0.7, 0);
		channels[3].gainNode.gain.rampTo(0.4, 0);
		channels[4].gainNode.gain.rampTo(0.6, 0);
	};

	onMount(async () => {
		// Create master gain node
		masterGainNode = await new Tone.Gain(0.8).toDestination();
		// Create gain nodes for each channel
		const createGainNodes = async () => {
			// return await trackNames.map((track) => new Tone.Gain(0.8).toDestination());
			return await trackNames.map((track) => new Tone.Gain(0.8).connect(masterGainNode));
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
		setDefault();
	});

	const handleStop = () => {
		Tone.Transport.stop();
		isPlaying = false;
	};

	const handlePlay = async () => {
		await Tone.start();
		console.log("Tone started...");

		Tone.Transport.start();
		isPlaying = true;
	};
</script>

<Mixer {handlePlay} {handleStop} {isPlaying} {channels} {masterGainNode} />
