import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActivationInfo from './ActivationInfo';
import texts from '../../texts';

test('renders ActivationInfo with correct text in Polish', () => {
    const language = 'pl'; // Wybierz język do testowania
    render(<ActivationInfo language={language} />);

    // Sprawdzamy, czy tytuł jest poprawny
    const titleElement = screen.getByText(texts[language].accountActivation);
    expect(titleElement).toBeInTheDocument();

    // Sprawdzamy, czy wiadomość jest poprawna
    const messageElement = screen.getByText(texts[language].activationInfoMessage);
    expect(messageElement).toBeInTheDocument();
});

test('renders ActivationInfo with correct text in English', () => {
    const language = 'en'; // Wybierz inny język do testowania
    render(<ActivationInfo language={language} />);

    // Sprawdzamy, czy tytuł jest poprawny
    const titleElement = screen.getByText(texts[language].accountActivation);
    expect(titleElement).toBeInTheDocument();

    // Sprawdzamy, czy wiadomość jest poprawna
    const messageElement = screen.getByText(texts[language].activationInfoMessage);
    expect(messageElement).toBeInTheDocument();
});