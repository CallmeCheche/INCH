
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Doctors": "Doctors",
      "Services": "Services",
      "About": "About",
      "Contact": "Contact",
      "Login": "Login",
      "Register": "Register",
      "Welcome Back": "Welcome Back",
      "Enter your credentials to access your account": "Enter your credentials to access your account",
      "Email": "Email",
      "Password": "Password",
      "Forgot password?": "Forgot password?",
      "Sign In": "Sign In",
      "Or continue with": "Or continue with",
      "Don't have an account?": "Don't have an account?",
      "Sign up": "Sign up",
      // Add more keys as needed
      "HEALTHCONNECT": "HEALTHCONNECT"
    },
  },
  fr: {
    translation: {
      "Home": "Accueil",
      "Doctors": "Médecins",
      "Services": "Services",
      "About": "À propos",
      "Contact": "Contact",
      "Login": "Se connecter",
      "Register": "S'inscrire",
      "Welcome Back": "Bon retour",
      "Enter your credentials to access your account": "Entrez vos informations pour accéder à votre compte",
      "Email": "Email",
      "Password": "Mot de passe",
      "Forgot password?": "Mot de passe oublié ?",
      "Sign In": "Connexion",
      "Or continue with": "Ou continuer avec",
      "Don't have an account?": "Vous n'avez pas de compte ?",
      "Sign up": "S'inscrire",
      // Add more keys as needed
      "HEALTHCONNECT": "HEALTHCONNECT"
    },
  },
  sw: {
    translation: {
      "Home": "Nyumbani",
      "Doctors": "Madaktari",
      "Services": "Huduma",
      "About": "Kuhusu",
      "Contact": "Wasiliana",
      "Login": "Ingia",
      "Register": "Jisajili",
      "Welcome Back": "Karibu Tena",
      "Enter your credentials to access your account": "Weka maelezo yako kuingia",
      "Email": "Barua pepe",
      "Password": "Nenosiri",
      "Forgot password?": "Umesahau nenosiri?",
      "Sign In": "Ingia",
      "Or continue with": "Au endelea na",
      "Don't have an account?": "Huna akaunti?",
      "Sign up": "Jisajili",
      // Add more keys as needed
      "HEALTHCONNECT": "HEALTHCONNECT"
    },
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
});

export default i18n;

