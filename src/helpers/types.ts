import type { Gain, Player } from "tone";

export interface Channel {
	name: string;
	gainNode: Gain<"gain">;
	players: Player[];
	isMuted: boolean;
	instrumentNames: string[];
}
