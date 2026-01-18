import React, { useEffect, useState, useCallback, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function TypeWriter({ text, speed = 50, delay = 0 }: TypeWriterProps): React.ReactElement {
  const [displayText, setDisplayText] = useState('');
  const debounceTimeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const liveRegionRef = useRef<HTMLSpanElement>(null);

  const startTyping = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    currentIndexRef.current = 0;
    setDisplayText('');
    
    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      
      const char = text[currentIndexRef.current];
      if (char !== undefined && char !== null) {
        setDisplayText((prevText) => prevText + char);
        currentIndexRef.current++;
      }
    }, speed);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setDisplayText('');
    currentIndexRef.current = 0;
    
    debounceTimeoutRef.current = setTimeout(() => {
      let cleanup: (() => void) | undefined;
      
      if (delay > 0) {
        const delayTimeout = setTimeout(() => {
          cleanup = startTyping();
        }, delay);

        return () => {
          clearTimeout(delayTimeout);
          if (cleanup) {
            cleanup();
          }
        };
      } else {
        cleanup = startTyping();
        return cleanup;
      }
    }, 100);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, delay, speed, startTyping]);

  // Atualiza a região live para leitores de tela
  useEffect(() => {
    if (liveRegionRef.current && displayText === text) {
      liveRegionRef.current.textContent = text;
    }
  }, [displayText, text]);

  return (
    <>
      <span className="typewriter" aria-live="polite" aria-atomic="true">
        {displayText}
        <span className="cursor animate-pulse" aria-hidden="true">_</span>
      </span>
      <span ref={liveRegionRef} className="sr-only" aria-live="polite" aria-atomic="true">
        {displayText === text ? text : ''}
      </span>
    </>
  );
}
