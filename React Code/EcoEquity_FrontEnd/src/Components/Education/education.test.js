import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import EducationComp from './EducationComp';

test('renders Environmental card', () => {
    render(<EducationComp />);
    const value = screen.getByText(/Conservation of the natural world/i);
    expect(value).toBeInTheDocument();
});

test('renders Social card', () => {
    render(<EducationComp />);
    const value = screen.getByText(/Consideration of people & relationships/i);
    expect(value).toBeInTheDocument();
});

test('renders Governance card', () => {
    render(<EducationComp />);
    const value = screen.getByText(/Standards for running a company/i);
    expect(value).toBeInTheDocument();
});

test('renders title', () => {
    render(<EducationComp />);
    const value = screen.getByText(/Are You Committed to Sustainable Investing?/i);
    expect(value).toBeInTheDocument();
});

// test('feedback post', () => {
//   render(<EducationComp />);
//   fireEvent.click(screen.getByText(/Post Question/i))
//   const value = screen.getByText("Question Posted!")
//   expect(value).toBeInTheDocument();
// });