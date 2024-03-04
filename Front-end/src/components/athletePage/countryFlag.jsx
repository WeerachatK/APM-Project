import React, { useState, useEffect } from 'react';

export function CountryFlag({ countryCode }) {
    const [flagUrl, setFlagUrl] = useState('');

    useEffect(() => {
        const fetchFlag = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                const data = await response.json();
                setFlagUrl(data[0].flags.svg);
            } catch (error) {
                console.error('Error fetching flag:', error);
            }
        };

        fetchFlag();
    }, [countryCode]);

    return (
        <div className="h-full w-full flex justify-center items-center shadow-shadow-base">
            {flagUrl && <img src={flagUrl} alt={`Flag of ${countryCode}`} className="object-cover h-full w-full" />}
        </div>
    );
}

export function CountryName({ countryCode }) {
    const [countryName, setCountryName] = useState('');

    useEffect(() => {
        const fetchCountryName = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                const data = await response.json();
                setCountryName(data[0].name.common);
            } catch (error) {
                console.error('Error fetching country name:', error);
            }
        };

        fetchCountryName();
    }, [countryCode]);

    return (
        <div>
            {countryName || 'Loading...'}
        </div>
    );
}