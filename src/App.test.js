import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Smart Goal Planner/i);
  expect(titleElement).toBeInTheDocument();
});
