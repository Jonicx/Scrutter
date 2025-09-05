import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PurchasedTicket {
  id: string;
  eventId: number;
  userId: string;
  purchaseDate: string;
  quantity: number;
  totalPrice: number;
  status: string;
  seatNumbers: string[];
  qrCode: string;
  ticketType: string;
}

interface TicketContextType {
  purchasedTickets: PurchasedTicket[];
  purchaseTicket: (
    eventId: number,
    quantity: number,
    totalPrice: number
  ) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([
    {
      id: 'ticket_001',
      eventId: 1,
      userId: 'user_123',
      purchaseDate: '2025-01-15T10:30:00Z',
      quantity: 2,
      totalPrice: 179.98,
      status: 'confirmed',
      seatNumbers: ['A-12', 'A-13'],
      qrCode: 'QR123456789',
      ticketType: 'General Admission',
    },
    {
      id: 'ticket_002',
      eventId: 3,
      userId: 'user_123',
      purchaseDate: '2025-01-10T15:45:00Z',
      quantity: 1,
      totalPrice: 45.0,
      status: 'confirmed',
      seatNumbers: ['B-5'],
      qrCode: 'QR987654321',
      ticketType: 'Standard',
    },
  ]);

  const purchaseTicket = (
    eventId: number,
    quantity: number,
    totalPrice: number
  ) => {
    const newTicket: PurchasedTicket = {
      id: `ticket_${Date.now()}`,
      eventId,
      userId: 'user_123',
      purchaseDate: new Date().toISOString(),
      quantity,
      totalPrice,
      status: 'confirmed',
      seatNumbers: Array.from(
        { length: quantity },
        (_, i) => `A-${Math.floor(Math.random() * 100) + 1}`
      ),
      qrCode: `QR${Math.random().toString(36).substr(2, 9)}`,
      ticketType: 'General Admission',
    };

    setPurchasedTickets((prev) => [...prev, newTicket]);
  };

  const value = {
    purchasedTickets,
    purchaseTicket,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};
