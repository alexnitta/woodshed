import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders @woodshed/web-cra header', () => {
    render(<App />);
    const linkElement = screen.getByText(/@woodshed\/web-cra/i);

    expect(linkElement).toBeInTheDocument();
});
