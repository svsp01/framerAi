"use client"
import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OrderNow = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Order Your AI Creation</h1>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900">
          <ShoppingCart className="mr-2" /> Cart (0)
        </Button>
      </header>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl">Step {step} of 3</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div>
                <h2 className="text-xl mb-4">Choose Your Image</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-700 rounded-lg cursor-pointer hover:ring-2 hover:ring-white"></div>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-xl mb-4">Select Frame and Size</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20">Classic Frame</Button>
                  <Button variant="outline" className="h-20">Modern Frame</Button>
                  <Button variant="outline" className="h-20">Canvas Print</Button>
                  <Button variant="outline" className="h-20">Poster</Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-xl mb-4">Review and Checkout</h2>
                <div className="flex space-x-4">
                  <div className="w-1/2 aspect-square bg-gray-700 rounded-lg"></div>
                  <div className="w-1/2">
                    <p className="mb-2">Selected Image: AI Creation #1234</p>
                    <p className="mb-2">Frame: Classic Frame</p>
                    <p className="mb-2">Size: 18" x 24"</p>
                    <p className="text-2xl font-bold mt-4">Total: $129.99</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button onClick={prevStep} className="bg-gray-700 hover:bg-gray-600">
              <ArrowLeft className="mr-2" /> Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={nextStep} className="bg-blue-500 hover:bg-blue-600 ml-auto">
              Next <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button className="bg-green-500 hover:bg-green-600 ml-auto">
              Complete Order <ShoppingCart className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderNow;