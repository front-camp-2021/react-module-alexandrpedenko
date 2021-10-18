import { fireEvent, cleanup, render } from '@testing-library/react';
import { MultiRangeSlider } from './MultiRangeSlider';

afterEach(cleanup);

describe('Moving RangeSlider change values', () => {
  const princeRangeState = {
    min: 200,
    max: 85000,
  };
  const resetFormState = false;
  const priceMultiRangeChange = jest.fn();

  let sliderMinElement: Element | null;
  let sliderMaxElement: Element | null;
  let sliderMinValue: Element | null;
  let sliderMaxValue: Element | null;

  beforeEach(() => {
    const { container } = render(
      <MultiRangeSlider
        title='Price'
        min={200}
        max={85000}
        step={5}
        currentRangeSliderState={princeRangeState}
        resetFormState={resetFormState}
        onChange={priceMultiRangeChange}
      />
    );

    sliderMinElement = container.querySelector('.thumb.thumb--left');
    sliderMaxElement = container.querySelector('.thumb.thumb--right');
    sliderMinValue = container.querySelector('.slider__left-value');
    sliderMaxValue = container.querySelector('.slider__right-value');
  });

  it('When mounts initial value', () => {
    expect(parseInt(sliderMinValue.textContent)).toBe(princeRangeState.min);
    expect(parseInt(sliderMaxValue.textContent)).toBe(princeRangeState.max);
  });

  it('When slider value between range', () => {
    fireEvent.change(sliderMinElement, {
      target: { value: 1000 },
    });

    fireEvent.change(sliderMaxElement, {
      target: { value: 55000 },
    });

    expect(parseInt(sliderMinValue.textContent)).toBe(1000);
    expect(parseInt(sliderMaxValue.textContent)).toBe(55000);
  });

  it('When slider value more than max and more than min', () => {
    fireEvent.change(sliderMinElement, {
      target: { value: 100 },
    });

    fireEvent.change(sliderMaxElement, {
      target: { value: 90000 },
    });

    expect(parseInt(sliderMinValue.textContent)).toBe(200);
    expect(parseInt(sliderMaxValue.textContent)).toBe(85000);
  });
});
