class TradeChartData {
  static prepareData(trades: any[]) {
    const investmentData: number[] = [];
    const cashData: number[] = [];
    const labels: string[] = [];

    trades.forEach((trade: { type: string; totalAmount: any; }, index: number) => {
      // Adiciona valores numéricos às séries
      if (trade.type.toLowerCase() === "investment") {
        investmentData.push(trade.totalAmount);
        cashData.push(0); // Substituir `null` por `0`
      } else if (trade.type.toLowerCase() === "cash") {
        cashData.push(trade.totalAmount);
        investmentData.push(0); // Substituir `null` por `0`
      }

      // Adiciona labels (ex: "Trade 1", "Trade 2", ...)
      labels.push(`Trade ${index + 1}`);
    });

    return {
      labels,
      datasets: [
        {
          data: investmentData,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Cor para "Investment"
          strokeWidth: 2, // Espessura da linha
        },
        {
          data: cashData,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Cor para "Cash"
          strokeWidth: 2, // Espessura da linha
        },
      ],
      legend: ["Investment", "Cash"], // Adiciona legenda para as linhas
    };
  }
}

export default TradeChartData;
