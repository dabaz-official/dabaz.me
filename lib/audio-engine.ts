/**
 * Generative ambient engine — "A terminal you can play."
 *
 * A saw pad softened by warm drive + lowpass, a slowly gliding pad voice,
 * and occasional timbres (pentatonic pings, rare noise swells) over a
 * D-dorian drone. Muted by default — everything starts from a user gesture.
 */

const A4_HZ = 440;
const MIDI_A4 = 69;

function midiToFreq(midi: number): number {
  return A4_HZ * Math.pow(2, (midi - MIDI_A4) / 12);
}

/** Slow up-and-down cycle for the gliding pad voice (D dorian). */
const PAD_CYCLE = [50, 53, 55, 57, 60, 62, 60, 57, 55, 53];

/** Pentatonic pool for the occasional pings. */
const PING_POOL = [62, 65, 67, 69, 72, 74, 77];

const PING_D4 = midiToFreq(62);

function softDriveCurve(): Float32Array {
  const samples = 1024;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i += 1) {
    const x = (i / (samples - 1)) * 2 - 1;
    curve[i] = Math.tanh(1.6 * x);
  }
  return curve;
}

function impulseResponse(ctx: AudioContext, seconds = 2.6): AudioBuffer {
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * seconds);
  const buffer = ctx.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.8);
    }
  }
  return buffer;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private reverb: ConvolverNode | null = null;
  private pingBus: GainNode | null = null;
  private padVoice: OscillatorNode | null = null;
  private padStep = 0;
  private ticker: ReturnType<typeof setInterval> | null = null;
  private fadeTimer: ReturnType<typeof setTimeout> | null = null;
  private nextPingAt = 0;
  private nextSwellAt = 0;
  private nextPadAt = 0;

  constructor() {
    if (typeof window !== "undefined") {
      (window as unknown as { __dabazAudio?: AudioEngine }).__dabazAudio = this;
    }
  }

  get running(): boolean {
    return this.ctx?.state === "running";
  }

  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  start(): void {
    if (!this.ctx) this.buildGraph();
    const ctx = this.ctx as AudioContext;
    const master = this.master as GainNode;
    void ctx.resume();
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0.65, t + 2.5);
    this.nextPingAt = t + 3 + Math.random() * 4;
    this.nextSwellAt = t + 15 + Math.random() * 10;
    this.nextPadAt = t + 10;
    if (!this.ticker) {
      this.ticker = setInterval(() => this.tick(), 400);
    }
  }

  stop(): void {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const master = this.master;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0.0001, t + 1.4);
    if (this.ticker) {
      clearInterval(this.ticker);
      this.ticker = null;
    }
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
    }
    this.fadeTimer = setTimeout(() => {
      void ctx.suspend();
    }, 1600);
  }

  private buildGraph(): void {
    const ctx = new AudioContext();
    this.ctx = ctx;

    // master → analyser → compressor → out
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 12;
    compressor.ratio.value = 3;
    master.connect(analyser);
    analyser.connect(compressor);
    compressor.connect(ctx.destination);
    this.master = master;
    this.analyser = analyser;

    // shared procedural reverb
    const reverb = ctx.createConvolver();
    reverb.buffer = impulseResponse(ctx);
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.4;
    reverb.connect(reverbGain);
    reverbGain.connect(master);
    this.reverb = reverb;

    // ---- pad bus: saws → warm drive → breathing lowpass → out
    const padBus = ctx.createGain();
    padBus.gain.value = 0.5;
    const shaper = ctx.createWaveShaper();
    shaper.curve = softDriveCurve();
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 760;
    lowpass.Q.value = 0.8;
    padBus.connect(shaper);
    shaper.connect(lowpass);
    lowpass.connect(master);
    const padSend = ctx.createGain();
    padSend.gain.value = 0.25;
    lowpass.connect(padSend);
    padSend.connect(reverb);

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.05;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 220;
    lfo.connect(lfoDepth);
    lfoDepth.connect(lowpass.frequency);
    lfo.start();

    // drone: root + fifth, slightly detuned saw pair for width
    this.voice(midiToFreq(38), 0.14, padBus, 0);
    this.voice(midiToFreq(38) * 1.004, 0.1, padBus, 0.4);
    this.voice(midiToFreq(45), 0.11, padBus, -0.35);

    // gliding pad voice
    const pad = ctx.createOscillator();
    pad.type = "sawtooth";
    pad.frequency.value = midiToFreq(PAD_CYCLE[0]);
    const padGain = ctx.createGain();
    padGain.gain.value = 0.12;
    pad.connect(padGain);
    padGain.connect(padBus);
    pad.start();
    this.padVoice = pad;

    // ---- ping bus with feedback delay
    const pingBus = ctx.createGain();
    pingBus.gain.value = 0.5;
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.38;
    const delayTone = ctx.createBiquadFilter();
    delayTone.type = "lowpass";
    delayTone.frequency.value = 2400;
    pingBus.connect(delay);
    delay.connect(delayTone);
    delayTone.connect(feedback);
    feedback.connect(delay);
    pingBus.connect(master);
    delayTone.connect(master);
    const pingSend = ctx.createGain();
    pingSend.gain.value = 0.5;
    delayTone.connect(pingSend);
    pingSend.connect(reverb);
    this.pingBus = pingBus;
  }

  private voice(freq: number, gain: number, bus: GainNode, pan: number): void {
    const ctx = this.ctx as AudioContext;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const voiceGain = ctx.createGain();
    voiceGain.gain.value = gain;
    const panner = ctx.createStereoPanner();
    panner.pan.value = pan;
    osc.connect(voiceGain);
    voiceGain.connect(panner);
    panner.connect(bus);
    osc.start();
  }

  private tick(): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    if (t >= this.nextPingAt) {
      this.schedulePing(t + 0.05);
      this.nextPingAt = t + 4 + Math.random() * 7;
    }
    if (t >= this.nextPadAt) {
      this.glidePad(t);
      this.nextPadAt = t + 10;
    }
    if (t >= this.nextSwellAt) {
      this.scheduleSwell(t + 0.1);
      this.nextSwellAt = t + 18 + Math.random() * 22;
    }
  }

  private glidePad(t: number): void {
    if (!this.padVoice) return;
    this.padStep = (this.padStep + 1) % PAD_CYCLE.length;
    const freq = midiToFreq(PAD_CYCLE[this.padStep]);
    const param = this.padVoice.frequency;
    param.cancelScheduledValues(t);
    param.setValueAtTime(Math.max(param.value, 1), t);
    param.exponentialRampToValueAtTime(freq, t + 6);
  }

  private schedulePing(t: number): void {
    const ctx = this.ctx as AudioContext;
    const midi = PING_POOL[Math.floor(Math.random() * PING_POOL.length)];
    const freq = midiToFreq(midi);
    const osc = ctx.createOscillator();
    osc.type = Math.random() > 0.5 ? "triangle" : "sine";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    const level = 0.18 * (PING_D4 / freq) + 0.03;
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.random() * 1.4 - 0.7;
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.pingBus as GainNode);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(level, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8 + Math.random() * 1.6);
    osc.start(t);
    osc.stop(t + 3.8);
  }

  private scheduleSwell(t: number): void {
    const ctx = this.ctx as AudioContext;
    const seconds = 7 + Math.random() * 4;
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.Q.value = 2.2;
    bandpass.frequency.setValueAtTime(220, t);
    bandpass.frequency.exponentialRampToValueAtTime(880, t + seconds * 0.55);
    bandpass.frequency.exponentialRampToValueAtTime(300, t + seconds);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + seconds * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.master as GainNode);
    const send = ctx.createGain();
    send.gain.value = 0.6;
    gain.connect(send);
    send.connect(this.reverb as ConvolverNode);
    noise.start(t);
    noise.stop(t + seconds + 0.1);
  }
}
