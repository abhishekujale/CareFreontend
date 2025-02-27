'use client'
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PregnancyGuide = () => {
    const [activeTab, setActiveTab] = useState('first');

    // Gradient colors for each trimester
    const trimesterColors: { [key: string]: string } = {
        first: "from-pink-500 to-purple-500",
        second: "from-blue-400 to-teal-500",
        third: "from-amber-400 to-orange-500"
    };

    const pregnancyData = {
        first: {
            overview: "The first trimester spans from week 1 to week 12. This is when your baby's major organs develop, and you may experience morning sickness and fatigue.",
            weeks: [
                {
                    week: "1-4",
                    dos: [
                        "Start taking prenatal vitamins with folic acid",
                        "Schedule your first prenatal appointment",
                        "Eliminate alcohol, tobacco, and recreational drugs",
                        "Limit caffeine intake to 200mg per day",
                        "Begin maintaining a healthy, balanced diet"
                    ],
                    donts: [
                        "Don't smoke or consume alcohol",
                        "Don't take medications without consulting your doctor",
                        "Don't eat raw seafood, undercooked meats, or unpasteurized dairy",
                        "Don't clean cat litter boxes (risk of toxoplasmosis)",
                        "Don't use saunas or hot tubs"
                    ]
                },
                {
                    week: "5-8",
                    dos: [
                        "Continue prenatal vitamins",
                        "Stay hydrated",
                        "Eat small, frequent meals to manage nausea",
                        "Get adequate rest",
                        "Incorporate light exercise like walking",
                        "Inform your healthcare provider about any concerns"
                    ],
                    donts: [
                        "Don't skip meals",
                        "Don't ignore severe nausea or vomiting",
                        "Don't overexert yourself",
                        "Don't consume raw eggs or deli meats",
                        "Don't use harsh cleaning chemicals without ventilation"
                    ]
                },
                {
                    week: "9-12",
                    dos: [
                        "Continue prenatal care appointments",
                        "Consider prenatal screening tests",
                        "Begin pregnancy-safe exercises if approved by doctor",
                        "Wear supportive bras as your breasts change",
                        "Start sleeping on your side (preferably left side)",
                        "Begin researching childbirth classes"
                    ],
                    donts: [
                        "Don't lift heavy objects",
                        "Don't ignore unusual symptoms (severe headaches, bleeding)",
                        "Don't wear high heels if experiencing balance issues",
                        "Don't skip meals even if experiencing nausea",
                        "Don't take over-the-counter medications without approval"
                    ]
                }
            ]
        },
        second: {
            overview: "The second trimester spans from week 13 to week 27. Many women find this the most comfortable period, with reduced morning sickness and a visible baby bump.",
            weeks: [
                {
                    week: "13-16",
                    dos: [
                        "Continue regular prenatal checkups",
                        "Start moisturizing your belly to prevent stretch marks",
                        "Begin pelvic floor exercises (Kegels)",
                        "Consider maternity clothes as your body changes",
                        "Stay physically active with doctor-approved exercises",
                        "Begin planning nursery and baby supplies"
                    ],
                    donts: [
                        "Don't lie flat on your back for extended periods",
                        "Don't start new strenuous exercise routines",
                        "Don't wear restrictive clothing",
                        "Don't skip meals or proper hydration",
                        "Don't travel without consulting your doctor"
                    ]
                },
                {
                    week: "17-20",
                    dos: [
                        "Prepare for the anatomy scan ultrasound",
                        "Continue healthy eating habits",
                        "Stay active with pregnancy-safe exercises",
                        "Begin researching childbirth options",
                        "Track baby's movements once they become noticeable",
                        "Consider pregnancy massage for back pain relief"
                    ],
                    donts: [
                        "Don't ignore changes in vaginal discharge",
                        "Don't consume raw fish or unpasteurized products",
                        "Don't use essential oils without consulting a specialist",
                        "Don't participate in contact sports or high-risk activities",
                        "Don't ignore signs of urinary tract infections"
                    ]
                },
                {
                    week: "21-27",
                    dos: [
                        "Continue regular prenatal appointments",
                        "Get the recommended glucose screening test",
                        "Sleep on your side with supportive pillows",
                        "Consider prenatal yoga or swimming",
                        "Stay hydrated and eat iron-rich foods",
                        "Begin preparing for maternity leave",
                        "Start planning for baby's arrival"
                    ],
                    donts: [
                        "Don't ignore swelling in hands, face, or feet",
                        "Don't skip meals as baby needs consistent nutrition",
                        "Don't stand for long periods without breaks",
                        "Don't wear shoes without proper support",
                        "Don't ignore Braxton Hicks contractions if frequent"
                    ]
                }
            ]
        },
        third: {
            overview: "The third trimester spans from week 28 until delivery (around week 40). Your baby continues developing while you prepare for childbirth.",
            weeks: [
                {
                    week: "28-31",
                    dos: [
                        "Attend childbirth education classes",
                        "Finalize your birth plan",
                        "Tour the hospital or birth center",
                        "Continue tracking baby's movements daily",
                        "Practice breathing techniques for labor",
                        "Begin assembling baby furniture and supplies",
                        "Get vaccinated (Tdap) to protect your baby"
                    ],
                    donts: [
                        "Don't travel far from your healthcare provider",
                        "Don't ignore decreased fetal movement",
                        "Don't sleep on your back",
                        "Don't lift heavy objects",
                        "Don't neglect signs of preterm labor",
                        "Don't wear uncomfortable shoes that affect balance"
                    ]
                },
                {
                    week: "32-35",
                    dos: [
                        "Pack your hospital bag",
                        "Finalize arrangements for maternity leave",
                        "Install the car seat and have it checked",
                        "Continue regular prenatal appointments",
                        "Stay hydrated and maintain healthy eating",
                        "Rest frequently and nap when possible",
                        "Consider prenatal perineal massage"
                    ],
                    donts: [
                        "Don't ignore contractions or pain",
                        "Don't sit or stand in one position too long",
                        "Don't neglect pelvic and hip pain",
                        "Don't engage in strenuous activities",
                        "Don't consume excessive sugar (gestational diabetes risk)",
                        "Don't delay calling your provider with concerns"
                    ]
                },
                {
                    week: "36-40+",
                    dos: [
                        "Attend weekly prenatal appointments",
                        "Finalize postpartum support plans",
                        "Rest adequately and conserve energy",
                        "Stay within reasonable distance of hospital",
                        "Watch for signs of labor",
                        "Keep monitoring fetal movements",
                        "Prepare frozen meals for postpartum period",
                        "Practice relaxation techniques"
                    ],
                    donts: [
                        "Don't ignore warning signs (headaches, vision changes, etc.)",
                        "Don't miss prenatal appointments",
                        "Don't travel far from your healthcare provider",
                        "Don't hesitate to call your provider about concerns",
                        "Don't ignore reduced fetal movement",
                        "Don't stress about exact due date (only 5% of babies arrive on their due date)"
                    ]
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-8">
            <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header with animated gradient background */}
                <div className="bg-pink-600  animate-gradient-x p-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">Pregnancy Week-by-Week Guide</h1>
                    <p className="text-white/90 text-lg mb-2">Essential do's and don'ts for a healthy pregnancy journey</p>
                </div>

                <div className="p-6">
                    <Tabs defaultValue="first" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-3 mb-8 bg-gray-100 p-1 rounded-lg">
                            <TabsTrigger
                                value="first"
                                className={`transition-all duration-300 ease-in-out ${activeTab === 'first' ? 'bg-gradient-to-r from-blue-400 to-teal-500 text-white shadow-md' : 'hover:bg-gray-200'}`}
                            >
                                First Trimester
                            </TabsTrigger>
                            <TabsTrigger
                                value="second"
                                className={`transition-all duration-300 ease-in-out ${activeTab === 'second' ? 'bg-gradient-to-r from-blue-400 to-teal-500 text-white shadow-md' : 'hover:bg-gray-200'}`}
                            >
                                Second Trimester
                            </TabsTrigger>
                            <TabsTrigger
                                value="third"
                                className={`transition-all duration-300 ease-in-out ${activeTab === 'third' ? 'bg-gradient-to-r from-blue-400 to-teal-500 text-white shadow-md' : 'hover:bg-gray-200'}`}
                            >
                                Third Trimester
                            </TabsTrigger>
                        </TabsList>

                        {Object.entries(pregnancyData).map(([trimester, data]) => (
                            <TabsContent key={trimester} value={trimester} className="space-y-6">
                                <Card className={`bg-gradient-to-r from-blue-400 to-teal-500 text-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {trimester === 'first' ? 'First Trimester (Weeks 1-12)' :
                                                trimester === 'second' ? 'Second Trimester (Weeks 13-27)' :
                                                    'Third Trimester (Weeks 28-40+)'}
                                        </CardTitle>
                                        <CardDescription className="text-white/90">{data.overview}</CardDescription>
                                    </CardHeader>
                                </Card>

                                <Accordion type="single" collapsible className="w-full">
                                    {data.weeks.map((weekData, index) => (
                                        <AccordionItem key={index} value={`week-${index}`} className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                                            <AccordionTrigger className="text-xl font-medium bg-gray-50 p-4 hover:bg-gray-100">
                                                <span className="flex items-center">
                                                    {/* <span className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white bg-gradient-to-r ${trimesterColors[trimester]}`}>{index + 1}</span> */}
                                                    Weeks {weekData.week}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="p-4 pt-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-emerald-700 flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                Do's
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <ul className="space-y-3">
                                                                {weekData.dos.map((item, i) => (
                                                                    <li key={i} className="flex items-start">
                                                                        <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full h-6 w-6 min-w-6 mr-2 mt-0.5">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                            </svg>
                                                                        </span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-rose-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-rose-700 flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                Don'ts
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <ul className="space-y-3">
                                                                {weekData.donts.map((item, i) => (
                                                                    <li key={i} className="flex items-start">
                                                                        <span className="inline-flex items-center justify-center bg-rose-100 text-rose-600 rounded-full h-6 w-6 min-w-6 mr-2 mt-0.5">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>
                        ))}
                    </Tabs>

                </div>
            </div>
        </div>
    );
};

export default PregnancyGuide;