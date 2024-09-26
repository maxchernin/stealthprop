export function calculateUpfrontCosts(
    reservationFee: number,
    lawyerFee: number,
    acCost: number,
    furnitureCost: number,
    upfrontPayment: number
  ): number {
    console.log(`Reservation Fee: ${reservationFee}`);
    console.log(`Lawyer Fee: ${lawyerFee}`);
    console.log(`AC Cost: ${acCost}`);
    console.log(`Furniture Cost: ${furnitureCost}`);
    console.log(`Upfront Payment: ${upfrontPayment}`);
    return reservationFee + lawyerFee + acCost + furnitureCost + upfrontPayment;
  }
  
  export function calculateTotalInvestment(
    propertyPrice: number,
    upfrontCosts: number
  ): number {
    return propertyPrice + upfrontCosts;
  }
  
  export function calculateAppreciation(
    propertyPrice: number,
    annualAppreciationRate: number,
    yearsHeld: number
  ): number {
    const appreciationFactor = 1 + annualAppreciationRate / 100;
    return propertyPrice * appreciationFactor ** yearsHeld;
  }
  
  export function generateReport(
    propertyPrice: number,
    totalInvestment: number,
    futureValue: number,
    yearsHeld: number,
    annualAppreciationRate: number
  ): any {
    const appreciation = futureValue - propertyPrice;
    const annualReturn = (appreciation / totalInvestment) * 100;
    const returnOnInvestment = (futureValue / totalInvestment) * 100;
    const averageAnnualAppreciation = (futureValue / propertyPrice) ** (1 / yearsHeld) - 1;

    return {
      appreciation,
      annualReturn,
      returnOnInvestment,
      averageAnnualAppreciation,
    };
  }