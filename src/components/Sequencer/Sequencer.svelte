<script lang="ts">
	import type { Player, Gain, Meter } from "tone";
	import type { Channel } from "../../helpers/types";
	import { onMount } from "svelte";
	import * as Tone from "tone";
	import { TRACKS, trackNames, channelNames } from "../../helpers/tracks";

	import Mixer from "../Mixer/Mixer.svelte";

	let isPlaying = false;
	let masterGainNode: Gain;
	let masterMeter: Meter;
	let channels: Channel[] = [];

	const createChannels = (
		channelGainNodes: Gain<"gain">[],
		channelMeters: Meter[],
		multiPlayer: Player[]
	): Channel[] =>
		channelNames.map((channelName, idx) => {
			const getInstrumentName = (trackName: string) => trackName.slice(trackName.indexOf("_") + 1);
			return {
				name: channelName,
				gainNode: channelGainNodes[idx],
				meter: channelMeters[idx],
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
		////////////
		// MASTER //
		////////////

		// Create master gain node
		masterGainNode = await new Tone.Gain(0.8).toDestination();

		// Create master meter
		masterMeter = new Tone.Meter({ normalRange: true, smoothing: 0.95 });
		masterGainNode.connect(masterMeter);

		//////////////
		// CHANNELS //
		//////////////

		// Create gain nodes for each channel
		const createChannelGainNodes = async () => {
			return await channelNames.map((channel) => new Tone.Gain(0.8).connect(masterGainNode));
		};
		const channelGainNodes = await createChannelGainNodes();

		// Create meters for each channel
		const createChannelMeters = async () => {
			const meters = await channelNames.map(
				(channel) => new Tone.Meter({ normalRange: true, smoothing: 0.95 })
			);
			// Connect each channel gainNode to corresponding meter
			meters.forEach((_meter, meterIdx) => channelGainNodes[meterIdx].connect(meters[meterIdx]));
			return meters;
		};
		const channelMeters = await createChannelMeters();

		//////////////////////
		// TRACKS / PLAYERS //
		//////////////////////

		// Create players for each track and connect to corresponding track
		const players = await new Tone.Players(TRACKS);
		const multiPlayer = trackNames.map((trackName) => players.player(trackName));
		multiPlayer.forEach((player, playerIdx) => {
			const gainIdx = Math.floor(playerIdx / 2);
			player.mute = true;
			player.loop = true;
			player.connect(channelGainNodes[gainIdx]).sync().start();
		});

		// Combine GainNode(for channel volume) and Players (alternate channel instrument tracks) into channel objects.
		channels = await createChannels(channelGainNodes, channelMeters, multiPlayer);
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

<Mixer {handlePlay} {handleStop} {isPlaying} {channels} {masterGainNode} {masterMeter} />
