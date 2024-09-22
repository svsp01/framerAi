import React from 'react';
import { BarChart2, Crown, Image, MessageSquare, ShoppingCart, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black border border-white rounded-xl text-white p-6">
        <h1 className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-500 w-full flex justify-center to-purple-600 animate-text font-bold">AI Image Studio</h1>
      <header className="flex justify-end items-center mb-12">
        <Button variant="outline" size="sm" className="text-transparent border-purple-600 bg-clip-text bg-gradient-to-r from-blue-500  to-purple-600 animate-text  flex gap-2 items-center  hover:bg-white ">
          <Crown className='w-4 h-4 text-purple-400'/>
          Upgrade to Premium
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-gray-950 text-gray-100 border border-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BarChart2 className="mr-2" /> Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <p className="text-4xl font-bold">2,547</p>
            </div>
            <p className="text-center">Images Generated This Month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 text-gray-100 border border-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Image className="mr-2" /> Recent Creations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 text-gray-100 border border-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <User className="mr-2" /> My AI Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Portrait Model</span>
                <span className="text-green-400">Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Landscape Model</span>
                <span className="text-yellow-400">Training</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 text-gray-100 border border-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <ShoppingCart className="mr-2" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Order #1234</span>
                <span className="text-blue-400">Shipped</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Order #5678</span>
                <span className="text-purple-400">Processing</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 text-gray-100 border border-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <MessageSquare className="mr-2" /> AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <Button className="bg-blue-500 hover:bg-blue-600">Start New Chat</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
};

export default Dashboard;