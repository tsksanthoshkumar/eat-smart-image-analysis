
// Comprehensive nutrition database based on USDA data
export const nutritionDatabase: Record<string, {
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fiber: number;
  sugar: number;
  servingSize: string;
  servingWeight: number;
}> = {
  // Fruits
  'Apple': {
    calories: 95,
    carbohydrates: 25.1,
    proteins: 0.5,
    fats: 0.3,
    fiber: 4.4,
    sugar: 18.9,
    servingSize: '1 medium apple',
    servingWeight: 182,
  },
  'Banana': {
    calories: 105,
    carbohydrates: 27.0,
    proteins: 1.3,
    fats: 0.4,
    fiber: 3.1,
    sugar: 14.4,
    servingSize: '1 medium banana',
    servingWeight: 118,
  },
  'Orange': {
    calories: 62,
    carbohydrates: 15.4,
    proteins: 1.2,
    fats: 0.2,
    fiber: 3.1,
    sugar: 12.2,
    servingSize: '1 medium orange',
    servingWeight: 154,
  },
  'Strawberries': {
    calories: 49,
    carbohydrates: 11.7,
    proteins: 1.0,
    fats: 0.5,
    fiber: 3.0,
    sugar: 7.4,
    servingSize: '1 cup sliced',
    servingWeight: 152,
  },

  // Vegetables
  'Broccoli': {
    calories: 55,
    carbohydrates: 11.2,
    proteins: 3.7,
    fats: 0.6,
    fiber: 5.1,
    sugar: 2.6,
    servingSize: '1 cup chopped',
    servingWeight: 156,
  },
  'Carrot': {
    calories: 25,
    carbohydrates: 5.8,
    proteins: 0.5,
    fats: 0.1,
    fiber: 1.7,
    sugar: 2.9,
    servingSize: '1 medium carrot',
    servingWeight: 61,
  },
  'Spinach': {
    calories: 7,
    carbohydrates: 1.1,
    proteins: 0.9,
    fats: 0.1,
    fiber: 0.7,
    sugar: 0.1,
    servingSize: '1 cup raw',
    servingWeight: 30,
  },

  // Proteins
  'Chicken Breast': {
    calories: 165,
    carbohydrates: 0.0,
    proteins: 31.0,
    fats: 3.6,
    fiber: 0.0,
    sugar: 0.0,
    servingSize: '3.5 oz (100g)',
    servingWeight: 100,
  },
  'Salmon': {
    calories: 208,
    carbohydrates: 0.0,
    proteins: 22.1,
    fats: 12.4,
    fiber: 0.0,
    sugar: 0.0,
    servingSize: '3.5 oz (100g)',
    servingWeight: 100,
  },
  'Eggs': {
    calories: 155,
    carbohydrates: 1.1,
    proteins: 13.0,
    fats: 10.6,
    fiber: 0.0,
    sugar: 1.1,
    servingSize: '2 large eggs',
    servingWeight: 100,
  },

  // Grains
  'Brown Rice': {
    calories: 112,
    carbohydrates: 23.0,
    proteins: 2.6,
    fats: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    servingSize: '1/2 cup cooked',
    servingWeight: 98,
  },
  'Quinoa': {
    calories: 111,
    carbohydrates: 19.7,
    proteins: 4.1,
    fats: 1.8,
    fiber: 2.6,
    sugar: 0.9,
    servingSize: '1/2 cup cooked',
    servingWeight: 92,
  },
  'Whole Wheat Bread': {
    calories: 81,
    carbohydrates: 13.8,
    proteins: 3.9,
    fats: 1.1,
    fiber: 1.9,
    sugar: 1.4,
    servingSize: '1 slice',
    servingWeight: 28,
  },

  // Dairy
  'Greek Yogurt': {
    calories: 59,
    carbohydrates: 3.6,
    proteins: 10.3,
    fats: 0.4,
    fiber: 0.0,
    sugar: 3.2,
    servingSize: '100g',
    servingWeight: 100,
  },
  'Cheddar Cheese': {
    calories: 113,
    carbohydrates: 0.4,
    proteins: 7.0,
    fats: 9.3,
    fiber: 0.0,
    sugar: 0.1,
    servingSize: '1 oz (28g)',
    servingWeight: 28,
  },

  // Nuts and Seeds
  'Almonds': {
    calories: 164,
    carbohydrates: 6.1,
    proteins: 6.0,
    fats: 14.2,
    fiber: 3.5,
    sugar: 1.2,
    servingSize: '1 oz (28g)',
    servingWeight: 28,
  },
  'Avocado': {
    calories: 234,
    carbohydrates: 12.0,
    proteins: 2.9,
    fats: 21.4,
    fiber: 9.9,
    sugar: 1.0,
    servingSize: '1/2 medium avocado',
    servingWeight: 150,
  },

  // Fast Food / Common Items
  'Pizza Slice': {
    calories: 285,
    carbohydrates: 36.0,
    proteins: 12.0,
    fats: 10.4,
    fiber: 2.5,
    sugar: 3.8,
    servingSize: '1 slice (14" pizza)',
    servingWeight: 107,
  },
  'Hamburger': {
    calories: 540,
    carbohydrates: 40.0,
    proteins: 25.0,
    fats: 31.0,
    fiber: 3.0,
    sugar: 5.0,
    servingSize: '1 burger',
    servingWeight: 150,
  },
  'French Fries': {
    calories: 365,
    carbohydrates: 63.2,
    proteins: 4.0,
    fats: 17.0,
    fiber: 3.8,
    sugar: 0.3,
    servingSize: 'Medium serving',
    servingWeight: 115,
  },
};
