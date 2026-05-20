export interface Listing {
  id: string;
  title: string;
  address: string;
  price: number;
  distance: string;
  school: string;
  roomType: string;
  available: boolean;
  verified: boolean;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  amenities: string[];
  rules: string[];
  landlord: {
    name: string;
    phone: string;
    verified: boolean;
    avatar: string;
    rating: number;
  };
}

export interface Inquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  landlordName: string;
  studentName: string;
  lastMessage: string;
  timestamp: string;
  status: "pending" | "replied" | "viewed" | "closed";
  unread: number;
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Sunny Studio near USTP",
    address: "Corrales Ave, Cagayan de Oro",
    price: 3500,
    distance: "0.3 km",
    school: "USTP",
    roomType: "Studio",
    available: true,
    verified: true,
    rating: 4.7,
    reviews: 23,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    ],
    description: "Cozy studio apartment just 5 minutes walk from USTP main gate. Fully furnished with WiFi, water, and electricity included. Perfect for solo students.",
    amenities: ["WiFi", "Water Included", "Furnished", "CR Inside", "Near Eateries"],
    rules: ["No pets", "No overnight guests", "Quiet hours 10PM-6AM"],
    landlord: { name: "Maria Santos", phone: "0917-XXX-XXXX", verified: true, avatar: "MS", rating: 4.8 },
  },
  {
    id: "2",
    title: "Affordable Room near XU",
    address: "Corrales Extension, CDO",
    price: 2800,
    distance: "0.5 km",
    school: "Xavier University",
    roomType: "Single Room",
    available: true,
    verified: true,
    rating: 4.3,
    reviews: 15,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600",
    ],
    description: "Clean single room in a well-maintained boarding house. Shared bathroom and kitchen. Walking distance to Xavier University.",
    amenities: ["Shared Kitchen", "Laundry Area", "Security Guard", "CCTV"],
    rules: ["Curfew 10PM", "No smoking", "No loud music"],
    landlord: { name: "Juan dela Cruz", phone: "0918-XXX-XXXX", verified: true, avatar: "JD", rating: 4.5 },
  },
  {
    id: "3",
    title: "Modern Pad near Lourdes College",
    address: "Capistrano St, CDO",
    price: 4200,
    distance: "0.2 km",
    school: "Lourdes College",
    roomType: "Bedspace",
    available: false,
    verified: true,
    rating: 4.9,
    reviews: 31,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
    ],
    description: "Premium boarding house with modern amenities. Very close to Lourdes College. Air-conditioned rooms with personal lockers.",
    amenities: ["Air-con", "Personal Locker", "Study Area", "WiFi", "Generator"],
    rules: ["Visitors until 8PM only", "No cooking in rooms"],
    landlord: { name: "Anna Reyes", phone: "0919-XXX-XXXX", verified: true, avatar: "AR", rating: 4.9 },
  },
  {
    id: "4",
    title: "Budget Bedspace near Liceo",
    address: "Kauswagan, CDO",
    price: 1800,
    distance: "1.2 km",
    school: "Liceo de CDO",
    roomType: "Bedspace",
    available: true,
    verified: false,
    rating: 3.8,
    reviews: 8,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
    ],
    description: "Affordable bedspace in a shared room. Basic amenities provided. Good for students on a tight budget.",
    amenities: ["Shared CR", "Water Included", "Near Jeepney Route"],
    rules: ["No pets", "Clean as you go"],
    landlord: { name: "Pedro Gomez", phone: "0920-XXX-XXXX", verified: false, avatar: "PG", rating: 3.7 },
  },
  {
    id: "5",
    title: "Premium Apartment near Capitol University",
    address: "Corrales Ave, CDO",
    price: 6500,
    distance: "0.4 km",
    school: "Capitol University",
    roomType: "Apartment",
    available: true,
    verified: true,
    rating: 4.6,
    reviews: 19,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    ],
    description: "Spacious apartment with separate bedroom, kitchen, and bathroom. Ideal for students who value privacy and comfort.",
    amenities: ["Kitchen", "Private CR", "Parking", "WiFi", "Air-con", "Balcony"],
    rules: ["No parties", "1 month deposit required"],
    landlord: { name: "Elena Tan", phone: "0921-XXX-XXXX", verified: true, avatar: "ET", rating: 4.7 },
  },
  {
    id: "6",
    title: "Girls-Only Boarding near USTP",
    address: "Macabalan, CDO",
    price: 3000,
    distance: "0.8 km",
    school: "USTP",
    roomType: "Single Room",
    available: true,
    verified: true,
    rating: 4.4,
    reviews: 27,
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600",
    ],
    description: "Safe and secure girls-only boarding house. Clean rooms with friendly house rules. Walking distance to USTP.",
    amenities: ["CCTV", "House Mother", "Study Room", "Laundry", "WiFi"],
    rules: ["Girls only", "Curfew 9PM", "Visitor log required"],
    landlord: { name: "Rosa Lim", phone: "0922-XXX-XXXX", verified: true, avatar: "RL", rating: 4.6 },
  },
];

export const mockInquiries: Inquiry[] = [
  {
    id: "inq-1",
    listingId: "1",
    listingTitle: "Sunny Studio near USTP",
    landlordName: "Maria Santos",
    studentName: "Carlo Reyes",
    lastMessage: "Is the room still available? I'd like to schedule a visit.",
    timestamp: "2 hours ago",
    status: "replied",
    unread: 1,
  },
  {
    id: "inq-2",
    listingId: "2",
    listingTitle: "Affordable Room near XU",
    landlordName: "Juan dela Cruz",
    studentName: "Anna Mae Cruz",
    lastMessage: "Thank you! I'll visit on Saturday.",
    timestamp: "1 day ago",
    status: "viewed",
    unread: 0,
  },
  {
    id: "inq-3",
    listingId: "5",
    listingTitle: "Premium Apartment near Capitol University",
    landlordName: "Elena Tan",
    studentName: "Mark Gonzales",
    lastMessage: "What documents do I need to bring?",
    timestamp: "3 hours ago",
    status: "pending",
    unread: 2,
  },
];

export const schools = [
  "USTP",
  "Xavier University",
  "Lourdes College",
  "Liceo de CDO",
  "Capitol University",
  "Pilgrim Christian College",
];

export const roomTypes = ["Studio", "Single Room", "Bedspace", "Apartment", "Shared Room"];
