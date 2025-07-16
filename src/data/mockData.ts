import { faker } from '@faker-js/faker';
import { Product, User, Order } from '../types';

// Curated, realistic product images
const gpsDeviceImages = [
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752639599/Gemini_Generated_Image_4tvcmf4tvcmf4tvc_w0xhyf.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752639599/Gemini_Generated_Image_4tvcmf4tvcmf4tvc_w0xhyf.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752639599/Gemini_Generated_Image_4tvcmf4tvcmf4tvc_w0xhyf.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752639599/Gemini_Generated_Image_4tvcmf4tvcmf4tvc_w0xhyf.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752639599/Gemini_Generated_Image_4tvcmf4tvcmf4tvc_w0xhyf.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752639599/Gemini_Generated_Image_4tvcmf4tvcmf4tvc_w0xhyf.png',
];

const gpsTrackerImages = [
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641095/Gemini_Generated_Image_w9yywbw9yywbw9yy_qlbjw2.png',
   'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641095/Gemini_Generated_Image_w9yywbw9yywbw9yy_qlbjw2.png',
    'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641095/Gemini_Generated_Image_w9yywbw9yywbw9yy_qlbjw2.png',
     'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641095/Gemini_Generated_Image_w9yywbw9yywbw9yy_qlbjw2.png',
      'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641095/Gemini_Generated_Image_w9yywbw9yywbw9yy_qlbjw2.png',
];

const homeAutomationImages = [
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641639/Gemini_Generated_Image_4s606y4s606y4s60_khzm9t.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641639/Gemini_Generated_Image_4s606y4s606y4s60_khzm9t.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641639/Gemini_Generated_Image_4s606y4s606y4s60_khzm9t.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641639/Gemini_Generated_Image_4s606y4s606y4s60_khzm9t.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641639/Gemini_Generated_Image_4s606y4s606y4s60_khzm9t.png',
  'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752641639/Gemini_Generated_Image_4s606y4s606y4s60_khzm9t.png',
];

// Mock products data
export const generateMockProducts = (): Product[] => {
  const brands = ['TechPro', 'InnoTech', 'SmartHome', 'GPSMaster', 'AutoCore', 'HomeGenius'];
  
  const products: Product[] = [];
  
  // GPS Devices
  for (let i = 0; i < 15; i++) {
    const mainImage = faker.helpers.arrayElement(gpsDeviceImages);
    const galleryImages = faker.helpers.shuffle(gpsDeviceImages).slice(0, 3);
    products.push({
      id: faker.string.uuid(),
      name: `GPS Navigator Pro ${faker.commerce.productAdjective()}`,
      description: `Professional GPS navigation device with advanced mapping capabilities, real-time traffic updates, and weather information. Perfect for automotive, marine, and outdoor applications.`,
      price: parseFloat(faker.commerce.price({ min: 150, max: 800, dec: 2 })),
      originalPrice: parseFloat(faker.commerce.price({ min: 200, max: 900, dec: 2 })),
      category: 'gps-devices',
      image: mainImage,
      images: [mainImage, ...galleryImages.filter(img => img !== mainImage)].slice(0, 3),
      specifications: {
        'Screen Size': `${faker.number.int({ min: 5, max: 10 })}"`,
        'Battery Life': `${faker.number.int({ min: 8, max: 24 })} hours`,
        'Map Updates': 'Lifetime',
        'Voice Commands': 'Yes',
        'Bluetooth': 'Yes',
        'Memory': `${faker.number.int({ min: 16, max: 64 })}GB`,
      },
      inStock: faker.datatype.boolean(),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }).toFixed(1)),
      reviews: faker.number.int({ min: 10, max: 500 }),
      brand: faker.helpers.arrayElement(brands),
      tags: ['GPS', 'Navigation', 'Automotive', 'Travel'],
      featured: faker.datatype.boolean(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    });
  }
  
  // GPS Trackers
  for (let i = 0; i < 12; i++) {
    const mainImage = faker.helpers.arrayElement(gpsTrackerImages);
    const galleryImages = faker.helpers.shuffle(gpsTrackerImages).slice(0, 2);
    products.push({
      id: faker.string.uuid(),
      name: `Stealth GPS Tracker ${faker.commerce.productMaterial()}`,
      description: `Compact and reliable GPS tracking device with real-time location monitoring, geofencing alerts, and long battery life. Ideal for vehicles, pets, and personal belongings.`,
      price: parseFloat(faker.commerce.price({ min: 50, max: 300, dec: 2 })),
      originalPrice: parseFloat(faker.commerce.price({ min: 80, max: 350, dec: 2 })),
      category: 'gps-trackers',
      image: mainImage,
      images: [mainImage, ...galleryImages.filter(img => img !== mainImage)].slice(0, 2),
      specifications: {
        'Size': `${faker.number.int({ min: 2, max: 5 })} x ${faker.number.int({ min: 2, max: 5 })} inches`,
        'Battery Life': `${faker.number.int({ min: 7, max: 30 })} days`,
        'GPS Accuracy': '3-5 meters',
        'Connectivity': '4G LTE',
        'Waterproof': faker.datatype.boolean() ? 'Yes' : 'No',
        'Geofencing': 'Yes',
      },
      inStock: faker.datatype.boolean(),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }).toFixed(1)),
      reviews: faker.number.int({ min: 15, max: 300 }),
      brand: faker.helpers.arrayElement(brands),
      tags: ['GPS', 'Tracking', 'Security', 'Monitoring'],
      featured: faker.datatype.boolean(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    });
  }
  
  // Home Automation
  for (let i = 0; i < 18; i++) {
    const mainImage = faker.helpers.arrayElement(homeAutomationImages);
    const galleryImages = faker.helpers.shuffle(homeAutomationImages).slice(0, 3);
    products.push({
      id: faker.string.uuid(),
      name: `Smart Home Hub ${faker.commerce.product()}`,
      description: `Advanced home automation system with voice control, mobile app integration, and energy monitoring. Transform your home into a smart, efficient, and secure living space.`,
      price: parseFloat(faker.commerce.price({ min: 100, max: 600, dec: 2 })),
      originalPrice: parseFloat(faker.commerce.price({ min: 150, max: 700, dec: 2 })),
      category: 'home-automation',
      image: mainImage,
      images: [mainImage, ...galleryImages.filter(img => img !== mainImage)].slice(0, 3),
      specifications: {
        'Connectivity': 'WiFi, Bluetooth, Zigbee',
        'Voice Control': 'Alexa, Google Assistant',
        'Mobile App': 'iOS, Android',
        'Energy Monitoring': 'Yes',
        'Smart Scheduling': 'Yes',
        'Security Integration': 'Yes',
      },
      inStock: faker.datatype.boolean(),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }).toFixed(1)),
      reviews: faker.number.int({ min: 20, max: 400 }),
      brand: faker.helpers.arrayElement(brands),
      tags: ['Smart Home', 'Automation', 'IoT', 'Security'],
      featured: faker.datatype.boolean(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    });
  }

  return products;
};

// Mock admin user
export const mockAdmin: User = {
  id: '1',
  name: 'Admin User',
  email: 'example@admin.com',
  password: 'admin123', // NOTE: For demonstration purposes only. Do not do this in production.
  role: 'admin',
  avatar: 'https://res.cloudinary.com/dbl4fjxuf/image/upload/v1752585533/Untitled_design_1_mf4lzp.png',
};

// Mock orders
export const generateMockOrders = (): Order[] => {
  const orders: Order[] = [];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
  
  for (let i = 0; i < 20; i++) {
    orders.push({
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      items: [], // Will be populated with actual cart items
      total: parseFloat(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
      status: faker.helpers.arrayElement(statuses),
      createdAt: faker.date.recent(),
      shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
    });
  }
  
  return orders;
};
