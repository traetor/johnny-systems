// src/components/Footer/Footer.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    const currentYear = new Date().getFullYear();

    test('renders copyright text in English', () => {
        render(<Footer language="en" />);
        const text = `© ${currentYear} Johnny Systems. All rights reserved.`;
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    test('renders copyright text in Polish', () => {
        render(<Footer language="pl" />);
        const text = `© ${currentYear} Johnny Systems. Wszelkie prawa zastrzeżone.`;
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    test('renders copyright text in German', () => {
        render(<Footer language="de" />);
        const text = `© ${currentYear} Johnny Systems. Alle Rechte vorbehalten.`;
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});