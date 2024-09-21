"use client"
import React, { useState } from 'react';
import { Image, Filter, Download, Share2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const images = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    src: `/api/placeholder/${300 + i * 10}/${300 + i * 10}`,
    type: ['portrait', 'landscape', 'abstract'][i % 3],
  }));

  const filteredImages = filter === 'all' ? images : images.filter(img => img.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 to-purple-800 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">AI Art Gallery</h1>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-pink-900">
          <Filter className="mr-2" /> Filter
        </Button>
      </header>

      <div className="mb-8 flex space-x-4">
        {['all', 'portrait', 'landscape', 'abstract'].map((type) => (
          <Button 
            key={type}
            onClick={() => setFilter(type)}
            variant={filter === type ? 'default' : 'outline'}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Card 
            key={image.id} 
            className="bg-gray-800 border-gray-700 cursor-pointer hover:ring-2 hover:ring-white transition-all"
            onClick={() => setSelectedImage(image)}
          >
            <CardContent className="p-0">
              <img src={image.src} alt={`AI generated ${image.type}`} className="w-full h-full object-cover rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-4 rounded-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">AI Creation #{selectedImage.id}</h2>
              <Button variant="ghost" onClick={() => setSelectedImage(null)}>
                <X />
              </Button>
            </div>
            <img src={selectedImage.src} alt={`AI generated ${selectedImage.type}`} className="w-full rounded-lg mb-4" />
            <div className="flex justify-between">
              <Button variant="outline" className="flex-1 mr-2">
                <Download className="mr-2" /> Download
              </Button>
              <Button variant="outline" className="flex-1 ml-2">
                <Share2 className="mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;