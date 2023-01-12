import DrumkitSvg from "../assets/icons/DrumkitSvg.svelte";
import BassGuitarSvg from "../assets/icons/BassGuitarSvg.svelte";
import BeatsSvg from "../assets/icons/BeatsSvg.svelte";
import ClapsSvg from "../assets/icons/ClapsSvg.svelte";
import GrandPianoSvg from "../assets/icons/GrandPianoSvg.svelte";
import OrganSvg from "../assets/icons/OrganSvg.svelte";
import StringsSvg from "../assets/icons/StringsSvg.svelte";
import SynthSvg from "../assets/icons/SynthSvg.svelte";
import TambourineSvg from "../assets/icons/TambourineSvg.svelte";
// import ClapsAltSvg from "../assets/icons/ClapsAltSvg.svelte";

export const CHANNEL_ICONS = {
	drums: [DrumkitSvg, BeatsSvg],
	lead: [GrandPianoSvg, SynthSvg],
	bass: [BassGuitarSvg, SynthSvg],
	pad: [StringsSvg, OrganSvg],
	shaker: [TambourineSvg, ClapsSvg]
};
