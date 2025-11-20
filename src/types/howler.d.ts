declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string[];
      volume?: number;
      loop?: boolean;
      autoplay?: boolean;
      onend?: () => void;
    });
    play(): void;
    stop(): void;
    fade(from: number, to: number, duration: number): void;
    volume(vol?: number): number | void;
  }

  export class Howler {
    static volume(vol?: number): number | void;
  }
}