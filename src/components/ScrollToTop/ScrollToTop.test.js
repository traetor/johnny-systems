// src/components/ScrollToTop.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop Component', () => {
    beforeEach(() => {
        // Resetujemy mocka przed każdym testem
        jest.clearAllMocks();
    });

    test('scrolls to top on pathname change', () => {
        // Tworzymy mock dla window.scrollTo
        const scrollToMock = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

        // Renderujemy komponent w kontekście routera i Routes
        render(
            <Router>
                <Routes>
                    <Route path="/" element={<ScrollToTop />} />
                    {/* Możemy umieścić tutaj dodatkowe komponenty, jeśli są potrzebne */}
                </Routes>
            </Router>
        );

        // Wymuszamy zmianę ścieżki
        window.history.pushState({}, '', '/new-page');

        // Sprawdzamy, czy window.scrollTo zostało wywołane
        expect(scrollToMock).toHaveBeenCalledWith(0, 0);

        // Przywracamy oryginalną implementację
        scrollToMock.mockRestore();
    });
});