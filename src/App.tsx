import React, { useState, useEffect } from 'react';
import { Heart as Hearts, Users, Heart, BellRing as Ring, Swords, Users2, Sparkles, Moon, Sun, Share2, Palette } from 'lucide-react';

type Relationship = 'Friends' | 'Love' | 'Affection' | 'Marriage' | 'Enemy' | 'Sibling';
type Theme = 'default' | 'sunset' | 'ocean' | 'forest';

type RelationshipInfo = {
  icon: React.ElementType;
  color: string;
  gradient: string;
  lightBg: string;
  darkBg: string;
  emoji: string;
  description: string;
  prediction: string[];
};

const THEMES: Record<Theme, { light: string; dark: string; accent: string }> = {
  default: {
    light: 'from-purple-50 via-pink-50 to-blue-50',
    dark: 'from-gray-900 via-purple-900 to-gray-900',
    accent: 'from-purple-600 to-pink-600'
  },
  sunset: {
    light: 'from-orange-50 via-red-50 to-pink-50',
    dark: 'from-gray-900 via-red-900 to-gray-900',
    accent: 'from-orange-600 to-red-600'
  },
  ocean: {
    light: 'from-blue-50 via-cyan-50 to-teal-50',
    dark: 'from-gray-900 via-blue-900 to-gray-900',
    accent: 'from-blue-600 to-cyan-600'
  },
  forest: {
    light: 'from-green-50 via-emerald-50 to-teal-50',
    dark: 'from-gray-900 via-green-900 to-gray-900',
    accent: 'from-green-600 to-emerald-600'
  }
};

const FLAMES_MAP: Record<Relationship, RelationshipInfo> = {
  Friends: { 
    icon: Users, 
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
    darkBg: 'dark:bg-blue-900/20',
    emoji: '🤝',
    description: 'A beautiful friendship is blooming! Your connection is built on trust, understanding, and mutual respect.',
    prediction: [
      'Your friendship will grow stronger through shared adventures',
      'You\'ll become each other\'s trusted confidants',
      'Together, you\'ll create memories that last a lifetime'
    ]
  },
  Love: { 
    icon: Hearts, 
    color: 'text-red-500',
    gradient: 'from-red-500 to-red-600',
    lightBg: 'bg-red-50',
    darkBg: 'dark:bg-red-900/20',
    emoji: '❤️',
    description: 'Love is in the air! Your hearts beat as one, creating a symphony of romantic possibilities.',
    prediction: [
      'A deep and lasting romance is on the horizon',
      'Your love will inspire others around you',
      'Together, you\'ll build a beautiful future'
    ]
  },
  Affection: { 
    icon: Heart, 
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-pink-600',
    lightBg: 'bg-pink-50',
    darkBg: 'dark:bg-pink-900/20',
    emoji: '💖',
    description: 'A deep affection flows between you, nurturing a bond that grows stronger each day.',
    prediction: [
      'Your mutual care will blossom into something special',
      'Small gestures will strengthen your connection',
      'You\'ll find joy in the simple moments together'
    ]
  },
  Marriage: { 
    icon: Ring, 
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    lightBg: 'bg-purple-50',
    darkBg: 'dark:bg-purple-900/20',
    emoji: '💍',
    description: 'Wedding bells might be in your future! Your destinies are intertwined in a profound way.',
    prediction: [
      'A lifetime of happiness awaits your union',
      'Your shared dreams will become reality',
      'Together, you\'ll build a home filled with love'
    ]
  },
  Enemy: { 
    icon: Swords, 
    color: 'text-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    lightBg: 'bg-orange-50',
    darkBg: 'dark:bg-orange-900/20',
    emoji: '⚔️',
    description: 'Sparks fly, but not in a good way! Perhaps this tension can transform into something positive.',
    prediction: [
      'This challenge will lead to personal growth',
      'Understanding will replace misunderstanding',
      'Time will reveal hidden opportunities'
    ]
  },
  Sibling: { 
    icon: Users2, 
    color: 'text-green-500',
    gradient: 'from-green-500 to-green-600',
    lightBg: 'bg-green-50',
    darkBg: 'dark:bg-green-900/20',
    emoji: '🫂',
    description: 'Like siblings, you share a special bond of support, care, and occasional playful rivalry!',
    prediction: [
      'Your bond will strengthen through shared experiences',
      'You\'ll always have each other\'s backs',
      'Together, you\'ll overcome any challenge'
    ]
  }
};

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<Relationship | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  const [showThemes, setShowThemes] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (result && showResult) {
      const interval = setInterval(() => {
        setPredictionIndex((prev) => 
          prev === FLAMES_MAP[result].prediction.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [result, showResult]);

  const calculateFlames = (str1: string, str2: string): Relationship => {
    const cleanStr1 = str1.toLowerCase().replace(/\s/g, '');
    const cleanStr2 = str2.toLowerCase().replace(/\s/g, '');
    
    let remaining1 = cleanStr1;
    let remaining2 = cleanStr2;

    for (const char of cleanStr1) {
      const index = remaining2.indexOf(char);
      if (index !== -1) {
        remaining1 = remaining1.replace(char, '');
        remaining2 = remaining2.replace(char, '');
      }
    }

    const count = remaining1.length + remaining2.length;
    const flames: Relationship[] = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemy', 'Sibling'];
    let currentIndex = 0;

    while (flames.length > 1) {
      currentIndex = (currentIndex + count - 1) % flames.length;
      flames.splice(currentIndex, 1);
    }

    return flames[0];
  };

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsAnimating(true);
    setShowResult(false);
    setResult(null);
    setPredictionIndex(0);

    setTimeout(() => {
      const flamesResult = calculateFlames(name1, name2);
      setResult(flamesResult);
      setTimeout(() => {
        setShowResult(true);
        setIsAnimating(false);
      }, 500);
    }, 1500);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setShowResult(false);
    setPredictionIndex(0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleShare = async () => {
    if (!result) return;
    
    const shareText = `According to FLAMES, ${name1} and ${name2}'s relationship is ${result}! ${FLAMES_MAP[result].emoji}\n\nFind out your relationship: [URL]`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FLAMES Calculator Result',
          text: shareText
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('Result copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gradient-to-br ${
      isDarkMode ? THEMES[currentTheme].dark : THEMES[currentTheme].light
    } ${isDarkMode ? 'text-white' : ''}`}>
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-500 hover:shadow-2xl ${
          isDarkMode ? 'dark:shadow-purple-500/20' : ''
        }`}>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Change theme"
            >
              <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {showThemes && (
            <div className="absolute top-16 right-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 z-10">
              {(Object.keys(THEMES) as Theme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    setCurrentTheme(theme);
                    setShowThemes(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                    currentTheme === theme
                      ? `bg-gradient-to-r ${THEMES[theme].accent} text-white`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          )}

          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className={`bg-gradient-to-r ${THEMES[currentTheme].accent} p-3 rounded-full shadow-lg`}>
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          <h1 className={`text-3xl font-bold text-center mb-8 mt-4 bg-gradient-to-r ${THEMES[currentTheme].accent} bg-clip-text text-transparent`}>
            FLAMES Calculator
          </h1>
          
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-102">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-purple-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter first name"
              />
            </div>

            <div className="transform transition-all duration-300 hover:scale-102">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Second Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 hover:border-purple-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter second name"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                disabled={!name1.trim() || !name2.trim() || isAnimating}
                className={`flex-1 bg-gradient-to-r ${THEMES[currentTheme].accent} text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 animate-pulse"
              >
                Reset
              </button>
            </div>

            {isAnimating && (
              <div className="text-center py-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse">
                      <Heart className="w-6 h-6 text-pink-500" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Calculating your relationship...</p>
              </div>
            )}

            {result && showResult && (
              <div className="text-center py-8 transform transition-all duration-500 animate-fadeIn">
                <div className={`inline-flex items-center gap-3 text-2xl font-bold ${FLAMES_MAP[result].color} p-4 rounded-xl transform transition-all duration-300 hover:scale-110 ${FLAMES_MAP[result].lightBg} ${FLAMES_MAP[result].darkBg}`}>
                  {React.createElement(FLAMES_MAP[result].icon, { 
                    size: 40,
                    className: `transform transition-all duration-300 hover:rotate-12 ${FLAMES_MAP[result].color}`
                  })}
                  <span className="text-3xl">{FLAMES_MAP[result].emoji} {result}</span>
                </div>
                <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg animate-fadeIn">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">{name1}</span> and{' '}
                  <span className="font-semibold text-pink-600 dark:text-pink-400">{name2}</span>'s relationship is predicted as{' '}
                  <span className={`font-bold ${FLAMES_MAP[result].color}`}>{result}</span>
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm italic animate-fadeIn">
                  {FLAMES_MAP[result].description}
                </p>
                <div className="mt-6 h-16">
                  <p className={`text-sm text-gray-600 dark:text-gray-400 transition-opacity duration-300 ${
                    FLAMES_MAP[result].prediction[predictionIndex] ? 'opacity-100' : 'opacity-0'
                  }`}>
                    ✨ {FLAMES_MAP[result].prediction[predictionIndex]}
                  </p>
                </div>
                <button
                  onClick={handleShare}
                  className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${THEMES[currentTheme].accent} text-white transition-all duration-300 hover:scale-105`}
                >
                  <Share2 className="w-4 h-4" />
                  Share Result
                </button>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium">FLAMES:</p>
              <div className="flex justify-center gap-4 mt-2 flex-wrap">
                {Object.entries(FLAMES_MAP).map(([key, value]) => (
                  <div key={key} className={`flex items-center gap-1 p-1.5 rounded-lg transform transition-all duration-300 hover:scale-110 ${value.lightBg} ${value.darkBg}`}>
                    {React.createElement(value.icon, { 
                      size: 16,
                      className: value.color
                    })}
                    <span>{key}</span>
                    <span className="ml-1">{value.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;