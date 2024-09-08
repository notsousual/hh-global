export const salesTaxCoef = 0.07; // 7% Sales tax
export const normalMarginCoef = 0.11; // 11% base margin
export const extraMarginValueCoef = 0.05; // 5% extra margin

export const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

export const roundToNearestPenny = (value) => Math.round(value * 100) / 100;

export const roundToNearestEvenCent = (value) => {
  const roundedValue = Math.round(value * 100);
  const cents = roundedValue % 10;
  return (roundedValue - (cents % 2)) / 100;
};

export const calculateJobPrice = ({ items = [], extraMargin }) => {
  let totalCost = 0;
  let preTaxPrice = 0;
  let totalTax = 0;

  for (const { price, taxFree } of items) {
    preTaxPrice += price;
    if (!taxFree) {
      const tax = price * salesTaxCoef;
      totalTax += tax;
      totalCost += price + tax;
    } else {
      totalCost += price;
    }
  }

  const marginRate =
    normalMarginCoef + (extraMargin ? extraMarginValueCoef : 0);
  const finalPrice = totalCost + preTaxPrice * marginRate;

  return {
    margin: roundToNearestPenny(preTaxPrice * marginRate),
    totalTax: roundToNearestPenny(totalTax),
    preTaxPrice: roundToNearestPenny(preTaxPrice),
    finalPrice: roundToNearestEvenCent(finalPrice),
  };
};
