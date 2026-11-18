/**
 * Browser Speech Recognition Helper for Undernote
 * Uses native Web Speech API (Safari iOS, Chrome, Edge, Android)
 */

export interface SpeechRecognitionHandlers {
  onTranscript: (text: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

export function startSpeechRecognition(
  handlers: SpeechRecognitionHandlers
): { stop: () => void } | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    handlers.onError(
      'Speech recognition is not supported in this browser. Please type directly.'
    );
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const text = (final || interim).trim();
      if (text) {
        handlers.onTranscript(text, Boolean(final));
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition notice:', event.error);
      if (event.error === 'not-allowed') {
        handlers.onError(
          'Microphone permission was denied. Please allow microphone access in your browser settings.'
        );
      } else if (event.error !== 'no-speech') {
        handlers.onError(`Microphone notice: ${event.error}`);
      }
      handlers.onEnd();
    };

    recognition.onend = () => {
      handlers.onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  } catch (err: any) {
    console.error('Speech recognition exception:', err);
    handlers.onError('Could not initialize microphone. Please check browser permissions.');
    return null;
  }
}
