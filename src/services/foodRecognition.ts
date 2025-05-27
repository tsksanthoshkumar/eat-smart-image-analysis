
import { NutritionData, FoodRecognitionResult } from '@/types/nutrition';
import { nutritionDatabase } from '@/data/nutritionDatabase';

// Enhanced food recognition with Indian food categorization
const indianFoodCategories = {
  southIndian: [
    'Idli', 'Medu Vada', 'Masala Dosa', 'Plain Dosa', 'Rava Dosa', 'Uttapam', 
    'Sambhar', 'Coconut Chutney', 'Rasam', 'Curd Rice'
  ],
  northIndian: [
    'Chicken Biryani', 'Mutton Biryani', 'Vegetable Biryani', 'Paneer Curry with Chapati',
    'Paneer Tikka', 'Palak Paneer', 'Butter Chicken', 'Chicken Curry', 'Tandoori Chicken',
    'Chapati', 'Naan', 'Garlic Naan', 'Butter Naan', 'Paratha', 'Aloo Paratha'
  ],
  dalsAndLentils: [
    'Dal Tadka', 'Dal Makhani', 'Rajma', 'Chana Masala'
  ],
  riceAndGrains: [
    'Basmati Rice', 'Jeera Rice'
  ],
  streetFood: [
    'Vada Pav', 'Samosa', 'Kachori', 'Pani Puri', 'Bhel Puri', 'Sev Puri', 'Dhokla', 'Pakora'
  ],
  beverages: [
    'Masala Chai', 'Lassi (Sweet)', 'Mango Lassi', 'Nimbu Paani'
  ],
  sweets: [
    'Gulab Jamun', 'Rasgulla', 'Kheer', 'Jalebi'
  ],
  sides: [
    'Mango Pickle', 'Papad', 'Boiled Egg'
  ]
};

// All Indian foods combined
const allIndianFoods = Object.values(indianFoodCategories).flat();

// Simulated food recognition service with enhanced Indian food detection
export const recognizeFood = async (imageBase64: string): Promise<NutritionData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Enhanced food recognition with Indian food bias
  const recognitionResult = simulateFoodRecognition(imageBase64);
  
  // Get nutrition data from database
  const nutritionData = getNutritionData(recognitionResult.foodName);

  console.log('Enhanced Indian food recognition:', {
    foodName: recognitionResult.foodName,
    confidence: recognitionResult.confidence,
    isIndianFood: allIndianFoods.includes(recognitionResult.foodName)
  });

  return {
    foodName: recognitionResult.foodName,
    confidence: recognitionResult.confidence,
    nutrition: nutritionData,
    imageUrl: imageBase64,
  };
};

// Enhanced recognition with Indian food preference
const simulateFoodRecognition = (imageBase64: string): FoodRecognitionResult => {
  const allFoodItems = Object.keys(nutritionDatabase);
  
  // Create weighted selection favoring Indian foods (60% chance for Indian food)
  const shouldSelectIndianFood = Math.random() < 0.6;
  
  let selectedFood: string;
  let confidence: number;
  
  if (shouldSelectIndianFood && allIndianFoods.length > 0) {
    // Select from Indian foods with category-based weighting
    const categoryWeights = {
      southIndian: 0.25,
      northIndian: 0.25,
      streetFood: 0.2,
      dalsAndLentils: 0.15,
      riceAndGrains: 0.1,
      beverages: 0.03,
      sweets: 0.02
    };
    
    const randomValue = Math.random();
    let cumulativeWeight = 0;
    let selectedCategory = 'southIndian';
    
    for (const [category, weight] of Object.entries(categoryWeights)) {
      cumulativeWeight += weight;
      if (randomValue <= cumulativeWeight) {
        selectedCategory = category;
        break;
      }
    }
    
    const categoryFoods = indianFoodCategories[selectedCategory as keyof typeof indianFoodCategories];
    selectedFood = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
    
    // Higher confidence for Indian foods (80-95%)
    confidence = 0.8 + Math.random() * 0.15;
  } else {
    // Select from non-Indian foods
    const nonIndianFoods = allFoodItems.filter(food => !allIndianFoods.includes(food));
    selectedFood = nonIndianFoods[Math.floor(Math.random() * nonIndianFoods.length)];
    
    // Standard confidence for non-Indian foods (75-90%)
    confidence = 0.75 + Math.random() * 0.15;
  }

  return {
    foodName: selectedFood,
    confidence,
  };
};

const getNutritionData = (foodName: string) => {
  const baseNutrition = nutritionDatabase[foodName] || nutritionDatabase['Apple'];
  
  // Reduced variation for more accurate Indian food recognition (±5% instead of ±10%)
  const isIndianFood = allIndianFoods.includes(foodName);
  const variationRange = isIndianFood ? 0.05 : 0.1; // Less variation for Indian foods
  const variation = (1 - variationRange) + Math.random() * (variationRange * 2);
  
  return {
    calories: Math.round(baseNutrition.calories * variation),
    carbohydrates: Math.round(baseNutrition.carbohydrates * variation * 10) / 10,
    proteins: Math.round(baseNutrition.proteins * variation * 10) / 10,
    fats: Math.round(baseNutrition.fats * variation * 10) / 10,
    fiber: Math.round(baseNutrition.fiber * variation * 10) / 10,
    sugar: Math.round(baseNutrition.sugar * variation * 10) / 10,
    servingSize: baseNutrition.servingSize,
    servingWeight: baseNutrition.servingWeight,
  };
};

// Export utility functions for potential future use
export const getIndianFoodCategories = () => indianFoodCategories;
export const getAllIndianFoods = () => allIndianFoods;
export const isIndianFood = (foodName: string) => allIndianFoods.includes(foodName);
