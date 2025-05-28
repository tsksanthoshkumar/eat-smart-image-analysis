
// Enhanced Indian food recognition patterns and keywords
export const indianFoodPatterns = {
  // Visual characteristics that help identify Indian foods
  visualCues: {
    roundWhite: ['Idli', 'Rasgulla', 'Steamed Idli'],
    goldenbrown: ['Samosa', 'Kachori', 'Jalebi', 'Pakora', 'Vada Pav'],
    crepe: ['Masala Dosa', 'Plain Dosa', 'Rava Dosa', 'Dosa with Curries'],
    curry: ['Butter Chicken', 'Palak Paneer', 'Dal Tadka', 'Rajma', 'Chapati with Curry'],
    rice: ['Chicken Biryani', 'Vegetable Biryani', 'Basmati Rice', 'Jeera Rice', 'Dal and Rice'],
    bread: ['Chapati', 'Naan', 'Paratha'],
    fried: ['Medu Vada', 'Pakora', 'Samosa', 'Vada Pav'],
    sweet: ['Gulab Jamun', 'Kheer', 'Jalebi'],
    streetFood: ['Pani Puri', 'Sev Puri', 'Bhel Puri', 'Vada Pav'],
    smallRound: ['Pani Puri', 'Idli', 'Vada'],
    flatCrispy: ['Sev Puri', 'Bhel Puri']
  },
  
  // Enhanced regional preferences for better accuracy
  regionalPreferences: {
    south: ['Idli', 'Dosa', 'Sambhar', 'Rasam', 'Uttapam', 'Coconut Chutney', 'Medu Vada', 'Dosa with Curries'],
    north: ['Naan', 'Butter Chicken', 'Paneer Tikka', 'Paratha', 'Chapati with Curry'],
    west: ['Vada Pav', 'Dhokla', 'Bhel Puri', 'Pani Puri', 'Sev Puri'],
    east: ['Rasgulla', 'Fish Curry'],
    streetFood: ['Pani Puri', 'Sev Puri', 'Vada Pav', 'Samosa']
  },
  
  // Common combinations with enhanced accuracy
  commonCombos: [
    ['Idli', 'Sambhar', 'Coconut Chutney'],
    ['Masala Dosa', 'Sambhar', 'Coconut Chutney'],
    ['Dosa with Curries', 'Sambhar', 'Coconut Chutney'],
    ['Dal and Rice', 'Mango Pickle'],
    ['Chapati with Curry', 'Basmati Rice'],
    ['Dal Tadka', 'Basmati Rice', 'Chapati'],
    ['Butter Chicken', 'Naan', 'Basmati Rice'],
    ['Rajma', 'Basmati Rice'],
    ['Curd Rice', 'Mango Pickle'],
    ['Pani Puri', 'Sev Puri'],
    ['Chicken Biryani', 'Boiled Egg']
  ],

  // New: Enhanced visual pattern matching
  shapePatterns: {
    round: ['Pani Puri', 'Idli', 'Vada', 'Gulab Jamun'],
    triangular: ['Samosa'],
    flat: ['Dosa', 'Chapati', 'Naan', 'Sev Puri'],
    bowl: ['Dal', 'Curry', 'Sambhar'],
    oval: ['Banana', 'Egg'],
    mixed: ['Salad', 'Biryani', 'Dal and Rice']
  },

  // Color-based recognition
  colorPatterns: {
    yellow: ['Banana', 'Dal', 'Turmeric Rice'],
    white: ['Idli', 'Rice', 'Coconut Chutney'],
    brown: ['Samosa', 'Vada Pav', 'Chicken'],
    green: ['Salad', 'Mint Chutney', 'Palak'],
    red: ['Pickle', 'Tomato Curry']
  }
};

// Enhanced nutritional insights specific to Indian cuisine
export const indianNutritionInsights = {
  highProtein: ['Dal Tadka', 'Rajma', 'Chana Masala', 'Paneer Tikka', 'Chicken Breast', 'Boiled Egg', 'Dal and Rice'],
  highFiber: ['Dal Makhani', 'Rajma', 'Chapati', 'Whole Wheat items', 'Salad'],
  lowCalorie: ['Idli', 'Plain Dosa', 'Sambhar', 'Rasam', 'Salad'],
  balanced: ['Chicken Biryani', 'Vegetable Biryani', 'Curd Rice', 'Dal and Rice'],
  indulgent: ['Butter Chicken', 'Naan', 'Gulab Jamun', 'Kheer', 'Vada Pav'],
  streetFood: ['Pani Puri', 'Sev Puri', 'Vada Pav', 'Samosa'],
  healthy: ['Salad', 'Idli', 'Dal', 'Banana']
};

// Enhanced helper function to get related foods
export const getRelatedIndianFoods = (foodName: string): string[] => {
  for (const combo of indianFoodPatterns.commonCombos) {
    if (combo.includes(foodName)) {
      return combo.filter(item => item !== foodName);
    }
  }
  
  // Additional logic for standalone items
  const relatedItems: Record<string, string[]> = {
    'Pani Puri': ['Sev Puri', 'Bhel Puri'],
    'Sev Puri': ['Pani Puri', 'Bhel Puri'],
    'Vada Pav': ['Masala Chai'],
    'Biryani': ['Boiled Egg', 'Raita'],
    'Samosa': ['Masala Chai', 'Green Chutney'],
    'Banana': ['Milk', 'Honey'],
    'Salad': ['Olive Oil', 'Lemon'],
    'Chicken Breast': ['Rice', 'Vegetables']
  };
  
  return relatedItems[foodName] || [];
};

// Enhanced nutritional category function
export const getNutritionalCategory = (foodName: string): string => {
  for (const [category, foods] of Object.entries(indianNutritionInsights)) {
    if (foods.includes(foodName)) {
      return category;
    }
  }
  return 'standard';
};

// New: Food recognition confidence booster
export const getConfidenceBoost = (foodName: string): number => {
  const highConfidenceFoods = [
    'Pani Puri', 'Sev Puri', 'Idli', 'Dosa', 'Samosa', 'Vada Pav', 
    'Biryani', 'Dal and Rice', 'Chapati with Curry', 'Banana', 'Boiled Egg'
  ];
  
  return highConfidenceFoods.includes(foodName) ? 0.15 : 0.05;
};

// New: Visual similarity matching
export const getVisualSimilarFoods = (foodName: string): string[] => {
  const similarityMap: Record<string, string[]> = {
    'Pani Puri': ['Gol Gappa', 'Puchka'],
    'Sev Puri': ['Bhel Puri', 'Papdi Chaat'],
    'Idli': ['Dhokla', 'Steamed Rice Cake'],
    'Dosa': ['Crepe', 'Uttapam'],
    'Samosa': ['Spring Roll', 'Dumpling'],
    'Vada': ['Donut', 'Ring-shaped Snack']
  };
  
  return similarityMap[foodName] || [];
};
