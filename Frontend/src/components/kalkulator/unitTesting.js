import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import KalkulatorInvestasi from './KalkulatorInvestasi';

// Mock calculate functions if necessary
jest.mock('./KalkulatorInvestasi', () => ({
  ...jest.requireActual('./KalkulatorInvestasi'),
  calculateFutureValue: jest.fn(),
  calculateRequiredMonthlyInvestment: jest.fn(),
  calculateRequiredDuration: jest.fn(),
}));

describe('KalkulatorInvestasi Component', () => {
  test('input handling and formatting', () => {
    const { getByPlaceholderText } = render(<KalkulatorInvestasi username="testuser" />);
    const inputElement = getByPlaceholderText('0');

    fireEvent.change(inputElement, { target: { value: '1000' } });
    expect(inputElement.value).toBe('1,000');
  });

  test('button group handling', () => {
    const { getByText } = render(<KalkulatorInvestasi username="testuser" />);
    const buttonElement = getByText('Setiap Bulan');

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveClass('active');
  });

  test('calculateFutureValue function', () => {
    const initialAmount = 1000;
    const monthlyInvestment = 100;
    const annualReturnRate = 5;
    const years = 10;
    const expectedFutureValue = 15762.82; // Calculate this value based on the formula

    const result = calculateFutureValue(initialAmount, monthlyInvestment, annualReturnRate, years);
    expect(result).toBeCloseTo(expectedFutureValue, 2);
  });

  test('form submission', () => {
    const { getByText, getByPlaceholderText } = render(<KalkulatorInvestasi username="testuser" />);

    fireEvent.change(getByPlaceholderText('0'), { target: { value: '1000000' } });
    fireEvent.change(getByPlaceholderText('0'), { target: { value: '10' } });
    fireEvent.change(getByPlaceholderText('0'), { target: { value: '50000' } });
    fireEvent.change(getByPlaceholderText('0'), { target: { value: '5' } });

    fireEvent.click(getByText('Ayo lihat hasil strategimu'));

    expect(getByText(/Selamat/)).toBeInTheDocument();
  });
});
