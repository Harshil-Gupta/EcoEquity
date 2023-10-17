import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ROICalculator from "./ROICalculator";

test("renders ROICalculator component without errors", () => {
  render(<ROICalculator />);
});

test("can input initial investment and final value", () => {
  render(<ROICalculator />);
  const initialInvestmentInput = screen.getByPlaceholderText("Enter initial investment");
  const finalValueInput = screen.getByPlaceholderText("Enter final value");

  fireEvent.change(initialInvestmentInput, { target: { value: "1000" } });
  fireEvent.change(finalValueInput, { target: { value: "1500" } });

  expect(initialInvestmentInput.value).toBe("1000");
  expect(finalValueInput.value).toBe("1500");
});

test("can input start and end date", () => {
  render(<ROICalculator />);
  const startDateInput = screen.getByLabelText("Start Date");
  const endDateInput = screen.getByLabelText("End Date");

  fireEvent.change(startDateInput, { target: { value: "2023-01-01" } });
  fireEvent.change(endDateInput, { target: { value: "2023-12-31" } });

  expect(startDateInput.value).toBe("2023-01-01");
  expect(endDateInput.value).toBe("2023-12-31");
});

test("can calculate ROI", async () => {
  render(<ROICalculator />);
  const initialInvestmentInput = screen.getByPlaceholderText("Enter initial investment");
  const finalValueInput = screen.getByPlaceholderText("Enter final value");
  const startDateInput = screen.getByLabelText("Start Date");
  const endDateInput = screen.getByLabelText("End Date");

  fireEvent.change(initialInvestmentInput, { target: { value: "1000" } });
  fireEvent.change(finalValueInput, { target: { value: "1500" } });
  fireEvent.change(startDateInput, { target: { value: "2023-01-01" } });
  fireEvent.change(endDateInput, { target: { value: "2023-12-31" } });

  const calculateButton = screen.getByText("Calculate ROI");
  fireEvent.click(calculateButton);

  // You can add assertions here to check for the calculated results
  await waitFor(() => {
    const investmentGain = screen.getByText("Investment Gain:");
    const roi = screen.getByText("ROI:");
    const annualizedROI = screen.getByText("Annualized ROI:");
    const investmentLength = screen.getByText("Investment Length (Days):");
    const investedAmount = screen.getByText("Invested Amount:");
    const profitPercentage = screen.getByText("Profit Percentage:");

    expect(investmentGain).toBeInTheDocument();
    expect(roi).toBeInTheDocument();
    expect(annualizedROI).toBeInTheDocument();
    expect(investmentLength).toBeInTheDocument();
    expect(investedAmount).toBeInTheDocument();
    expect(profitPercentage).toBeInTheDocument();
  });
});
