import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import './multiRangeSlider.scss';

interface MultiRangeSliderProps {
  title: string;
  min: number;
  max: number;
  currentRangeSliderState: { min: number; max: number };
  resetFormState: boolean;
  step?: number | undefined;
  onChange: Function;
}

export const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  title,
  min,
  max,
  step = 1,
  currentRangeSliderState,
  resetFormState,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(currentRangeSliderState.min);
  const [maxVal, setMaxVal] = useState(currentRangeSliderState.max);
  const minValRef = useRef(currentRangeSliderState.min);
  const maxValRef = useRef(currentRangeSliderState.max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (resetFormState === true) {
      setMinVal(min);
      setMaxVal(max);
      minValRef.current = min;
      maxValRef.current = max;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFormState]);

  return (
    <div className='filter__item'>
      <h5 className='filter__item-title'>{title}</h5>
      <form className='range-container'>
        <input
          type='range'
          min={min}
          max={max}
          value={minVal}
          step={step ? step : 1}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          onMouseUp={() => onChange({ min: minVal, max: maxVal })}
          className='thumb thumb--left'
          // @ts-ignore
          style={{ zIndex: minVal > max - 100 ? '5' : undefined }}
          data-testid='sliderMinElement'
        />
        <input
          type='range'
          min={min}
          max={max}
          step={step ? step : 0}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          onMouseUp={() => onChange({ min: minVal, max: maxVal })}
          className='thumb thumb--right'
          data-testid='sliderMaxElement'
        />

        <div className='slider'>
          <div className='slider__track'></div>
          <div ref={range} className='slider__range'></div>
          <div className='slider__left-value' data-testid='sliderMinValue'>
            {minVal}
          </div>
          <div className='slider__right-value' data-testid='sliderMaxValue'>
            {maxVal}
          </div>
        </div>
      </form>
    </div>
  );
};
