'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Info, AlertTriangle, AlertCircle } from 'lucide-react';

const PregnancyRiskAssessment = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        bloodPressure: '',
        sugarLevel: '',
        heartRate: '',
        age: '',
        weight: ''
    });

    // State for assessment results
    const [riskResults, setRiskResults] = useState({
        bloodPressure: { value: 0, level: '', description: '' },
        sugarLevel: { value: 0, level: '', description: '' },
        heartRate: { value: 0, level: '', description: '' },
        age: { value: 0, level: '', description: '' },
        weight: { value: 0, level: '', description: '' }
    });
    const [overallRisk, setOverallRisk] = useState({ value: 0, level: '' });

    // Handle input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to calculate risk levels based on medical guidelines
    const calculateRisks = () => {
        // Parse input values
        const bp = parseFloat(formData.bloodPressure);
        const sugar = parseFloat(formData.sugarLevel);
        const hr = parseFloat(formData.heartRate);
        const age = parseInt(formData.age);
        const weight = parseFloat(formData.weight);

        // Blood pressure risk (systolic)
        let bpRisk = { value: 0, level: 'low', description: '' };
        if (bp < 120) {
            bpRisk = { value: 20, level: 'low', description: 'Normal (below 120 mmHg)' };
        } else if (bp >= 120 && bp <= 129) {
            bpRisk = { value: 40, level: 'low', description: 'Elevated (120-129 mmHg)' };
        } else if (bp >= 130 && bp <= 139) {
            bpRisk = { value: 60, level: 'medium', description: 'Stage 1 hypertension (130-139 mmHg)' };
        } else if (bp >= 140 && bp <= 159) {
            bpRisk = { value: 80, level: 'high', description: 'Stage 2 hypertension (140-159 mmHg)' };
        } else if (bp >= 160) {
            bpRisk = { value: 100, level: 'high', description: 'Severe hypertension (≥160 mmHg)' };
        }

        // Blood sugar risk (mg/dL)
        let sugarRisk = { value: 0, level: 'low', description: '' };
        if (sugar < 95) {
            sugarRisk = { value: 20, level: 'low', description: 'Normal fasting glucose (<95 mg/dL)' };
        } else if (sugar >= 95 && sugar <= 125) {
            sugarRisk = { value: 60, level: 'medium', description: 'Elevated (95-125 mg/dL)' };
        } else if (sugar > 125) {
            sugarRisk = { value: 100, level: 'high', description: 'Gestational diabetes risk (>125 mg/dL)' };
        }

        // Heart rate risk (bpm)
        let hrRisk = { value: 0, level: 'low', description: '' };
        if (hr >= 60 && hr <= 100) {
            hrRisk = { value: 20, level: 'low', description: 'Normal resting heart rate (60-100 bpm)' };
        } else if ((hr >= 50 && hr < 60) || (hr > 100 && hr <= 110)) {
            hrRisk = { value: 60, level: 'medium', description: 'Slightly abnormal heart rate' };
        } else {
            hrRisk = { value: 100, level: 'high', description: 'Abnormal heart rate' };
        }

        // Age risk
        let ageRisk = { value: 0, level: 'low', description: '' };
        if (age >= 20 && age <= 35) {
            ageRisk = { value: 20, level: 'low', description: 'Optimal childbearing age (20-35)' };
        } else if (age > 35 && age <= 40) {
            ageRisk = { value: 60, level: 'medium', description: 'Advanced maternal age (35-40)' };
        } else if (age > 40 || age < 20) {
            ageRisk = { value: 100, level: 'high', description: age > 40 ? 'High risk age (>40)' : 'Young maternal age (<20)' };
        }

        // Weight risk - using a simplified assessment
        let weightRisk = { value: 0, level: 'low', description: '' };
        // This is simplified and would ideally use BMI + pregnancy stage
        if (weight >= 50 && weight <= 90) {
            weightRisk = { value: 20, level: 'low', description: 'Healthy weight range' };
        } else if ((weight > 90 && weight <= 110) || (weight >= 45 && weight < 50)) {
            weightRisk = { value: 60, level: 'medium', description: 'Slight weight concern' };
        } else {
            weightRisk = { value: 100, level: 'high', description: weight > 110 ? 'Obesity risk' : 'Underweight risk' };
        }

        // Calculate overall risk (weighted average)
        const overallValue = (bpRisk.value * 1.2 + sugarRisk.value * 1.2 + hrRisk.value + ageRisk.value + weightRisk.value * 0.8) / 5;

        let overallLevel = 'low';
        if (overallValue >= 70) {
            overallLevel = 'high';
        } else if (overallValue >= 40) {
            overallLevel = 'medium';
        }

        setRiskResults({
            bloodPressure: bpRisk,
            sugarLevel: sugarRisk,
            heartRate: hrRisk,
            age: ageRisk,
            weight: weightRisk
        });

        setOverallRisk({
            value: Math.round(overallValue),
            level: overallLevel
        });
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        calculateRisks();
    };

    // Prepare chart data
    const getChartData = () => {
        if (!riskResults) return [];

        return [
            {
                name: 'Blood Pressure',
                value: riskResults.bloodPressure.value,
                fill: getLevelColor(riskResults.bloodPressure.level)
            },
            {
                name: 'Blood Sugar',
                value: riskResults.sugarLevel.value,
                fill: getLevelColor(riskResults.sugarLevel.level)
            },
            {
                name: 'Heart Rate',
                value: riskResults.heartRate.value,
                fill: getLevelColor(riskResults.heartRate.level)
            },
            {
                name: 'Age',
                value: riskResults.age.value,
                fill: getLevelColor(riskResults.age.level)
            },
            {
                name: 'Weight',
                value: riskResults.weight.value,
                fill: getLevelColor(riskResults.weight.level)
            }
        ];
    };

    // Helper function to get color for risk level
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'low': return '#4ade80'; // green
            case 'medium': return '#fbbf24'; // yellow
            case 'high': return '#ef4444'; // red
            default: return '#d1d5db'; // gray
        }
    };

    // Helper function to get icon for risk level
    const getRiskIcon = (level: string) => {
        switch (level) {
            case 'low': return <Info className="h-5 w-5 text-green-500" />;
            case 'medium': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            case 'high': return <AlertCircle className="h-5 w-5 text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-white">
            {/* <h1 className="text-3xl font-bold text-center mb-6">Pregnancy Risk Assessment</h1>
            <p className="text-center mb-8 text-gray-600">Enter your health metrics to evaluate potential pregnancy risks based on medical guidelines</p> */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Form */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Health Parameters</CardTitle>
                        <CardDescription>Enter your current health metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bloodPressure">Blood Pressure (systolic, mmHg)</Label>
                                <Input
                                    id="bloodPressure"
                                    name="bloodPressure"

                                    placeholder="e.g., 120"
                                    value={formData.bloodPressure}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sugarLevel">Blood Sugar Level (mg/dL)</Label>
                                <Input
                                    id="sugarLevel"
                                    name="sugarLevel"

                                    placeholder="e.g., 85"
                                    value={formData.sugarLevel}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                                <Input
                                    id="heartRate"
                                    name="heartRate"

                                    placeholder="e.g., 75"
                                    value={formData.heartRate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="age">Age (years)</Label>
                                <Input
                                    id="age"
                                    name="age"

                                    placeholder="e.g., 28"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input
                                    id="weight"
                                    name="weight"

                                    placeholder="e.g., 65"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={!formData.bloodPressure || !formData.sugarLevel || !formData.heartRate || !formData.age || !formData.weight}
                        >
                            Calculate Risk Assessment
                        </Button>
                    </CardFooter>
                </Card>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    {overallRisk ? (
                        <>
                            {/* Overall Risk */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        {getRiskIcon(overallRisk.level)}
                                        <span className="ml-2">Overall Pregnancy Risk</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">Risk Level: {overallRisk.level.charAt(0).toUpperCase() + overallRisk.level.slice(1)}</span>
                                                <span className="font-medium">{overallRisk.value}%</span>
                                            </div>
                                            <Progress
                                                value={overallRisk.value}
                                                className="h-3"
                                                style={{
                                                    backgroundColor: '#f3f4f6',
                                                    // '--progress-background': getLevelColor(overallRisk.level)
                                                }}
                                            />
                                        </div>

                                        <Alert className={`border-l-4 border-${overallRisk.level === 'low' ? 'green' : overallRisk.level === 'medium' ? 'amber' : 'red'}-500`}>
                                            <AlertTitle className="flex items-center">
                                                {getRiskIcon(overallRisk.level)}
                                                <span className="ml-2">
                                                    {overallRisk.level === 'low'
                                                        ? 'Low Risk Pregnancy'
                                                        : overallRisk.level === 'medium'
                                                            ? 'Medium Risk - Monitoring Recommended'
                                                            : 'High Risk - Medical Attention Required'}
                                                </span>
                                            </AlertTitle>
                                            <AlertDescription>
                                                {overallRisk.level === 'low'
                                                    ? 'Your metrics indicate a low-risk pregnancy. Continue with regular prenatal check-ups.'
                                                    : overallRisk.level === 'medium'
                                                        ? 'Some metrics indicate moderate risk. More frequent monitoring is recommended.'
                                                        : 'Multiple risk factors detected. Please consult with your healthcare provider promptly.'}
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Risk Visualization */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Risk Factor Analysis</CardTitle>
                                    <CardDescription>Breakdown of individual risk factors</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={getChartData()}
                                                margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                                <YAxis domain={[0, 100]} label={{ value: 'Risk Level (%)', angle: -90, position: 'insideLeft' }} />
                                                <Tooltip
                                                    formatter={(value) => [`${value}% Risk`, 'Risk Level']}
                                                    labelFormatter={(name) => `${name} Assessment`}
                                                />
                                                <ReferenceLine y={40} stroke="#fbbf24" strokeDasharray="3 3" />
                                                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                                                <Bar dataKey="value" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Risk explanations */}
                                    <div className="mt-6 space-y-4">
                                        {riskResults && Object.entries(riskResults).map(([key, risk]) => {
                                            const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                            return (
                                                <div key={key} className="flex items-start">
                                                    {getRiskIcon(risk.level)}
                                                    <div className="ml-2">
                                                        <h4 className="font-medium">{displayName}</h4>
                                                        <p className="text-sm text-gray-600">{risk.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Risk Assessment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Info className="h-12 w-12 text-blue-500 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Enter your health parameters</h3>
                                    <p className="text-gray-500 max-w-md">
                                        Complete the form with your health metrics to generate a personalized pregnancy risk assessment
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PregnancyRiskAssessment;