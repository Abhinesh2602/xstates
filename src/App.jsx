import { useEffect, useState } from "react";
import styles from "./App.module.css";
import fetchData from "./fetchLocation";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await fetchData("/countries");
        setCountries(result);
      } catch (err) {
        console.log(err);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      if (selectedCountry) {
        try {
          const result = await fetchData(`/country=${selectedCountry}/states`);
          setStates(result);
        } catch (err) {
          console.log(err);
        }
      } else {
        setStates([]);
      }
    };
    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      if (selectedState) {
        try {
          const result = await fetchData(
            `/country=${selectedCountry}/state=${selectedState}/cities`
          );
          setCities(result);
        } catch (err) {
          console.log(err);
        }
      } else {
        setCities([]);
      }
    };
    getCities();
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Select Location</h1>
      <div className={styles.selectFormContainer}>
        <div className={styles.select}>
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option value={country} key={index}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select}>
          <select
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option value={state} key={index}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select}>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCity && selectedCountry && selectedState && (
        <div>
          <span className={styles.selectTitle}>
            You Selected {selectedCity}, {selectedState}, {selectedCountry}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
