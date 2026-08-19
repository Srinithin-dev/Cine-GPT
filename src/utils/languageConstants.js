export const DEFAULT_LANGUAGE = "en";

const en = {
  meta: {
    label: "English",
    nativeName: "English",
    dir: "ltr",
    locale: "en-US",
  },

  header: {
    nav: ["Discover", "My List"],
    gptSearch: "Goto GPT Search",
    exitGptSearch: "Back to browse",
    language: "Language",
    signOut: "Sign out",
    account: "Account",
  },

  hero: {
    featured: "Featured today",
    noTrailer: "No trailer available",
    mute: "Mute trailer",
    unmute: "Unmute trailer",
    replay: "Replay trailer",
  },

  gpt: {
    badge: "AI-powered search",
    heading: "What are you in the mood for?",
    subheading: "Describe a mood, a mashup, or a scene you half-remember.",
    placeholder: "e.g. an Indian horror-comedy that isn't actually scary",
    search: "Search",
    searching: "Searching…",
    clear: "Clear",
    tryLabel: "Try one of these",
    resultsFor: 'Results for "{query}"',
    resultsCount: "{n} titles matched",
    aiPick: "AI pick",
    suggestedBy: "Suggested by Gemini",
    noMatchHeading: "Suggested but not found on TMDB",
    noMatchHelp:
      "Gemini named these, but TMDB had no match — usually a spelling or regional-title mismatch.",
    emptyHeading: "Ask CineGPT for anything",
    emptyBody:
      "Genre filters can't find “the one with the rotating hallway.” Describe it in your own words instead.",
    suggestions: [
      "Indian horror-comedy",
      "The one with the rotating hallway",
      "Slow-burn Korean thrillers",
      "Heist films with no violence",
      "Sci-fi that made me cry",
    ],
  },

  rows: {
    nowPlaying: "Now playing",
    nowPlayingSub: "In theatres this week",
    topRated: "Top rated right now",
    topRatedSub: "Ranked by TMDB user score",
    trending: "Trending with viewers",
    trendingSub: "Highest momentum today",
    seeAll: "See all",
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
  },

  card: { noOverview: "No description available." },

  footer: { note: "A learning project.", dataBy: "Movie data by TMDB." },

  auth: {
    signIn: "Sign in",
    signUp: "Create account",
    welcomeBack: "Welcome back",
    createAccount: "Create your account",
    signInSubtitle: "Sign in to pick up where you left off.",
    signUpSubtitle: "Free to start. No card required.",
    fullName: "Full name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    forgotPassword: "Forgot password?",
    or: "or",
    continueWithGoogle: "Continue with Google",
    haveAccount: "Already have an account?",
    noAccount: "New to CineGPT?",
    createOne: "Create one",
    showPassword: "Show password",
    hidePassword: "Hide password",
  },
};

const hi = {
  meta: { label: "Hindi", nativeName: "हिन्दी", dir: "ltr", locale: "hi-IN" },

  header: {
    nav: ["खोजें", "मेरी सूची"],
    gptSearch: "GPT खोज",
    exitGptSearch: "ब्राउज़ पर वापस",
    language: "भाषा",
    signOut: "साइन आउट",
    account: "खाता",
  },

  hero: {
    featured: "आज का चयन",
    noTrailer: "ट्रेलर उपलब्ध नहीं",
    mute: "ट्रेलर म्यूट करें",
    unmute: "ट्रेलर अनम्यूट करें",
    replay: "ट्रेलर दोबारा चलाएँ",
  },

  gpt: {
    badge: "AI-आधारित खोज",
    heading: "आपका आज क्या देखने का मन है?",
    subheading:
      "कोई मूड, कोई मिक्स, या कोई अधूरा याद रहा सीन — जैसा याद है वैसा लिखें।",
    placeholder: "जैसे: एक भारतीय हॉरर-कॉमेडी जो असल में डरावनी न हो",
    search: "खोजें",
    searching: "खोज रहे हैं…",
    clear: "साफ़ करें",
    tryLabel: "इनमें से कोई आज़माएँ",
    resultsFor: '"{query}" के परिणाम',
    resultsCount: "{n} फ़िल्में मिलीं",
    aiPick: "AI सुझाव",
    suggestedBy: "Gemini द्वारा सुझाया गया",
    noMatchHeading: "सुझाई गईं, लेकिन TMDB पर नहीं मिलीं",
    noMatchHelp:
      "Gemini ने इनके नाम दिए, पर TMDB पर मिलान नहीं हुआ — आमतौर पर स्पेलिंग या क्षेत्रीय नाम के अंतर के कारण।",
    emptyHeading: "CineGPT से कुछ भी पूछें",
    emptyBody:
      "जॉनर फ़िल्टर “वह वाली जिसमें गलियारा घूमता है” नहीं खोज सकते। अपने शब्दों में बताइए।",
    suggestions: [
      "भारतीय हॉरर-कॉमेडी",
      "वह वाली जिसमें घूमने वाला गलियारा है",
      "धीमी रफ़्तार वाली कोरियाई थ्रिलर",
      "बिना हिंसा वाली डकैती फ़िल्में",
      "साइ-फ़ाई जिसने मुझे रुला दिया",
    ],
  },

  rows: {
    nowPlaying: "अभी सिनेमाघरों में",
    nowPlayingSub: "इस हफ़्ते सिनेमाघरों में",
    topRated: "सबसे ज़्यादा रेटिंग वाली",
    topRatedSub: "TMDB यूज़र स्कोर के अनुसार",
    trending: "दर्शकों में लोकप्रिय",
    trendingSub: "आज सबसे ज़्यादा चर्चा में",
    seeAll: "सभी देखें",
    scrollLeft: "बाएँ स्क्रॉल करें",
    scrollRight: "दाएँ स्क्रॉल करें",
  },

  card: { noOverview: "कोई विवरण उपलब्ध नहीं।" },

  footer: {
    note: "एक लर्निंग प्रोजेक्ट।",
    dataBy: "फ़िल्म डेटा TMDB से।",
  },

  auth: {
    signIn: "साइन इन",
    signUp: "खाता बनाएँ",
    welcomeBack: "फिर से स्वागत है",
    createAccount: "अपना खाता बनाएँ",
    signInSubtitle: "जहाँ छोड़ा था वहीं से शुरू करें।",
    signUpSubtitle: "शुरू करना मुफ़्त है। कार्ड की ज़रूरत नहीं।",
    fullName: "पूरा नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    forgotPassword: "पासवर्ड भूल गए?",
    or: "या",
    continueWithGoogle: "Google से जारी रखें",
    haveAccount: "पहले से खाता है?",
    noAccount: "CineGPT पर नए हैं?",
    createOne: "खाता बनाएँ",
    showPassword: "पासवर्ड दिखाएँ",
    hidePassword: "पासवर्ड छिपाएँ",
  },
};

const ta = {
  meta: { label: "Tamil", nativeName: "தமிழ்", dir: "ltr", locale: "ta-IN" },

  header: {
    nav: ["கண்டறி", "எனது பட்டியல்"],
    gptSearch: "GPT தேடல்",
    exitGptSearch: "உலாவலுக்குத் திரும்பு",
    language: "மொழி",
    signOut: "வெளியேறு",
    account: "கணக்கு",
  },

  hero: {
    featured: "இன்றைய சிறப்புத் தேர்வு",
    noTrailer: "டிரெய்லர் கிடைக்கவில்லை",
    mute: "டிரெய்லரை ஒலியடக்கு",
    unmute: "டிரெய்லர் ஒலியை இயக்கு",
    replay: "டிரெய்லரை மீண்டும் இயக்கு",
  },

  gpt: {
    badge: "AI அடிப்படையிலான தேடல்",
    heading: "இன்று எதைப் பார்க்க விருப்பம்?",
    subheading:
      "ஒரு மனநிலை, ஒரு கலவை, அல்லது பாதி நினைவில் உள்ள ஒரு காட்சி — உங்கள் வார்த்தைகளில் சொல்லுங்கள்.",
    placeholder: "எ.கா. பயமே இல்லாத ஒரு இந்திய திகில்-நகைச்சுவைப் படம்",
    search: "தேடு",
    searching: "தேடுகிறது…",
    clear: "அழி",
    tryLabel: "இவற்றில் ஒன்றை முயற்சிக்கவும்",
    resultsFor: '"{query}" க்கான முடிவுகள்',
    resultsCount: "{n} படங்கள் பொருந்தின",
    aiPick: "AI தேர்வு",
    suggestedBy: "Gemini பரிந்துரைத்தது",
    noMatchHeading: "பரிந்துரைக்கப்பட்டன, ஆனால் TMDB இல் இல்லை",
    noMatchHelp:
      "Gemini இவற்றைப் பரிந்துரைத்தது, ஆனால் TMDB இல் பொருத்தம் கிடைக்கவில்லை — பொதுவாக எழுத்துப்பிழை அல்லது வேறு பெயர் காரணமாக.",
    emptyHeading: "CineGPT இடம் எதையும் கேளுங்கள்",
    emptyBody:
      "“அந்த சுழலும் நடைபாதை வரும் படம்” என்பதை வகைப் வடிகட்டிகள் கண்டுபிடிக்க முடியாது. உங்கள் சொற்களில் விவரியுங்கள்.",
    suggestions: [
      "இந்திய திகில்-நகைச்சுவைப் படம்",
      "சுழலும் நடைபாதை வரும் அந்தப் படம்",
      "மெதுவாக விரியும் கொரிய த்ரில்லர்கள்",
      "வன்முறை இல்லாத கொள்ளையர் படங்கள்",
      "என்னை அழ வைத்த அறிவியல் புனைவு",
    ],
  },

  rows: {
    nowPlaying: "இப்போது திரையில்",
    nowPlayingSub: "இந்த வாரம் திரையரங்குகளில்",
    topRated: "தற்போது அதிக மதிப்பெண்",
    topRatedSub: "TMDB பயனர் மதிப்பெண் அடிப்படையில்",
    trending: "பார்வையாளர்களிடையே பிரபலம்",
    trendingSub: "இன்று அதிக கவனம் பெற்றவை",
    seeAll: "அனைத்தையும் காண",
    scrollLeft: "இடதுபுறம் நகர்த்து",
    scrollRight: "வலதுபுறம் நகர்த்து",
  },

  card: { noOverview: "விவரம் இல்லை." },

  footer: {
    note: "ஒரு கற்றல் திட்டம்.",
    dataBy: "திரைப்பட தகவல் TMDB வழங்கியது.",
  },

  auth: {
    signIn: "உள்நுழை",
    signUp: "கணக்கை உருவாக்கு",
    welcomeBack: "மீண்டும் வருக",
    createAccount: "உங்கள் கணக்கை உருவாக்குங்கள்",
    signInSubtitle: "நிறுத்திய இடத்திலிருந்து தொடருங்கள்.",
    signUpSubtitle: "தொடங்க இலவசம். கார்டு தேவையில்லை.",
    fullName: "முழுப் பெயர்",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்து",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    or: "அல்லது",
    continueWithGoogle: "Google மூலம் தொடரவும்",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    noAccount: "CineGPT இல் புதியவரா?",
    createOne: "கணக்கை உருவாக்கு",
    showPassword: "கடவுச்சொல்லைக் காட்டு",
    hidePassword: "கடவுச்சொல்லை மறை",
  },
};

export const languageConstants = { en, hi, ta };

export const getLanguage = (identifier) =>
  languageConstants[identifier] ?? languageConstants[DEFAULT_LANGUAGE];

export const fill = (template, values = {}) =>
  Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template ?? "",
  );
