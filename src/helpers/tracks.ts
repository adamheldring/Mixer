import type { ToneAudioBuffersUrlMap } from "tone";

import track1 from "../assets/sounds/NOLIMITER_01_DRUMS_FX_230110.wav";
import track2 from "../assets/sounds/NOLIMITER_02_BEAT_FX_230110.wav";
import track3 from "../assets/sounds/NOLIMITER_03_PIANO_FX_230110.wav";
import track4 from "../assets/sounds/NOLIMITER_04_LEAD_SYNTH_FX_230110.wav";
import track5 from "../assets/sounds/NOLIMITER_05_BASS_ELECTRIC_FX_230110.wav";
import track6 from "../assets/sounds/NOLIMITER_06_BASS_SYNTH_FX_230110.wav";
import track7 from "../assets/sounds/NOLIMITER_07_STRINGS_FX_230110.wav";
import track8 from "../assets/sounds/NOLIMITER_08_ORGAN_FX_230110.wav";
import track9 from "../assets/sounds/NOLIMITER_09_SHAKER_FX_230110.wav";
import track10 from "../assets/sounds/NOLIMITER_10_CLAP_FX_230110.wav";

export const channelNames = ["drums", "lead", "bass", "pad", "shaker"];

export const trackNames = [
	"drums_drumkit",
	"drums_beat",
	"lead_piano",
	"lead_synth",
	"bass_electric",
	"bass_synth",
	"pad_strings",
	"pad_organ",
	"shaker_tamb",
	"shaker_claps"
];

export const TRACKS: ToneAudioBuffersUrlMap = {
	[trackNames[0]]: track1,
	[trackNames[1]]: track2,
	[trackNames[2]]: track3,
	[trackNames[3]]: track4,
	[trackNames[4]]: track5,
	[trackNames[5]]: track6,
	[trackNames[6]]: track7,
	[trackNames[7]]: track8,
	[trackNames[8]]: track9,
	[trackNames[9]]: track10
};
