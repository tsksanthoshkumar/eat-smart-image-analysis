
import React, { useState } from 'react';
import { FoodCamera } from '@/components/FoodCamera';
import { NutritionDisplay } from '@/components/NutritionDisplay';
import { NutritionData } from '@/types/nutrition';
import { Utensils, Sparkles } from 'lucide-react';

const Index = () => {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFoodAnalyzed = (data: NutritionData) => {
    setNutritionData(data);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setNutritionData(null);
  };

  const handleReset = () => {
    setNutritionData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NutriVision</h1>
              <p className="text-sm text-gray-600">AI-Powered Food Nutrition Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!nutritionData && !isAnalyzing && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full border border-green-200 mb-6">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                Snap a photo to discover nutrition facts instantly
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover What's In Your Food
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a photo or upload an image of any food item and get instant nutritional 
              analysis including calories, macronutrients, and serving size estimates.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera/Upload Section */}
          <div className="order-2 lg:order-1">
            <FoodCamera 
              onFoodAnalyzed={handleFoodAnalyzed}
              onAnalysisStart={handleAnalysisStart}
              isAnalyzing={isAnalyzing}
              onReset={handleReset}
            />
          </div>

          {/* Results Section */}
          <div className="order-1 lg:order-2">
            <NutritionDisplay 
              data={nutritionData} 
              isLoading={isAnalyzing}
            />
          </div>
        </div>

        {/* Features */}
        {!nutritionData && !isAnalyzing && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/50 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Recognition</h3>
              <p className="text-sm text-gray-600">Advanced AI identifies food items with high accuracy</p>
            </div>
            
            <div className="text-center p-6 bg-white/50 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
              <p className="text-sm text-gray-600">Complete nutritional breakdown per serving</p>
            </div>
            
            <div className="text-center p-6 bg-white/50 rounded-2xl border border-yellow-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-sm text-gray-600">Get nutrition facts in seconds</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
