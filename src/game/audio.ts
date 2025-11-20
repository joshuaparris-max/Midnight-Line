/**
 * Audio system for The Midnight Line
 * Provides hooks for music, sound effects, and ambient sounds
 * All implementations are placeholder stubs ready for real audio engine integration
 */
import { Howl, Howler } from 'howler';

export type AudioTrack = 'train_hub' | 'station_regret' | 'station_unsent' | 'station_beginning' | 'title' | 'epilogue';
export type SFXType = 'choice_select' | 'train_depart' | 'heart_open' | 'heart_close' | 'station_arrival' | 'transition';
export type AmbientType = 'train_hum' | 'station_echo' | 'wind' | 'silence';

export interface AudioManager {
  playMusic(track: AudioTrack, fade?: boolean): void;
  stopMusic(fade?: boolean): void;
  playSFX(sfx: SFXType, volume?: number): void;
  startAmbient(ambient: AmbientType, volume?: number): void;
  stopAmbient(ambient: AmbientType, fade?: boolean): void;
  setMasterVolume(vol: number): void;
  setMusicVolume(vol: number): void;
  setSFXVolume(vol: number): void;
}

/**
 * Placeholder audio manager - replace with real implementation
 */
class HowlerAudioManager implements AudioManager {
  private musicHowl: Howl | null = null;
  private ambientHowls: Record<AmbientType, Howl> = {
    train_hum: new Howl({ src: ['/audio/ambient_train.mp3'], loop: true }),
    station_echo: new Howl({ src: ['/audio/ambient_echo.mp3'], loop: true }),
    wind: new Howl({ src: ['/audio/ambient_wind.mp3'], loop: true }),
    silence: new Howl({ src: [''], loop: true })
  };
  private sfxVolume = 0.5;
  private musicVolume = 0.7;
  private masterVolume = 1.0;

  playMusic(track: AudioTrack, fade = false) {
    if (this.musicHowl) {
      if (fade) {
        this.musicHowl.fade(this.musicVolume, 0, 500);
        setTimeout(() => this.musicHowl?.stop(), 500);
      } else {
        this.musicHowl.stop();
      }
    }
    const src = musicFiles[track];
    if (src) {
      this.musicHowl = new Howl({ src: [src], volume: this.musicVolume * this.masterVolume, loop: true });
      this.musicHowl.play();
    }
  }

  stopMusic(fade = false) {
    if (this.musicHowl) {
      if (fade) {
        this.musicHowl.fade(this.musicVolume, 0, 500);
        setTimeout(() => this.musicHowl?.stop(), 500);
      } else {
        this.musicHowl.stop();
      }
      this.musicHowl = null;
    }
  }

  playSFX(sfx: SFXType, volume = 1.0) {
    const src = sfxFiles[sfx];
    if (src) {
      const howl = new Howl({ src: [src], volume: volume * this.sfxVolume * this.masterVolume });
      howl.play();
    }
  }

  startAmbient(ambient: AmbientType, volume = 0.5) {
    if (ambientFiles[ambient]) {
      if (!this.ambientHowls[ambient]) {
        this.ambientHowls[ambient] = new Howl({ src: [ambientFiles[ambient]], volume: volume * this.masterVolume, loop: true });
      }
      this.ambientHowls[ambient].play();
    }
  }

  stopAmbient(ambient: AmbientType, fade = false) {
    const howl = this.ambientHowls[ambient];
    if (howl) {
      if (fade) {
        const currentVolume = howl.volume() || 0; // Ensure a valid number is used
        howl.fade(currentVolume, 0, 500);
        setTimeout(() => howl.stop(), 500);
      } else {
        howl.stop();
      }
      delete this.ambientHowls[ambient];
    }
  }

  setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    Howler.volume(this.masterVolume);
  }

  setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicHowl) this.musicHowl.volume(this.musicVolume * this.masterVolume);
  }

  setSFXVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }
}

// Ensure the correct HowlerAudioManager class is used
export const audioManager: AudioManager = new HowlerAudioManager();

/**
 * Helper: Play station-specific music based on current station
 */
export function playStationMusic(stationId: 'regret' | 'unsent_messages' | 'beginning_again') {
  const trackMap: Record<string, AudioTrack> = {
    regret: 'station_regret',
    unsent_messages: 'station_unsent',
    beginning_again: 'station_beginning'
  };
  audioManager.playMusic(trackMap[stationId], true);
}

/**
 * Helper: Transition between audio states
 */
export function transitionAudio(from: AudioTrack, to: AudioTrack) {
  audioManager.playSFX('transition');
  audioManager.stopMusic(true);
  setTimeout(() => {
    audioManager.playMusic(to, true);
  }, 500);
}

// Ensure musicFiles, sfxFiles, and ambientFiles are defined in the correct scope
const musicFiles: Record<AudioTrack, string> = {
  train_hub: '/audio/train_hub.mp3',
  station_regret: '/audio/station_regret.mp3',
  station_unsent: '/audio/station_unsent.mp3',
  station_beginning: '/audio/station_beginning.mp3',
  title: '/audio/title.mp3',
  epilogue: '/audio/epilogue.mp3'
};

const sfxFiles: Record<SFXType, string> = {
  choice_select: '/audio/sfx_choice.mp3',
  train_depart: '/audio/sfx_depart.mp3',
  heart_open: '/audio/sfx_heart_open.mp3',
  heart_close: '/audio/sfx_heart_close.mp3',
  station_arrival: '/audio/sfx_arrival.mp3',
  transition: '/audio/sfx_transition.mp3'
};

const ambientFiles: Record<AmbientType, string> = {
  train_hum: '/audio/ambient_train.mp3',
  station_echo: '/audio/ambient_echo.mp3',
  wind: '/audio/ambient_wind.mp3',
  silence: ''
};
