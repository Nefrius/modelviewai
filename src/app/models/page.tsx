"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";
import Image from "next/image";
import { MODELS } from "./constants";

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