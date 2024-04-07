import React, { useState, useCallback } from 'react';
import Select from 'react-select'; // Import de react-select
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [userPreferences, setUserPreferences] = useState({
      username: "AWS Projet",
      favoriteGenres: "",
      favoriteDirectors: "",
      email: "AWSProjet@email.com",
      password: ""
  });
  const [customGenre, setCustomGenre] = useState('');
  const [customDirector, setCustomDirector] = useState('');
  const [errors, setErrors] = useState({});

  const directors = ["Quentin Tarantino", "Christopher Nolan", "Greta Gerwig", "Bong Joon-ho", "Autre"];

  const validateField = useCallback((name, value) => {
      let newErrors = { ...errors };
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email invalide.';
      } else if (name === 'password' && value.length < 6) {
          newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
      } else if (name === 'username' && (!value || value.length < 3)) {
          newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
      } else {
          delete newErrors[name];
      }
      setErrors(newErrors);
  }, [errors]);

  const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setUserPreferences(prevState => ({ ...prevState, [name]: value }));
      validateField(name, value);
  }, [validateField]);

  const handleCustomChange = useCallback((e) => {
      const { name, value } = e.target;
      if (name === 'customGenre') {
          setCustomGenre(value);
          setUserPreferences(prevState => ({ ...prevState, favoriteGenres: "Autre", customGenre: value }));
      } else if (name === 'customDirector') {
          setCustomDirector(value);
          setUserPreferences(prevState => ({ ...prevState, favoriteDirectors: "Autre", customDirector: value }));
      }
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0 && Object.values(userPreferences).every(value => value)) {
          console.log("Submitting:", userPreferences);
          // Placeholder for submitting data to backend
      } else {
          alert('Veuillez corriger les erreurs avant de soumettre.');
      }
  };

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const genresOptions = ["Action", "Comédie", "Animation", "Émotion", "Jeunesse", "Horreur", "Science-Fiction", "Suspense"].map(genre => ({ value: genre, label: genre }));

  const handleGenreChange = selectedOptions => {
    setUserPreferences(prevState => ({
      ...prevState,
      favoriteGenres: selectedOptions.map(option => option.value)
    }));
  };


  const handleChangePasswordSubmit = e => {
    e.preventDefault();
    // Logique pour changer le mot de passe
    console.log("Changement de mot de passe soumis");
    setShowChangePasswordModal(false); // Fermer le modal après soumission
  };

  return (
  <>
    <Header />
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-orange-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
            <div className="text-center">
                <Link to="/">
                    <img className="mx-auto h-20 w-auto" src="/images/RondSansFond.png" alt="Logo" />
                </Link>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Éditez votre profil</h2>
            </div>
            <form className="mt-8 space-y-6">
                {/* Nom d'utilisateur et Email en lecture seule avec options de modification */}
                    <div className="">
                    <label className="block text-lg font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                        <span className="text-sm border-2 px-24 font-medium text-gray-700">{userPreferences.username}</span>
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                        <button type="button" className="flex text-indigo-600 hover:text-indigo-900 text-sm text-end">Changer</button>
                    </div>
                    <div className="">
                    <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
                        <span className="text-sm border-2 px-16 font-medium text-gray-700">{userPreferences.email}</span>
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        <button type="button" className="flex text-indigo-600 hover:text-indigo-900 text-sm text-end">Changer</button>
                    </div>

                    <div className="">
                    <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-1">Mot de passe</label>
                        <span className="text-sm border-2 px-36 font-medium text-gray-700">{userPreferences.password}</span>
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        <button type="button" className="flex text-indigo-600 hover:text-indigo-900 text-sm" onClick={() => setShowChangePasswordModal(true)}>Changer</button>
                    </div>

                {/* Modal pour changer le mot de passe */}
                {showChangePasswordModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex bg-white p-5 rounded-lg items-center justify-center w-2/3">
                      <form onSubmit={handleChangePasswordSubmit} className="flex flex-col mb-3 items-center justify-center">
                        <div className="text-lg font-semibold mb-5">Changer le mot de passe</div>
                        <input type="password" placeholder="Ancien mot de passe" className="input text-center mb-3 border-2 border-gray-400 rounded-md p-1" required />
                        <input type="password" placeholder="Nouveau mot de passe" className="input text-center mb-3 border-2 border-gray-400 rounded-md p-1" required />
                        <input type="password" placeholder="Confirmez le nouveau mot de passe" className="input text-center mb-3 border-2 border-gray-400 rounded-md p-1" required />
                        <button type="submit" className="button border-2 px-2 rounded-lg border-black mt-2 mb-2 hover:text-white hover:bg-gradient-to-r from-orange-400 to-pink-500 hover:border-rose-600">Changer</button>
                        <button type="button" className='px-2 rounded-lg border-black' onClick={() => setShowChangePasswordModal(false)}>Annuler</button>
                      </form>
                    </div>
                  </div>
                )}


                {/* Sélecteur de genres avec tags */}
                <div className='relative z-0'>
                  <label>Genres favoris</label>
                  <Select
                    isMulti
                    name="genres"
                    options={genresOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleGenreChange}
                  />
                </div>

                {/* Bouton de soumission des modifications */}
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    </div>
    <Footer />
  </>
  );
}

export default UserProfile;