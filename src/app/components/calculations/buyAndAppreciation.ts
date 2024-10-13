export function calculateUpfrontCosts(
    reservationFee: number,
    lawyerFee: number,
    acCost: number,
    furnitureCost: number,
    upfrontPayment: number
  ): number {
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
    // Calculate the appreciation of the property
    // This is the difference between the future value and the initial property price
    const appreciation = futureValue - propertyPrice;

    // Calculate the annual return on investment
    // This is the percentage increase in the value of the investment over a year
    // It is calculated by dividing the appreciation by the total investment and multiplying by 100
    const annualReturn = (appreciation / totalInvestment) * 100;

    // Calculate the return on investment - percentage
    // This is the total percentage increase in the value of the investment
    // It is calculated by dividing the future value by the total investment and multiplying by 100
    const returnOnInvestment = (futureValue / totalInvestment) * 100;

    // Calculate the average annual appreciation
    // This is the average annual percentage increase in the value of the investment
    // It is calculated by taking the future value divided by the initial property price to the power of 1 divided by the number of years held, and then subtracting 1
    const averageAnnualAppreciation = (futureValue / propertyPrice) ** (1 / yearsHeld) - 1;

    return {
      appreciation,
      annualReturn,
      returnOnInvestment,
      averageAnnualAppreciation,
    };
  }