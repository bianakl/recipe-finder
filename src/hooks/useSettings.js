import { createContext, useContext, useState, useEffect } from 'react';

const SETTINGS_KEY = 'recipe-finder-settings';

const DEFAULT_SETTINGS = {
  measurementSystem: 'imperial', // 'imperial' or 'metric'
  temperatureUnit: 'fahrenheit', // 'fahrenheit' or 'celsius'
  defaultServings: 4,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Unit conversion utilities
const CONVERSIONS = {
  // Volume conversions (to ml)
  cup: 236.588,
  cups: 236.588,
  tablespoon: 14.787,
  tablespoons: 14.787,
  tbsp: 14.787,
  teaspoon: 4.929,
  teaspoons: 4.929,
  tsp: 4.929,
  'fluid ounce': 29.574,
  'fluid ounces': 29.574,
  'fl oz': 29.574,
  pint: 473.176,
  pints: 473.176,
  quart: 946.353,
  quarts: 946.353,
  gallon: 3785.41,
  gallons: 3785.41,

  // Weight conversions (to grams)
  pound: 453.592,
  pounds: 453.592,
  lb: 453.592,
  lbs: 453.592,
  ounce: 28.3495,
  ounces: 28.3495,
  oz: 28.3495,
};

// Parse a measurement string like "1/2 cup" or "2 tbsp"
function parseMeasurement(measure) {
  if (!measure || typeof measure !== 'string') return null;

  const trimmed = measure.trim().toLowerCase();

  // Match patterns like "1/2 cup", "2 cups", "1.5 tbsp", "400g", "200ml"
  const fractionMatch = trimmed.match(/^(\d+)?[\s]?(\d+)\/(\d+)\s*(.*)$/);
  const decimalMatch = trimmed.match(/^([\d.]+)\s*(.*)$/);

  let amount, unit;

  if (fractionMatch) {
    const whole = fractionMatch[1] ? parseInt(fractionMatch[1]) : 0;
    const numerator = parseInt(fractionMatch[2]);
    const denominator = parseInt(fractionMatch[3]);
    amount = whole + (numerator / denominator);
    unit = fractionMatch[4].trim();
  } else if (decimalMatch) {
    amount = parseFloat(decimalMatch[1]);
    unit = decimalMatch[2].trim();
  } else {
    return null;
  }

  return { amount, unit, original: measure };
}

// Format a number nicely (avoid ugly decimals)
function formatAmount(num) {
  if (num === 0) return '0';

  // Common fractions
  const fractions = [
    { value: 0.25, display: '1/4' },
    { value: 0.333, display: '1/3' },
    { value: 0.5, display: '1/2' },
    { value: 0.666, display: '2/3' },
    { value: 0.75, display: '3/4' },
  ];

  const whole = Math.floor(num);
  const decimal = num - whole;

  // Check if decimal part matches a common fraction
  for (const frac of fractions) {
    if (Math.abs(decimal - frac.value) < 0.05) {
      if (whole === 0) return frac.display;
      return `${whole} ${frac.display}`;
    }
  }

  // Otherwise round to 1 decimal place
  if (num < 10) {
    const rounded = Math.round(num * 10) / 10;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
  }
  return Math.round(num).toString();
}

// Convert imperial to metric
export function convertToMetric(measure) {
  const parsed = parseMeasurement(measure);
  if (!parsed) return measure;

  const { amount, unit, original } = parsed;

  // Already metric
  if (unit === 'g' || unit === 'ml' || unit === 'kg' || unit === 'l' || unit === 'grams' || unit === 'liters') {
    return original;
  }

  // Check if it's a convertible unit
  const conversionFactor = CONVERSIONS[unit];
  if (!conversionFactor) return original;

  // Determine if it's volume or weight based on the unit
  const volumeUnits = ['cup', 'cups', 'tablespoon', 'tablespoons', 'tbsp', 'teaspoon', 'teaspoons', 'tsp', 'fluid ounce', 'fluid ounces', 'fl oz', 'pint', 'pints', 'quart', 'quarts', 'gallon', 'gallons'];
  const isVolume = volumeUnits.includes(unit);

  const converted = amount * conversionFactor;

  if (isVolume) {
    // Convert to ml or L
    if (converted >= 1000) {
      return `${formatAmount(converted / 1000)} L`;
    }
    return `${formatAmount(converted)} ml`;
  } else {
    // Convert to g or kg
    if (converted >= 1000) {
      return `${formatAmount(converted / 1000)} kg`;
    }
    return `${formatAmount(converted)} g`;
  }
}

// Convert metric to imperial
export function convertToImperial(measure) {
  const parsed = parseMeasurement(measure);
  if (!parsed) return measure;

  const { amount, unit, original } = parsed;

  // Handle metric units
  if (unit === 'ml' || unit === 'milliliters') {
    if (amount >= 236) {
      return `${formatAmount(amount / 236.588)} cups`;
    } else if (amount >= 15) {
      return `${formatAmount(amount / 14.787)} tbsp`;
    } else {
      return `${formatAmount(amount / 4.929)} tsp`;
    }
  }

  if (unit === 'l' || unit === 'liter' || unit === 'liters') {
    return `${formatAmount((amount * 1000) / 236.588)} cups`;
  }

  if (unit === 'g' || unit === 'grams') {
    if (amount >= 453) {
      return `${formatAmount(amount / 453.592)} lbs`;
    }
    return `${formatAmount(amount / 28.3495)} oz`;
  }

  if (unit === 'kg' || unit === 'kilograms') {
    return `${formatAmount((amount * 1000) / 453.592)} lbs`;
  }

  // Already imperial or not convertible
  return original;
}

// Convert temperature
export function convertTemperature(temp, toUnit) {
  const match = temp.match(/(\d+)\s*°?\s*(F|C|fahrenheit|celsius)/i);
  if (!match) return temp;

  const value = parseInt(match[1]);
  const fromUnit = match[2].toUpperCase().startsWith('F') ? 'F' : 'C';

  if (toUnit === 'celsius' && fromUnit === 'F') {
    const celsius = Math.round((value - 32) * 5 / 9);
    return `${celsius}°C`;
  } else if (toUnit === 'fahrenheit' && fromUnit === 'C') {
    const fahrenheit = Math.round((value * 9 / 5) + 32);
    return `${fahrenheit}°F`;
  }

  return temp;
}

// Convert a measurement based on user settings
export function convertMeasurement(measure, targetSystem) {
  if (targetSystem === 'metric') {
    return convertToMetric(measure);
  }
  return convertToImperial(measure);
}
