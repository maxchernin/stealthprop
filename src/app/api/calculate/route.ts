import { NextResponse } from 'next/server';
import {
  calculateUpfrontCosts,
  calculateTotalInvestment,
  calculateAppreciation,
  generateReport
} from '../../components/calculations/buyAndAppreciation'; // Verify this path and file existence

export async function POST(request: Request) {
  const data = await request.json();

  // Extract all fields from the data as consts
  const {
    propertyType,
    price,
    address,
    bedrooms,
    bathrooms,
    hasParking,
    hasPool,
    hasStorage,
    squareMeters,
    balconySize,
    currency,
    acCost,
    lawyerFee,
    furnitureCost,
    annualAppreciationRate,
    yearsToKeep,
    reservationFee,
    reservationFeePercentage,
    upfrontPayment,
    constructionPeriod,
  } = data;
  console.log(data);
  // Log all data for debugging in a more readable format

  // Perform calculations
  const upfrontCosts = calculateUpfrontCosts(reservationFee, lawyerFee, acCost, furnitureCost, upfrontPayment);
  console.log('Upfront Costs:', upfrontCosts);
  const totalInvestment = calculateTotalInvestment(price, upfrontCosts);
  console.log('Total Investment:', totalInvestment);
  const futureValue = calculateAppreciation(price, annualAppreciationRate, yearsToKeep);
  console.log('Future Value:', futureValue);
  const report = generateReport(price, totalInvestment, futureValue, yearsToKeep, annualAppreciationRate);
  console.log(report);
  
  // Aggregate results into a single JSON object
  const aggregatedResponse = {
    details: {
      propertyType: propertyType,
      price: price,
      address: address,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      hasParking: hasParking,
      hasPool: hasPool,
      hasStorage: hasStorage,
      squareMeters: squareMeters,
      balconySize: balconySize,
      currency: currency,
      acCost: acCost,
      lawyerFee: lawyerFee,
      furnitureCost: furnitureCost,
      annualAppreciationRate: annualAppreciationRate,
      yearsToKeep: yearsToKeep,
      reservationFee: reservationFee,
      reservationFeePercentage: reservationFeePercentage,
      upfrontPayment: upfrontPayment,
      constructionPeriod: constructionPeriod,
    },
    report: report,
  };
  console.log(aggregatedResponse);
  // Return the aggregated results
  return NextResponse.json(aggregatedResponse);
}
