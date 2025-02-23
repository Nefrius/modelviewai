"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";
import Image from "next/image";

// Model kategorileri
const CATEGORIES = [
  "Tümü",
  "Dil Modeli",
  "Görsel Üretimi",
  "Ses İşleme",
  "Video İşleme",
  "Kod Üretimi",
  "Metin Analizi",
  "Veri Analizi",
  "3D Modelleme",
  "Oyun Geliştirme",
  "Robotik",
  "Doğal Dil İşleme",
  "Bilgisayarlı Görü"
];

// Fiyat filtreleri
const PRICE_FILTERS = ["Tümü", "Ücretsiz", "Ücretli", "Freemium"];

// Tüm modeller
export const MODELS = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "En gelişmiş dil modeli ile metin üretimi ve analizi yapın",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    provider: "OpenAI",
    website: "https://openai.com/gpt-4",
    pricing: "Ücretli",
    features: [
      "Çoklu dil desteği",
      "Kod üretimi",
      "Metin analizi"
    ],
    stats: {
      accuracy: "98%",
      speed: "0.1s",
      usage: "10M+"
    },
    badges: ["Popüler", "Premium"]
  },
  {
    id: "claude-3",
    name: "Claude 3",
    description: "Çok yönlü ve güçlü yapay zeka asistanı",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:bot-24-filled.svg",
    provider: "Anthropic",
    website: "https://anthropic.com/claude",
    pricing: "Ücretli",
    features: [
      "Uzun bağlam desteği",
      "Çoklu format işleme",
      "Güvenlik kontrolleri"
    ],
    stats: {
      accuracy: "96%",
      speed: "0.2s",
      usage: "4M+"
    },
    badges: ["Yeni", "Premium"]
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    description: "Metinden gerçekçi ve yaratıcı görseller oluşturun",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-filled.svg",
    provider: "OpenAI",
    website: "https://openai.com/dall-e-3",
    pricing: "Ücretli",
    features: [
      "4K çözünürlük",
      "Stil kontrolü",
      "Nesne manipülasyonu"
    ],
    stats: {
      accuracy: "95%",
      speed: "2.5s",
      usage: "5M+"
    },
    badges: ["Popüler", "Premium"]
  },
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL",
    description: "Yüksek kaliteli ve özelleştirilebilir görsel üretimi",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-edit-24-filled.svg",
    provider: "Stability AI",
    website: "https://stability.ai/stable-diffusion",
    pricing: "Ücretsiz",
    features: [
      "8K çözünürlük",
      "LoRA desteği",
      "Inpainting"
    ],
    stats: {
      accuracy: "94%",
      speed: "1.8s",
      usage: "8M+"
    },
    badges: ["Açık Kaynak"]
  },
  {
    id: "whisper-ai",
    name: "Whisper AI",
    description: "Gelişmiş ses tanıma ve çeviri teknolojisi",
    category: "Ses İşleme",
    icon: "https://api.iconify.design/fluent:mic-sparkle-24-filled.svg",
    provider: "OpenAI",
    website: "https://openai.com/research/whisper",
    pricing: "Ücretsiz",
    features: [
      "90+ dil desteği",
      "Gerçek zamanlı çeviri",
      "Gürültü filtresi"
    ],
    stats: {
      accuracy: "97%",
      speed: "1.2s",
      usage: "3M+"
    },
    badges: ["Açık Kaynak", "Popüler"]
  },
  {
    id: "midjourney-v6",
    name: "Midjourney V6",
    description: "Sanatsal ve yaratıcı görsel üretim modeli",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:paint-brush-24-filled.svg",
    provider: "Midjourney",
    website: "https://www.midjourney.com",
    pricing: "Ücretli",
    features: [
      "Sanatsal stil kontrolü",
      "Yüksek çözünürlük",
      "Kompozisyon kontrolü"
    ],
    stats: {
      accuracy: "93%",
      speed: "3.0s",
      usage: "6M+"
    },
    badges: ["Premium", "Yeni"]
  },
  {
    id: "palm-2",
    name: "PaLM 2",
    description: "Google'ın gelişmiş dil modeli",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    provider: "Google",
    website: "https://ai.google/palm2",
    pricing: "Freemium",
    features: [
      "Çoklu görev desteği",
      "Düşük latency",
      "API entegrasyonu"
    ],
    stats: {
      accuracy: "95%",
      speed: "0.15s",
      usage: "7M+"
    },
    badges: ["Popüler"]
  },
  {
    id: "llama-2",
    name: "LLaMA 2",
    description: "Meta'nın açık kaynak dil modeli",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    provider: "Meta",
    website: "https://ai.meta.com/llama",
    pricing: "Ücretsiz",
    features: [
      "Özelleştirilebilir model",
      "Düşük donanım gereksinimi",
      "Topluluk desteği"
    ],
    stats: {
      accuracy: "92%",
      speed: "0.3s",
      usage: "5M+"
    },
    badges: ["Açık Kaynak"]
  },
  {
    id: "imagen-2",
    name: "Imagen 2",
    description: "Google'ın görsel üretim modeli",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-filled.svg",
    provider: "Google",
    website: "https://imagen.research.google",
    pricing: "Ücretli",
    features: [
      "Fotorealistik üretim",
      "Text-to-image",
      "Image-to-image"
    ],
    stats: {
      accuracy: "94%",
      speed: "2.0s",
      usage: "2M+"
    },
    badges: ["Yeni", "Premium"]
  },
  {
    id: "bark",
    name: "Bark",
    description: "Gerçekçi ses sentezi modeli",
    category: "Ses İşleme",
    icon: "https://api.iconify.design/fluent:speaker-2-24-filled.svg",
    provider: "Suno",
    website: "https://github.com/suno-ai/bark",
    pricing: "Ücretsiz",
    features: [
      "Çoklu dil desteği",
      "Duygu kontrolü",
      "Ses klonlama"
    ],
    stats: {
      accuracy: "91%",
      speed: "1.5s",
      usage: "1M+"
    },
    badges: ["Açık Kaynak"]
  },
  {
    id: "runway-gen2",
    name: "Runway Gen-2",
    description: "Video üretim ve düzenleme modeli",
    category: "Video İşleme",
    icon: "https://api.iconify.design/fluent:video-clip-24-filled.svg",
    provider: "Runway",
    website: "https://runway.com",
    pricing: "Ücretli",
    features: [
      "Text-to-video",
      "Video düzenleme",
      "Özel efektler"
    ],
    stats: {
      accuracy: "90%",
      speed: "5.0s",
      usage: "500K+"
    },
    badges: ["Premium"]
  },
  {
    id: "pika-labs",
    name: "Pika Labs",
    description: "Gelişmiş video üretim modeli",
    category: "Video İşleme",
    icon: "https://api.iconify.design/fluent:video-clip-24-filled.svg",
    provider: "Pika",
    website: "https://pika.art",
    pricing: "Ücretli",
    features: [
      "Animasyon üretimi",
      "Karakter oluşturma",
      "Sahne düzenleme"
    ],
    stats: {
      accuracy: "89%",
      speed: "4.5s",
      usage: "300K+"
    },
    badges: ["Yeni", "Premium"]
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "AI destekli kod asistanı",
    category: "Kod Üretimi",
    icon: "https://api.iconify.design/fluent:code-24-filled.svg",
    provider: "GitHub",
    website: "https://github.com/features/copilot",
    pricing: "Ücretli",
    features: [
      "Kod tamamlama",
      "Test üretimi",
      "Dokümantasyon"
    ],
    stats: {
      accuracy: "95%",
      speed: "0.1s",
      usage: "15M+"
    },
    badges: ["Popüler", "Premium"]
  },
  {
    id: "codewhisperer",
    name: "CodeWhisperer",
    description: "Amazon'un kod asistanı",
    category: "Kod Üretimi",
    icon: "https://api.iconify.design/fluent:code-24-filled.svg",
    provider: "Amazon",
    website: "https://aws.amazon.com/codewhisperer",
    pricing: "Freemium",
    features: [
      "AWS entegrasyonu",
      "Güvenlik taraması",
      "IDE desteği"
    ],
    stats: {
      accuracy: "93%",
      speed: "0.2s",
      usage: "5M+"
    },
    badges: ["Yeni"]
  },
  {
    id: "tabnine",
    name: "Tabnine",
    description: "Kişiselleştirilmiş kod tamamlama",
    category: "Kod Üretimi",
    icon: "https://api.iconify.design/fluent:code-24-filled.svg",
    provider: "Tabnine",
    website: "https://www.tabnine.com",
    pricing: "Freemium",
    features: [
      "Özel model eğitimi",
      "Çoklu dil desteği",
      "Takım yönetimi"
    ],
    stats: {
      accuracy: "91%",
      speed: "0.15s",
      usage: "3M+"
    },
    badges: ["Popüler"]
  },
  {
    id: "cohere-classify",
    name: "Cohere Classify",
    description: "Gelişmiş metin sınıflandırma",
    category: "Metin Analizi",
    icon: "https://api.iconify.design/fluent:document-24-filled.svg",
    provider: "Cohere",
    website: "https://cohere.ai",
    pricing: "Ücretli",
    features: [
      "Özel model eğitimi",
      "Çoklu dil desteği",
      "Batch işleme"
    ],
    stats: {
      accuracy: "94%",
      speed: "0.3s",
      usage: "2M+"
    },
    badges: ["Premium"]
  },
  {
    id: "huggingface-transformers",
    name: "Hugging Face Transformers",
    description: "Açık kaynak NLP kütüphanesi",
    category: "Metin Analizi",
    icon: "https://api.iconify.design/fluent:document-24-filled.svg",
    provider: "Hugging Face",
    website: "https://huggingface.co",
    pricing: "Ücretsiz",
    features: [
      "1000+ hazır model",
      "Kolay entegrasyon",
      "Topluluk desteği"
    ],
    stats: {
      accuracy: "92%",
      speed: "0.4s",
      usage: "20M+"
    },
    badges: ["Açık Kaynak", "Popüler"]
  },
  {
    id: "vertex-ai",
    name: "Vertex AI",
    description: "Google'ın ML platformu",
    category: "Veri Analizi",
    icon: "https://api.iconify.design/fluent:data-trending-24-filled.svg",
    provider: "Google",
    website: "https://cloud.google.com/vertex-ai",
    pricing: "Ücretli",
    features: [
      "AutoML",
      "MLOps",
      "Model izleme"
    ],
    stats: {
      accuracy: "96%",
      speed: "0.5s",
      usage: "8M+"
    },
    badges: ["Premium", "Kurumsal"]
  },
  {
    id: "datarobot",
    name: "DataRobot",
    description: "Otomatik ML platformu",
    category: "Veri Analizi",
    icon: "https://api.iconify.design/fluent:data-trending-24-filled.svg",
    provider: "DataRobot",
    website: "https://www.datarobot.com",
    pricing: "Ücretli",
    features: [
      "Otomatik model seçimi",
      "Feature engineering",
      "Model deployment"
    ],
    stats: {
      accuracy: "95%",
      speed: "0.6s",
      usage: "5M+"
    },
    badges: ["Premium", "Kurumsal"]
  },
  {
    id: "point-e",
    name: "Point-E",
    description: "3D nokta bulutu üretimi",
    category: "3D Modelleme",
    icon: "https://api.iconify.design/fluent:cube-24-filled.svg",
    provider: "OpenAI",
    website: "https://github.com/openai/point-e",
    pricing: "Ücretsiz",
    features: [
      "Hızlı üretim",
      "Düşük kaynak kullanımı",
      "Text-to-3D"
    ],
    stats: {
      accuracy: "88%",
      speed: "2.0s",
      usage: "500K+"
    },
    badges: ["Açık Kaynak"]
  },
  {
    id: "shap-e",
    name: "Shap-E",
    description: "3D mesh üretimi",
    category: "3D Modelleme",
    icon: "https://api.iconify.design/fluent:cube-24-filled.svg",
    provider: "OpenAI",
    website: "https://github.com/openai/shap-e",
    pricing: "Ücretsiz",
    features: [
      "Yüksek detay",
      "Texture üretimi",
      "Text-to-3D"
    ],
    stats: {
      accuracy: "87%",
      speed: "2.5s",
      usage: "400K+"
    },
    badges: ["Açık Kaynak", "Yeni"]
  },
  {
    id: "ml-agents",
    name: "ML-Agents",
    description: "Unity için AI framework",
    category: "Oyun Geliştirme",
    icon: "https://api.iconify.design/fluent:games-24-filled.svg",
    provider: "Unity",
    website: "https://unity.com/products/machine-learning-agents",
    pricing: "Ücretsiz",
    features: [
      "Pekiştirmeli öğrenme",
      "Davranış klonlama",
      "Görsel gözlem"
    ],
    stats: {
      accuracy: "90%",
      speed: "0.8s",
      usage: "2M+"
    },
    badges: ["Açık Kaynak"]
  },
  {
    id: "nvidia-omniverse",
    name: "NVIDIA Omniverse",
    description: "AI destekli oyun geliştirme",
    category: "Oyun Geliştirme",
    icon: "https://api.iconify.design/fluent:games-24-filled.svg",
    provider: "NVIDIA",
    website: "https://www.nvidia.com/omniverse",
    pricing: "Ücretli",
    features: [
      "Ray tracing",
      "Fizik motoru",
      "Asset üretimi"
    ],
    stats: {
      accuracy: "96%",
      speed: "1.0s",
      usage: "1M+"
    },
    badges: ["Premium", "Kurumsal"]
  },
  {
    id: "isaac-sim",
    name: "Isaac Sim",
    description: "Robotik simülasyon platformu",
    category: "Robotik",
    icon: "https://api.iconify.design/fluent:robot-24-filled.svg",
    provider: "NVIDIA",
    website: "https://developer.nvidia.com/isaac-sim",
    pricing: "Freemium",
    features: [
      "Fizik motoru",
      "Sensör simülasyonu",
      "Synthetic data"
    ],
    stats: {
      accuracy: "94%",
      speed: "1.2s",
      usage: "500K+"
    },
    badges: ["Premium"]
  },
  {
    id: "ros-2",
    name: "ROS 2",
    description: "Robot işletim sistemi",
    category: "Robotik",
    icon: "https://api.iconify.design/fluent:robot-24-filled.svg",
    provider: "Open Robotics",
    website: "https://docs.ros.org",
    pricing: "Ücretsiz",
    features: [
      "Dağıtık sistemler",
      "Gerçek zamanlı",
      "Simülasyon"
    ],
    stats: {
      accuracy: "93%",
      speed: "0.5s",
      usage: "3M+"
    },
    badges: ["Açık Kaynak", "Popüler"]
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "Gerçekçi ses sentezi",
    category: "Ses İşleme",
    icon: "https://api.iconify.design/fluent:speaker-2-24-filled.svg",
    provider: "ElevenLabs",
    website: "https://elevenlabs.io",
    pricing: "Freemium",
    features: [
      "Ses klonlama",
      "Duygu kontrolü",
      "API erişimi"
    ],
    stats: {
      accuracy: "95%",
      speed: "1.0s",
      usage: "2M+"
    },
    badges: ["Premium", "Popüler"]
  },
  {
    id: "coqui-tts",
    name: "Coqui TTS",
    description: "Açık kaynak ses sentezi",
    category: "Ses İşleme",
    icon: "https://api.iconify.design/fluent:speaker-2-24-filled.svg",
    provider: "Coqui",
    website: "https://github.com/coqui-ai/tts",
    pricing: "Ücretsiz",
    features: [
      "Çoklu model",
      "Hızlı eğitim",
      "Düşük kaynak"
    ],
    stats: {
      accuracy: "89%",
      speed: "1.3s",
      usage: "1M+"
    },
    badges: ["Açık Kaynak"]
  },
  {
    id: "spacy",
    name: "spaCy",
    description: "Endüstriyel NLP kütüphanesi",
    category: "Doğal Dil İşleme",
    icon: "https://api.iconify.design/fluent:document-24-filled.svg",
    provider: "Explosion",
    website: "https://spacy.io",
    pricing: "Ücretsiz",
    features: [
      "Hızlı işleme",
      "Çoklu dil",
      "Pipeline API"
    ],
    stats: {
      accuracy: "92%",
      speed: "0.2s",
      usage: "10M+"
    },
    badges: ["Açık Kaynak", "Popüler"]
  },
  {
    id: "nltk",
    name: "NLTK",
    description: "Kapsamlı NLP toolkit",
    category: "Doğal Dil İşleme",
    icon: "https://api.iconify.design/fluent:document-24-filled.svg",
    provider: "NLTK Project",
    website: "https://www.nltk.org",
    pricing: "Ücretsiz",
    features: [
      "Geniş korpus",
      "Akademik odak",
      "Eğitim araçları"
    ],
    stats: {
      accuracy: "90%",
      speed: "0.3s",
      usage: "8M+"
    },
    badges: ["Açık Kaynak", "Akademik"]
  },
  {
    id: "opencv",
    name: "OpenCV",
    description: "Görüntü işleme kütüphanesi",
    category: "Bilgisayarlı Görü",
    icon: "https://api.iconify.design/fluent:camera-24-filled.svg",
    provider: "OpenCV Team",
    website: "https://opencv.org",
    pricing: "Ücretsiz",
    features: [
      "Gerçek zamanlı",
      "GPU desteği",
      "Geniş algoritma"
    ],
    stats: {
      accuracy: "94%",
      speed: "0.1s",
      usage: "25M+"
    },
    badges: ["Açık Kaynak", "Popüler"]
  },
  {
    id: "detectron2",
    name: "Detectron2",
    description: "Nesne algılama framework'ü",
    category: "Bilgisayarlı Görü",
    icon: "https://api.iconify.design/fluent:camera-24-filled.svg",
    provider: "Facebook AI",
    website: "https://github.com/facebookresearch/detectron2",
    pricing: "Ücretsiz",
    features: [
      "Modüler yapı",
      "SOTA modeller",
      "Hızlı eğitim"
    ],
    stats: {
      accuracy: "95%",
      speed: "0.2s",
      usage: "5M+"
    },
    badges: ["Açık Kaynak", "Araştırma"]
  }
];

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedPricing, setSelectedPricing] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredModels = MODELS.filter(model => {
    const matchesCategory = selectedCategory === "Tümü" || model.category === selectedCategory;
    const matchesPricing = selectedPricing === "Tümü" || model.pricing === selectedPricing;
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPricing && matchesSearch;
  });

  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedModels = filteredModels.slice(startIndex, startIndex + itemsPerPage);

  // Sayfa numaralarını oluşturan fonksiyon
  const getPageNumbers = () => {
    const maxVisiblePages = 5; // Görünecek maksimum sayfa sayısı
    const pages = [];
    
    if (totalPages <= maxVisiblePages) {
      // Toplam sayfa sayısı maxVisiblePages'den azsa tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Her zaman ilk sayfayı göster
      pages.push(1);
      
      // Orta sayfaları hesapla
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Başlangıçta "..." ekle
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Orta sayfaları ekle
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Sonda "..." ekle
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Her zaman son sayfayı göster
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            AI Modelleri
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            İhtiyacınıza uygun AI modelini seçin ve hemen kullanmaya başlayın
          </motion.p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
            {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Model, açıklama veya sağlayıcı ara..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
            </div>

          {/* Category and Price Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="text-sm font-medium text-white/70 mb-2">Kategoriler</div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-white/70 mb-2">Fiyatlandırma</div>
              <div className="flex flex-wrap gap-2">
                {PRICE_FILTERS.map((price) => (
                  <motion.button
                    key={price}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPricing(price)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedPricing === price
                        ? "bg-violet-500 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {price}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {paginatedModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-[#1A1A23] flex items-center justify-center">
                        <Image
                          src={model.icon}
                          alt={model.name}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          style={{ filter: 'invert(1)' }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                          {model.name}
                        </h3>
                          {model.badges?.map((badge) => (
                            <span
                              key={badge}
                              className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 text-xs rounded-full bg-[#1A1A23] text-white/70 border border-white/[0.05]">
                          {model.category}
                        </span>
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            model.pricing === "Ücretsiz"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : model.pricing === "Ücretli"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          }`}>
                            {model.pricing}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (isFavorite(model.id)) {
                          removeFavorite(model.id);
                        } else {
                          addFavorite(model.id);
                        }
                      }}
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                        isFavorite(model.id)
                          ? "bg-violet-500 text-white"
                          : "bg-white/5 text-white/40 group-hover:text-violet-400"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-4 text-white/60">
                    {model.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {model.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-lg bg-[#1A1A23] text-white/70 border border-white/[0.05]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                    {Object.entries(model.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm text-white/40">
                          {key === "accuracy" ? "Doğruluk" :
                           key === "speed" ? "Hız" :
                           "Kullanım"}
                        </div>
                        <div className="text-lg font-medium text-white group-hover:text-violet-400 transition-colors">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.05]">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-white/40">Sağlayıcı</div>
                        <div className="text-sm text-white/70">{model.provider}</div>
                      </div>
                      <a
                        href={model.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 transition-colors text-sm flex items-center gap-1"
                      >
                        Website
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>

                    <Link href={`/models/${model.id}`}>
                      <div className="flex items-center gap-2 text-white/70 group-hover:text-violet-400 transition-colors">
                        <span>Detayları Gör</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-[#1A1A23] text-white/40 cursor-not-allowed"
                  : "bg-[#1A1A23] text-white hover:bg-violet-500/10 hover:text-violet-400"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <div className="flex items-center gap-2">
              {getPageNumbers().map((page, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-violet-500 text-white"
                      : page === '...'
                      ? "bg-transparent text-white/40 cursor-default"
                      : "bg-[#1A1A23] text-white hover:bg-violet-500/10 hover:text-violet-400"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-[#1A1A23] text-white/40 cursor-not-allowed"
                  : "bg-[#1A1A23] text-white hover:bg-violet-500/10 hover:text-violet-400"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 