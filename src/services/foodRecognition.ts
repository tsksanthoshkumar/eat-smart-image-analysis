
import { NutritionData, FoodRecognitionResult } from '@/types/nutrition';
import { nutritionDatabase } from '@/data/nutritionDatabase';

// Simulated food recognition service
// In a real app, this would call a computer vision API like Google Vision, AWS Rekognition, or a custom model
export const recognizeFood = async (imageBase64: string): Promise<NutritionData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Simulate food recognition result
  const recognitionResult = simulateFoodRecognition(imageBase64);
  
  // Get nutrition data from database
  const nutritionData = getNutritionData(recognitionResult.foodName);

  return {
    foodName: recognitionResult.foodName,
    confidence: recognitionResult.confidence,
    nutrition: nutritionData,
    imageUrl: imageBase64,
  };
};

// Simulated computer vision model
const simulateFoodRecognition = (imageBase64: string): FoodRecognitionResult => {
  // In a real implementation, this would send the image to a food classification model
  // For demo purposes, we'll randomly select from our nutrition database
  const foodItems = Object.keys(nutritionDatabase);
  const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
  
  // Simulate confidence score (in real app, this comes from the ML model)
  const confidence = 0.75 + Math.random() * 0.2; // 75-95% confidence

  console.log('Food recognition result:', { foodName: randomFood, confidence });

  return {
    foodName: randomFood,
    confidence,
  };
};

const getNutritionData = (foodName: string) => {
  const baseNutrition = nutritionDatabase[foodName] || nutritionDatabase['Apple'];
  
  // Add some variation to simulate different serving sizes/preparations
  const variation = 0.9 + Math.random() * 0.2; // ±10% variation
  
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
