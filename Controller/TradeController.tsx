import { useState } from "react";

type Trade = {
    tradeID: number
    customerId: string; 
    type: string;
    totalAmount: number;
    description: string;
    amount: number;
  };
  
  export default function useTradeController() {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [detailedTrades, setTradesDetailed] = useState<Trade[]>([]);
    const [totalAmount, setAmount] = useState(0);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
  
    const handleTrade = async (customerId: any) => {
      try {
        const response = await fetch(`http://10.0.2.2:5225/api/Trade?customerId=${customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setTrades(data); 
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleTradeDetailed = async (customerId: any) => {
      try {
        const response = await fetch(`http://10.0.2.2:5225/api/Trade/detail?customerId=${customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setTradesDetailed(data); 
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const postTrade = async (customerId: any) => {
      const requestBody = {
        customerId,
        amount: totalAmount, 
        type,
        description,
      };
    
      try {
        const response = await fetch('http://10.0.2.2:5225/api/Trade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        console.log("HTTP Status:", response.status);
      
    
        if (response.ok) {
          const data = await response.json();
          console.log('Add Balance successful:', data);
        } else {
          console.error('Add Balance failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  
    return {
      trades,
      detailedTrades,
      totalAmount,
      setAmount,
      type,
      setType,
      description,
      setDescription,
      handleTrade,
      handleTradeDetailed,
      postTrade,
    };
  }
  