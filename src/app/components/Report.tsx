import React from 'react';
// import { FaCar, FaSwimmingPool, FaBuilding, FaWarehouse } from 'react-icons/fa'; // Import icons
import { Card, CardContent, Typography, Grid, Box, CircularProgress, LinearProgress } from '@mui/material';


interface YourReportDataType {
  // Define the properties of your report data here
  id: number; // Example property
  title: string; // Example property
  content: string; // Example property
}

interface ReportProps {
  reportRawData: YourReportDataType; // Add this line to define the prop
}

interface PropertyDetails {
  price: number; // Example property
  size: number; // Example property
  balconySize: number; // Example property
  bedBath: string; // Example property
  type: string; // Example property
  address: string; // Example property
}

const Report: React.FC<ReportProps> = ({ reportRawData }) => {
  return (
    <Box sx={{ maxWidth: '4xl', mx: 'auto', p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Typography variant="h3" fontWeight="bold" mb={6}>Mock Property Details</Typography>
        
        <Grid container spacing={6}>
            <PropertyDetailsCard details={reportRawData.details} />
            <Card sx={{ mb: 4, mr: 2, ml: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Features</Typography>
                    {/* <div className="grid grid-cols-2 gap-2">
                        {reportRawData.features.parking && <Feature icon={<FaCar />} label="Parking" />}
                        {reportRawData.features.pool && <Feature icon={<FaSwimmingPool />} label="Pool" />}
                        {reportRawData.features.balcony && <Feature icon={<FaBuilding />} label="Balcony" />}
                        {reportRawData.features.storage && <Feature icon={<FaWarehouse />} label="Storage" />}
                        {reportRawData.features.gated && <Feature icon={<FaBuilding />} label="Gated" />}
                        {reportRawData.features.elevator && <Feature icon={<FaBuilding />} label="Elevator" />} */}
                </CardContent>
            </Card>
            <CostBreakdownCard breakdown={reportRawData} />
        </Grid>
        
        <Grid container spacing={6} mt={6}>
            <InvestmentSummaryCard summary={reportRawData} />
            <InvestmentStrategyCard strategy={reportRawData} />
        </Grid>
        
        <ProjectedValueCard /> {/* Placeholder for now */}
      
        <pre style={{ fontSize: '2rem' }}>{JSON.stringify(reportRawData, null, 2)}</pre>
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
