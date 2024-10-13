"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, LinearProgress } from '@mui/material';
import { PropertyDetails, Features, InvestmentSummary, CostBreakdown, InvestmentStrategy, ReportData } from './types';

const Report = () => {
    // Hardcoded mock query
    const mockQuery = {
        result: {
            propertyDetails: {
                price: "500,000",
                size: "100 sqm",
                balconySize: "10 sqm",
                bedBath: "2 bedrooms, 2 bathrooms",
                type: "Apartment",
                address: "123 Example St, Example City"
            },
            features: {
                parking: true,
                pool: true,
                balcony: true,
                storage: true,
                gated: true,
                elevator: true
            },
            investmentSummary: {
                totalCost: "600,000",
                upfrontPayment: "120,000",
                yearsToKeep: 5
            },
            costBreakdown: {
                propertyPrice: 500000,
                acCost: 10000,
                lawyerFee: 15000,
                furnitureCost: 20000
            },
            investmentStrategy: {
                strategy: "Buy and Hold",
                constructionPeriod: "2 years",
                annualAppreciationRate: "5%"
            }
        }
    };

    const [result, setResult] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Mock query received:', mockQuery);
        if (mockQuery && typeof mockQuery.result === 'string') {
            try {
                const parsedResult = JSON.parse(decodeURIComponent(mockQuery.result));
                setResult(parsedResult);
            } catch (error) {
                console.error('Error parsing result:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <CircularProgress />;
    // if (!result) return <div>No result found.</div>;
    return (
        <Box sx={{ maxWidth: '4xl', mx: 'auto', p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Typography variant="h3" fontWeight="bold" mb={6}>Mock Property Details</Typography>
            
            <Grid container spacing={6}>
                <PropertyDetailsCard details={mockQuery.result.propertyDetails} />
                <FeaturesCard features={mockQuery.result.features} />
            </Grid>
            
            <Grid container spacing={6} mt={6}>
                <InvestmentSummaryCard summary={mockQuery.result.investmentSummary} />
                <CostBreakdownCard breakdown={mockQuery.result.costBreakdown} />
                <ProjectedValueCard /> {/* Placeholder for now */}
            </Grid>
            
            <InvestmentStrategyCard strategy={mockQuery.result.investmentStrategy} />
        </Box>
    );
};

const PropertyDetailsCard = ({ details }: { details: PropertyDetails }) => (
    <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Property Details</Typography>
            <Typography>Price: {details.price}</Typography>
            <Typography>{details.size} + {details.balconySize} balcony</Typography>
            <Typography>{details.bedBath}</Typography>
            <Typography>{details.type}</Typography>
            <Typography>{details.address}</Typography>
        </CardContent>
    </Card>
);

const FeaturesCard = ({ features }: { features: Features }) => (
    <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Features</Typography>
            {/* <div className="grid grid-cols-2 gap-2">
                {features.parking && <Feature icon={<FaCar />} label="Parking" />}
                {features.pool && <Feature icon={<FaSwimmingPool />} label="Pool" />}
                {features.balcony && <Feature icon={<FaBuilding />} label="Balcony" />}
                {features.storage && <Feature icon={<FaWarehouse />} label="Storage" />}
                {features.gated && <Feature icon={<FaBuilding />} label="Gated" />}
                {features.elevator && <Feature icon={<FaBuilding />} label="Elevator" />} */}
        </CardContent>
    </Card>
);

const InvestmentSummaryCard = ({ summary }: { summary: InvestmentSummary }) => (
    <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Investment Summary</Typography>
            <Typography>Total Cost: {summary.totalCost}</Typography>
            <Typography>Upfront Payment: {summary.upfrontPayment}</Typography>
            <Typography>Years to Keep: {summary.yearsToKeep}</Typography>
        </CardContent>
    </Card>
);

const CostBreakdownCard = ({ breakdown }: { breakdown: CostBreakdown }) => (
    <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cost Breakdown</Typography>
            <LinearProgress variant="determinate" value={(breakdown.propertyPrice / 1000000) * 100} />
            <LinearProgress variant="determinate" value={(breakdown.acCost / 1000000) * 100} />
            <LinearProgress variant="determinate" value={(breakdown.lawyerFee / 1000000) * 100} />
            <LinearProgress variant="determinate" value={(breakdown.furnitureCost / 1000000) * 100} />
        </CardContent>
    </Card>
);

const ProjectedValueCard = () => (
    <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Projected Value</Typography>
            {/* Add projected value content here */}
        </CardContent>
    </Card>
);

const InvestmentStrategyCard = ({ strategy }: { strategy: InvestmentStrategy }) => (
    <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Investment Strategy</Typography>
            <Typography>Strategy: {strategy.strategy}</Typography>
            <Typography>Construction Period: {strategy.constructionPeriod}</Typography>
            <Typography>Annual Appreciation Rate: {strategy.annualAppreciationRate}</Typography>
        </CardContent>
    </Card>
);

const Feature = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
    </div>
);

export default Report;
