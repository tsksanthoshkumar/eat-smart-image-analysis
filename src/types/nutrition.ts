
export interface NutritionData {
  foodName: string;
  confidence: number;
  nutrition: {
    calories: number;
    carbohydrates: number;
    proteins: number;
    fats: number;
    fiber: number;
    sugar: number;
    servingSize: string;
    servingWeight: number; // in grams
  };
  imageUrl?: string;
}

export interface FoodRecognitionResult {
  foodName: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
