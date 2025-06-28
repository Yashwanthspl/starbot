import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Webcafe AI welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Webcafe AI/i);
  expect(welcomeElement).toBeInTheDocument();
});
