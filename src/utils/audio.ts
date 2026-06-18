// Simple, high-quality Web Audio API sound generator for subtle user interactions.
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    // Standard and vendor prefixed support
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  return audioCtx;
}

export function playHoverSound(type: 'soft' | 'pluck' | 'nodal' | 'success' = 'soft') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'nodal') {
      // Elegant crystal-like pitch resonance for 3D Node mouse hover
      osc.type = 'sine';
      // High, crystal-clear bell-like tone
      const freq = 650 + Math.random() * 350; 
      osc.frequency.setValueAtTime(freq, now);
      
      gainNode.gain.setValueAtTime(0, now);
      // Fast attack
      gainNode.gain.linearRampToValueAtTime(0.015, now + 0.005);
      // Exponential beautiful decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'pluck') {
      // Warm, distinct string-like pluck for project cards
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(147.14, now); // D3 frequency - clean and meditative
      
      // Add a quick feedback octave harmonizer
      osc.frequency.exponentialRampToValueAtTime(294.28, now + 0.08); // slide up to D4
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.024, now + 0.008);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      
      osc.start(now);
      osc.stop(now + 0.32);
    } else if (type === 'success') {
      // Sparkly double pitch for successful transactions/checks
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.setValueAtTime(523.25, now + 0.08); // High C5
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.03, now + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      
      osc.start(now);
      osc.stop(now + 0.42);
    } else {
      // Default extremely soft hover beep for small UI triggers
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now); // Middle C4
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.008, now + 0.004);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (err) {
    // Blocked autoplays or unsupported platforms should fail silently
    console.debug('Web Audio context not allowed or initialized yet:', err);
  }
}
