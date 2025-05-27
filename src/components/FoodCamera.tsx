
import React, { useRef, useState } from 'react';
import { Camera, Upload, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { recognizeFood } from '@/services/foodRecognition';
import { NutritionData } from '@/types/nutrition';
import { useToast } from '@/hooks/use-toast';

interface FoodCameraProps {
  onFoodAnalyzed: (data: NutritionData) => void;
  onAnalysisStart: () => void;
  isAnalyzing: boolean;
  onReset: () => void;
}

export const FoodCamera: React.FC<FoodCameraProps> = ({
  onFoodAnalyzed,
  onAnalysisStart,
  isAnalyzing,
  onReset,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const analyzeFood = async () => {
    if (!selectedImage) return;

    onAnalysisStart();
    
    try {
      const result = await recognizeFood(selectedImage);
      onFoodAnalyzed(result);
      
      toast({
        title: "Analysis complete!",
        description: `Identified: ${result.foodName}`,
      });
    } catch (error) {
      console.error('Food recognition error:', error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
      onReset();
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    onReset();
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-green-200">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Upload Food Image
          </h3>
          <p className="text-sm text-gray-600">
            Take a photo or upload an image to analyze nutrition content
          </p>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected food"
              className="w-full h-64 object-cover rounded-lg border-2 border-green-200"
            />
            <Button
              onClick={resetImage}
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Upload Area */}
        {!selectedImage && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  Drop your food image here
                </p>
                <p className="text-sm text-gray-600">
                  or click to browse files
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => cameraInputRef.current?.click()}
            variant="outline"
            className="flex-1 border-green-300 hover:bg-green-50"
            disabled={isAnalyzing}
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex-1 border-orange-300 hover:bg-orange-50"
            disabled={isAnalyzing}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Analyze Button */}
        {selectedImage && (
          <Button
            onClick={analyzeFood}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Nutrition'
            )}
          </Button>
        )}

        {/* Hidden Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </Card>
  );
};
