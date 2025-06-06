
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NutritionData } from '@/types/nutrition';
import { Loader2, Zap, Apple, Beef, Droplets, MapPin, Star } from 'lucide-react';
import { isIndianFood, getAllIndianFoods, isPriorityFood } from '@/services/foodRecognition';
import { getRelatedIndianFoods, getNutritionalCategory } from '@/utils/indianFoodHelper';

interface NutritionDisplayProps {
  data: NutritionData | null;
  isLoading: boolean;
}

export const NutritionDisplay: React.FC<NutritionDisplayProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card className="p-8 bg-white/70 backdrop-blur-sm border-green-200">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analyzing your food...
            </h3>
            <p className="text-sm text-gray-600">
              Our AI is identifying the food and calculating nutrition facts
            </p>
            <p className="text-xs text-orange-600 mt-1">
              🇮🇳 Enhanced recognition for Indian cuisine & your favorite foods
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-8 bg-white/50 backdrop-blur-sm border-gray-200">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Apple className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Ready to analyze
            </h3>
            <p className="text-sm text-gray-500">
              Upload a food image to see detailed nutrition information
            </p>
            <p className="text-xs text-orange-600 mt-1">
              🇮🇳 Specialized in Indian cuisine recognition
            </p>
            <p className="text-xs text-blue-600 mt-1">
              ⭐ Enhanced for: Pani Puri, Sev Puri, Biryani, Idli, Dosa & more!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const { foodName, confidence, nutrition } = data;
  const isIndian = isIndianFood(foodName);
  const isPriority = isPriorityFood(foodName);
  const relatedFoods = getRelatedIndianFoods(foodName);
  const nutritionalCategory = getNutritionalCategory(foodName);

  const macronutrients = [
    {
      name: 'Carbohydrates',
      value: nutrition.carbohydrates,
      unit: 'g',
      color: 'bg-orange-500',
      icon: Apple,
    },
    {
      name: 'Proteins',
      value: nutrition.proteins,
      unit: 'g',
      color: 'bg-red-500',
      icon: Beef,
    },
    {
      name: 'Fats',
      value: nutrition.fats,
      unit: 'g',
      color: 'bg-yellow-500',
      icon: Droplets,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'highProtein': return 'bg-red-100 text-red-800 border-red-200';
      case 'highFiber': return 'bg-green-100 text-green-800 border-green-200';
      case 'lowCalorie': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'balanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'indulgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'streetFood': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'healthy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Food Identification */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-900">{foodName}</h2>
            <Badge 
              variant="secondary" 
              className="bg-green-100 text-green-800 border-green-200"
            >
              {Math.round(confidence * 100)}% confidence
            </Badge>
            {isIndian && (
              <Badge 
                variant="secondary" 
                className="bg-orange-100 text-orange-800 border-orange-200"
              >
                <MapPin className="h-3 w-3 mr-1" />
                Indian Cuisine
              </Badge>
            )}
            {isPriority && (
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-800 border-blue-200"
              >
                <Star className="h-3 w-3 mr-1" />
                Enhanced Recognition
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Serving size: {nutrition.servingSize} ({nutrition.servingWeight}g)
          </p>
          {nutritionalCategory !== 'standard' && (
            <Badge 
              variant="outline" 
              className={`mt-2 ${getCategoryColor(nutritionalCategory)}`}
            >
              {nutritionalCategory.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </Badge>
          )}
        </div>
      </Card>

      {/* Calories */}
      <Card className="p-6 bg-gradient-to-r from-green-500 to-orange-500 text-white">
        <div className="text-center">
          <Zap className="h-8 w-8 mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{nutrition.calories}</div>
          <div className="text-sm opacity-90">Calories (kcal)</div>
        </div>
      </Card>

      {/* Macronutrients */}
      <div className="grid grid-cols-3 gap-3">
        {macronutrients.map((macro) => (
          <Card key={macro.name} className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
            <div className="text-center">
              <div className={`w-8 h-8 ${macro.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <macro.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">
                {macro.value}{macro.unit}
              </div>
              <div className="text-xs text-gray-600">{macro.name}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Nutrients */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Additional Nutrients</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Fiber</span>
            <span className="font-medium text-gray-900">{nutrition.fiber}g</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Sugar</span>
            <span className="font-medium text-gray-900">{nutrition.sugar}g</span>
          </div>
        </div>
      </Card>

      {/* Related Foods (enhanced for priority foods) */}
      {(isIndian || isPriority) && relatedFoods.length > 0 && (
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-200">
          <h3 className="font-semibold text-gray-900 mb-3">
            {isPriority ? 'Perfect combinations' : 'Commonly served with'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedFoods.map((food) => (
              <Badge 
                key={food}
                variant="outline" 
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                {food}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
