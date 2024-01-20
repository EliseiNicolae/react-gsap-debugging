import React, { useRef, useState, useEffect } from 'react';

export function GsapControlPanel ({ timeline }) {
  const range = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelinePosition, setTimelinePosition] = useState(0);

  useEffect(() => {
    if (timeline) {
      const updateTimelinePosition = () => {
        const progress = timeline.progress();
        const percentage = progress * 100;
        setTimelinePosition(percentage);
        range.current.value = progress; // directly update the input range's value
      };

      const handleTimelineStart = () => {
        setIsPlaying(true);
      };

      const handleTimelineComplete = () => {
        setIsPlaying(false);
      };

      timeline.eventCallback("onUpdate", updateTimelinePosition);
      timeline.eventCallback("onStart", handleTimelineStart);
      timeline.eventCallback("onComplete", handleTimelineComplete);

      return () => {
        if (timeline) {
          timeline.eventCallback("onUpdate", null);
          timeline.eventCallback("onStart", null);
          timeline.eventCallback("onComplete", null);
        }
      };
    }
  }, [timeline, setTimelinePosition]);

  const handleProgressChange = (e) => {
    const progress = e.target.value;
    timeline.progress(progress);
    setTimelinePosition(progress * 100);
  };

  const playTimeline = () => {
    if (timeline.progress() === 1) {
      resetTimeline();
      return;
    }

    timeline.play();
    setIsPlaying(true);
  };

  const pauseTimeline = () => {
    timeline.pause();
    setIsPlaying(false);
  };

  const resetTimeline = () => {
    timeline.restart().play();
    setIsPlaying(true);
    range.current.value = 0;
  };

  return (
      <div className="control-panel">
        <div className="control-panel-flex">
          <input
              ref={range}
              type="range"
              min="0"
              max="1"
              step="0.000001"
              value={timelinePosition / 100}
              onChange={handleProgressChange}
              className="range-input"
          />
          <p className="timeline-position">{Number(timelinePosition).toFixed(2)}%</p>
        </div>
        <div className={"controls"}>
          <button onClick={playTimeline} disabled={isPlaying}>
            Start
          </button>
          <button onClick={pauseTimeline} disabled={!isPlaying}>
            Stop
          </button>
          <button onClick={resetTimeline}>Reset</button>
          {`   `}Status: {isPlaying ? 'Playing' : 'Paused'}
        </div>
      </div>
  );
}
