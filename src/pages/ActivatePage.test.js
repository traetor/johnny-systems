import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActivatePage from './ActivatePage';
import axios from 'axios';
import texts from '../texts';

// Mockowanie axios
jest.mock('axios');

// Mockowanie react-router-dom i zapisywanie mocka `useNavigate` do zmiennej
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ActivatePage', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Czyszczenie mocków przed każdym testem
    });

    it('should render activation error message on API error', async () => {
        axios.get.mockRejectedValueOnce(new Error('API Error'));

        render(
            <MemoryRouter>
                <ActivatePage language="en" />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(texts.en.activationErrorMessage)).toBeInTheDocument();
        });
    });

    it('should navigate to home on button click', async () => {
        axios.get.mockResolvedValueOnce({ data: { message: 'Activation success' } });

        render(
            <MemoryRouter>
                <ActivatePage language="en" />
            </MemoryRouter>
        );

        const button = screen.getByText(texts.en.login);
        button.click();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});
