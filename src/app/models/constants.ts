export const MODELS = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "En gelişmiş dil modeli ile metin üretimi ve analizi yapın",
    category: "language-models",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    provider: "OpenAI",
    website: "https://openai.com/gpt-4",
    pricing: "Ücretli",
    features: [
      "Gelişmiş metin üretimi",
      "Bağlam anlama",
      "Kod üretimi"
    ],
    stats: {
      accuracy: "98%",
      speed: "0.1s",
      usage: "10M+"
    },
    badges: ["Popular", "Premium"]
  },
  {
    id: "claude-3",
    name: "Claude 3",
    description: "Çok yönlü ve güçlü yapay zeka asistanı",
    category: "language-models",
    icon: "https://api.iconify.design/fluent:bot-24-filled.svg",
    provider: "Anthropic",
    website: "https://anthropic.com/claude",
    pricing: "Ücretli",
    features: [
      "Doğal dil işleme",
      "Analiz ve özetleme",
      "Çoklu dil desteği"
    ],
    stats: {
      accuracy: "96%",
      speed: "0.2s",
      usage: "4M+"
    },
    badges: ["New", "Premium"]
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    description: "Metinden gerçekçi ve yaratıcı görseller oluşturun",
    category: "image-generation",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-filled.svg",
    provider: "OpenAI",
    website: "https://openai.com/dall-e-3",
    pricing: "Ücretli",
    features: [
      "Yüksek çözünürlük",
      "Stil kontrolü",
      "Photoshop uyumu"
    ],
    stats: {
      accuracy: "95%",
      speed: "2.5s",
      usage: "5M+"
    },
    badges: ["Popular", "Premium"]
  },
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL",
    description: "Yüksek kaliteli ve özelleştirilebilir görsel üretimi",
    category: "image-generation",
    icon: "https://api.iconify.design/fluent:image-edit-24-filled.svg",
    provider: "Stability AI",
    website: "https://stability.ai",
    pricing: "Ücretsiz/Ücretli",
    features: [
      "Özelleştirilebilir modeller",
      "Hızlı üretim",
      "Topluluk desteği"
    ],
    stats: {
      accuracy: "94%",
      speed: "1.8s",
      usage: "8M+"
    },
    badges: ["Popular", "Open Source"]
  },
  {
    id: "whisper-ai",
    name: "Whisper AI",
    description: "Gelişmiş ses tanıma ve çeviri teknolojisi",
    category: "audio-processing",
    icon: "https://api.iconify.design/fluent:mic-sparkle-24-filled.svg",
    provider: "OpenAI",
    website: "https://openai.com/research/whisper",
    pricing: "Ücretsiz",
    features: [
      "Çoklu dil desteği",
      "Gürültü filtresi",
      "Gerçek zamanlı çeviri"
    ],
    stats: {
      accuracy: "97%",
      speed: "1.2s",
      usage: "3M+"
    },
    badges: ["Popular", "Open Source"]
  },
  {
    id: "midjourney-v6",
    name: "Midjourney V6",
    description: "Sanatsal ve yaratıcı görsel üretim modeli",
    category: "image-generation",
    icon: "https://api.iconify.design/fluent:paint-brush-24-filled.svg",
    provider: "Midjourney",
    website: "https://midjourney.com",
    pricing: "Ücretli",
    features: [
      "Sanatsal stiller",
      "Discord entegrasyonu",
      "Topluluk galerisi"
    ],
    stats: {
      accuracy: "93%",
      speed: "3.0s",
      usage: "6M+"
    },
    badges: ["Popular", "Premium"]
  }
]; 