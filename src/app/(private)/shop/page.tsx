"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Crown, Sparkles, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { toast, Toaster } from 'react-hot-toast';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    isPremium: boolean;
    category: 'tshirt' | 'phoneCase' | 'laptopSkin' | 'poster' | 'frame';
}

const AIArtShop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            const generateProducts = (): Product[] => {
                const categories = ['tshirt', 'phoneCase', 'laptopSkin', 'poster', 'frame'];
                return Array(50).fill(null).map((_, i) => ({
                    id: i + 1,
                    name: `AI Art ${categories[i % 5].charAt(0).toUpperCase() + categories[i % 5].slice(1)} #${i + 1}`,
                    price: Math.floor(Math.random() * 50) + 20,
                    image: `/api/placeholder/${300 + i}/${300 + i}`,
                    isPremium: Math.random() > 0.7,
                    category: categories[i % 5] as Product['category'],
                }));
            };

            setProducts(generateProducts());
            setIsLoading(false);
        }, 1500);
    }, []);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
        toast.success('Added to cart!');
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
        toast.success('Removed from cart!');
    };

    const openProductModal = (product: Product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleOrder = () => {
        toast.success('Order received! Our representative will contact you via email.');
        setCart([]);
        setIsCartOpen(false);
    };

    const renderProductSection = (title: string, products: Product[]) => (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-gray-700">
                <div className="flex w-max space-x-4 p-4">
                    {products.map(product => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="w-48 bg-gray-800  border-gray-700 cursor-pointer relative overflow-hidden group">
                                <CardContent className="p-0">
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                    <div className="absolute text-gray-400 inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <p className="text-sm mb-2">{product.name}</p>
                                        <p className="text-sm mb-2">${product.price.toFixed(2)}</p>
                                        {product.isPremium && (
                                            <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                                                <Crown className="w-3 h-3 mr-1" /> Premium
                                            </Badge>
                                        )}
                                        <Button size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
                                        <Button size="sm" variant="outline" className="mt-2" onClick={() => openProductModal(product)}>View Details</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );

    return (
        <div className="min-h-screen bg-black border rounded-xl text-white p-8">
            <Toaster position="top-right" />
            <h1 className="text-2xl w-full flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text font-mono font-bold">AI Art Shop</h1>
            <header className="flex justify-end items-center mb-12">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900" onClick={() => setIsCartOpen(true)}>
                    <ShoppingCart className="mr-2" /> Cart ({cart.length})
                </Button>
            </header>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>

                        {/* <Sparkles className="w-16 h-16 text-blue-400" /> */}
                    </motion.div>
                </div>
            ) : (
                <>
                    {renderProductSection("Premium AI Art", products.filter(p => p.isPremium))}
                    {renderProductSection("T-Shirts", products.filter(p => p.category === 'tshirt'))}
                    {renderProductSection("Phone Cases", products.filter(p => p.category === 'phoneCase'))}
                    {renderProductSection("Laptop Skins", products.filter(p => p.category === 'laptopSkin'))}
                    {renderProductSection("Posters", products.filter(p => p.category === 'poster'))}
                    {renderProductSection("Frames", products.filter(p => p.category === 'frame'))}
                </>
            )}

            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                <DialogContent className="bg-gray-800 border-gray-700">
                    <DialogHeader>
                        <DialogTitle>Product Details</DialogTitle>
                    </DialogHeader>
                    {selectedProduct && (
                        <div className="space-y-4 ">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-md" />
                            <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                            <p>${selectedProduct.price.toFixed(2)}</p>
                            {selectedProduct.isPremium && (
                                <Badge className="bg-yellow-500 text-black">
                                    <Crown className="w-3 h-3 mr-1" /> Premium
                                </Badge>
                            )}
                            <Button className="w-full" onClick={() => addToCart(selectedProduct)}>Add to Cart</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent className="bg-gray-800 h-screen border-gray-700 py-10 text-white">
                    <SheetHeader>
                        <SheetTitle className="text-white">Your Cart</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 flex flex-col h-[calc(h-[100vh]-[100px])]">


                        <div className="flex-grow overflow-y-auto">
                            {cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between py-4">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center ">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold">${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full"
                            onClick={handleOrder}
                            disabled={cart.length === 0}
                        >
                            Order Now
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AIArtShop;