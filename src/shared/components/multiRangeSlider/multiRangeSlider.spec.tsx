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

  let sliderMinElement: HTMLElement;
  let sliderMaxElement: HTMLElement;
  let sliderMinValue: HTMLElement;
  let sliderMaxValue: HTMLElement;

  beforeEach(() => {
    const { getByTestId } = render(
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

    sliderMinElement = getByTestId('sliderMinElement');
    sliderMaxElement = getByTestId('sliderMaxElement');
    sliderMinValue = getByTestId('sliderMinValue');
    sliderMaxValue = getByTestId('sliderMaxValue');
  });

  it('When mounts initial value', () => {
    expect(sliderMinValue).toHaveTextContent(princeRangeState.min.toString());
    expect(sliderMaxValue).toHaveTextContent(princeRangeState.max.toString());
  });

  it('When slider value between range', () => {
    fireEvent.change(sliderMinElement, {
      target: { value: 1000 },
    });

    fireEvent.change(sliderMaxElement, {
      target: { value: 55000 },
    });

    expect(sliderMinValue).toHaveTextContent('1000');
    expect(sliderMaxValue).toHaveTextContent('55000');
  });

  it('When slider value more than max and more than min', () => {
    fireEvent.change(sliderMinElement, {
      target: { value: 100 },
    });

    fireEvent.change(sliderMaxElement, {
      target: { value: 90000 },
    });

    expect(sliderMinValue).toHaveTextContent('200');
    expect(sliderMaxValue).toHaveTextContent('85000');
  });
});
