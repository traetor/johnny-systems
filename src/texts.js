const texts = {
    pl: {
        tasks: 'Zadania',
        profile: 'Profil',
        logout: 'Wyloguj się',
        login: 'Zaloguj się',
        loginPage: 'Logowanie',
        register: 'Zarejestruj się',
        switchLanguage: 'Zmień język:',
        error: 'Niewypełniono wszystkich pól',
        invalidCredentials: 'Nieprawidłowe dane logowania',
        loginError: 'Błąd logowania. Spróbuj ponownie później.',
        registerSuccess: 'Rejestracja udana',
        profileUpdated: 'Profil zaktualizowany pomyślnie',
        welcome: 'Wszystko w jednej aplikacji, dla efektywnej pracy',
        welcomeDescription: 'Zarządzaj wszystkim w jednym miejscu, dostosowanym do każdego rodzaju pracy.',
        accountNotActivated: 'Konto nie jest aktywowane. Sprawdź swój email, aby aktywować konto.',
        userNotFound: 'Użytkownik nie został znaleziony',
        accountActivation: 'Aktywacja konta',
        activationInfoMessage: 'Twoje konto zostało zarejestrowane. Sprawdź swoją skrzynkę pocztową, aby aktywować konto.',
        activationErrorMessage: 'Aktywacja nie powiodła się. Spróbuj ponownie później.',
        username: 'Nazwa użytkownika',
        email: 'Email',
        password: 'Hasło',
        confirmPassword: 'Potwierdź hasło',
        fillAllFields: 'Proszę wypełnić wszystkie pola formularza',
        validEmail: 'Proszę podać prawidłowy adres email',
        passwordLength: 'Hasło powinno mieć co najmniej 8 znaków',
        passwordSpecialChars: 'Hasło powinno zawierać co najmniej jeden znak specjalny',
        passwordMismatch: 'Potwierdzenie hasła nie pasuje',
        emailExists: 'Ten email jest już zarejestrowany',
        usernameExists: 'Ta nazwa użytkownika jest już zajęta',
        registrationError: 'Błąd podczas rejestracji. Spróbuj ponownie później.',
        rateLimitExceeded: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
        show: 'Pokaż',
        hide: 'Ukryj',
        tasksTodo: 'Do zrobienia',
        tasksInProgress: 'W trakcie',
        tasksDone: 'Gotowe',
        addTask: 'Dodaj zadanie',
        delete: 'Usuń',
        taskTitle: 'Tytuł zadania',
        taskDescription: 'Opis zadania',
        userProfile: 'Profil użytkownika',
        update: 'Aktualizuj',
        loading: 'Ładowanie...',
        addTaskError: 'Błąd dodawania zadania. Spróbuj ponownie później.',
        registration: 'Rejestracja'
    },
    en: {
        tasks: 'Tasks',
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        loginPage: 'Login Page',
        register: 'Register',
        switchLanguage: 'Switch language:',
        error: 'Please fill in all fields',
        invalidCredentials: 'Invalid credentials',
        loginError: 'Login error. Please try again later.',
        registerSuccess: 'Registration successful',
        profileUpdated: 'Profile updated successfully',
        welcome: 'The everything app, for effective work',
        welcomeDescription: 'Manage everything in one place, tailored for any type of work.',
        accountNotActivated: 'Account is not activated. Please check your email for activation link.',
        userNotFound: 'User not found',
        accountActivation: 'Account Activation',
        activationInfoMessage: 'Your account has been registered. Please check your email to activate your account.',
        activationErrorMessage: 'Activation failed. Please try again later.',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        fillAllFields: 'Please fill in all form fields',
        validEmail: 'Please enter a valid email address',
        passwordLength: 'Password should be at least 8 characters long',
        passwordSpecialChars: 'Password should contain at least one special character',
        passwordMismatch: 'Password confirmation does not match',
        emailExists: 'This email is already registered',
        usernameExists: 'This username is already taken',
        registrationError: 'Error during registration. Please try again later.',
        rateLimitExceeded: 'Too many login attempts from this IP, please try again after 15 minutes.',
        show: 'Show',
        hide: 'Hide',
        tasksTodo: 'To Do',
        tasksInProgress: 'In Progress',
        tasksDone: 'Done',
        addTask: 'Add Task',
        delete: 'Delete',
        taskTitle: 'Task Title',
        taskDescription: 'Task Description',
        userProfile: 'User Profile',
        update: 'Update',
        loading: 'Loading...',
        addTaskError: 'Error adding task. Please try again later.',
        registration: 'Registration'
    },
    de: {
        tasks: 'Aufgaben',
        profile: 'Profil',
        logout: 'Ausloggen',
        login: 'Anmelden',
        loginPage: 'Anmeldeseite',
        register: 'Registrieren',
        switchLanguage: 'Sprache wechseln:',
        error: 'Bitte füllen Sie alle Felder aus',
        invalidCredentials: 'Ungültige Anmeldeinformationen',
        loginError: 'Anmeldefehler. Bitte versuchen Sie es später erneut.',
        registerSuccess: 'Registrierung erfolgreich',
        profileUpdated: 'Profil erfolgreich aktualisiert',
        welcome: 'Alles in einer App, für effektive Arbeit',
        welcomeDescription: 'Verwalten Sie alles an einem Ort, maßgeschneidert für jede Art von Arbeit.',
        accountNotActivated: 'Konto ist nicht aktiviert. Bitte überprüfen Sie Ihre E-Mail für den Aktivierungslink.',
        userNotFound: 'Benutzer nicht gefunden',
        accountActivation: 'Kontoaktivierung',
        activationInfoMessage: 'Ihr Konto wurde registriert. Bitte überprüfen Sie Ihre E-Mail, um Ihr Konto zu aktivieren.',
        activationErrorMessage: 'Die Aktivierung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.',
        username: 'Benutzername',
        email: 'E-Mail',
        password: 'Passwort',
        confirmPassword: 'Passwort bestätigen',
        fillAllFields: 'Bitte füllen Sie alle Formularfelder aus',
        validEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        passwordLength: 'Das Passwort sollte mindestens 8 Zeichen lang sein',
        passwordSpecialChars: 'Das Passwort sollte mindestens ein Sonderzeichen enthalten',
        passwordMismatch: 'Die Passwortbestätigung stimmt nicht überein',
        emailExists: 'Diese E-Mail ist bereits registriert',
        usernameExists: 'Dieser Benutzername ist bereits vergeben',
        registrationError: 'Fehler bei der Registrierung. Bitte versuchen Sie es später erneut.',
        rateLimitExceeded: 'Zu viele Anmeldeversuche von dieser IP, bitte versuchen Sie es nach 15 Minuten erneut.',
        show: 'Zeigen',
        hide: 'Verbergen',
        tasksTodo: 'Zu erledigen',
        tasksInProgress: 'In Bearbeitung',
        tasksDone: 'Erledigt',
        addTask: 'Aufgabe hinzufügen',
        delete: 'Löschen',
        taskTitle: 'Aufgabentitel',
        taskDescription: 'Aufgabenbeschreibung',
        userProfile: 'Benutzerprofil',
        update: 'Aktualisieren',
        loading: 'Wird geladen...',
        addTaskError: 'Fehler beim Hinzufügen der Aufgabe. Bitte versuchen Sie es später erneut.',
        registration: 'Registrierung'
    }
};

export default texts;
