export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  modelCount: number;
  subCategories: Array<{
    name: string;
    count: number;
  }>;
  features: string[];
  popularModels: string[];
};

export const CATEGORIES: Category[] = [
  {
    id: "language-models",
    name: "Dil Modelleri",
    description: "Metin üretimi ve analizi için gelişmiş AI modelleri",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-regular.svg",
    gradient: "from-blue-500/20 to-violet-500/20",
    modelCount: 24,
    subCategories: [
      { name: "Metin Üretimi", count: 8 },
      { name: "Soru Cevaplama", count: 6 },
      { name: "Kod Üretimi", count: 5 },
      { name: "Dil Çevirisi", count: 5 }
    ],
    features: [
      "Çoklu dil desteği",
      "Bağlam anlama",
      "Doğal dil işleme",
      "Sentiment analizi"
    ],
    popularModels: [
      "gpt-4-turbo",
      "claude-3",
      "palm-2",
      "bert"
    ]
  },
  {
    id: "image-generation",
    name: "Görsel Üretimi",
    description: "Yaratıcı ve gerçekçi görseller oluşturun",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-regular.svg",
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    modelCount: 18,
    subCategories: [
      { name: "Fotoğraf Üretimi", count: 6 },
      { name: "İllüstrasyon", count: 5 },
      { name: "Style Transfer", count: 4 },
      { name: "Image Editing", count: 3 }
    ],
    features: [
      "Yüksek çözünürlük",
      "Stil kontrolü",
      "Kompozisyon",
      "Batch işleme"
    ],
    popularModels: [
      "dall-e-3",
      "midjourney-v6",
      "stable-diffusion-xl",
      "imagen"
    ]
  },
  {
    id: "audio-processing",
    name: "Ses İşleme",
    description: "Ses tanıma ve sentezleme teknolojileri",
    icon: "https://api.iconify.design/fluent:speaker-2-24-regular.svg",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    modelCount: 12,
    subCategories: [
      { name: "Konuşma Tanıma", count: 4 },
      { name: "Ses Sentezi", count: 3 },
      { name: "Ses İyileştirme", count: 3 },
      { name: "Müzik Üretimi", count: 2 }
    ],
    features: [
      "Gerçek zamanlı işleme",
      "Gürültü filtresi",
      "Çoklu dil desteği",
      "Konuşmacı ayrıştırma"
    ],
    popularModels: [
      "whisper-ai",
      "bark",
      "musiclm",
      "audioldm"
    ]
  },
  {
    id: "video-processing",
    name: "Video İşleme",
    description: "Video analizi ve üretimi için AI çözümleri",
    icon: "https://api.iconify.design/fluent:video-clip-24-regular.svg",
    gradient: "from-pink-500/20 to-rose-500/20",
    modelCount: 8,
    subCategories: [
      { name: "Video Üretimi", count: 3 },
      { name: "Hareket Analizi", count: 2 },
      { name: "Video Düzenleme", count: 2 },
      { name: "Nesne Takibi", count: 1 }
    ],
    features: [
      "Yüksek FPS",
      "Gerçek zamanlı işleme",
      "Stabilizasyon",
      "Efekt ekleme"
    ],
    popularModels: [
      "runway-gen2",
      "lumiere",
      "modelscope",
      "text2video-zero"
    ]
  }
]; 