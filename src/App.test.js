
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Weather APP header', () => {
  render(<App />);
  const header = screen.getByText(/Weather APP/i);
  expect(header).toBeInTheDocument();
});
