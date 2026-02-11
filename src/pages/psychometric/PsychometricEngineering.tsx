
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";

interface Archetype {
    name: string;
    score: number;
    careers: string;
    desc: string;
}

interface ResultData {
    domainScores: { name: string; score: number; code: string }[];
    archetype: Archetype;
    allArchetypes: Archetype[];
}

const PsychometricEngineering = () => {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [resultData, setResultData] = useState<ResultData | null>(null);

    const handleRatingChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value) }));
    };

    // Engineering-specific Questions
    const questions = {
        A: {
            title: "Technical Problem Solving",
            items: [
                { id: "e1", text: "I enjoy solving mathematical problems and puzzles." },
                { id: "e2", text: "I can break down complex problems into smaller, manageable parts." },
                { id: "e3", text: "I like debugging errors and finding what went wrong." },
                { id: "e4", text: "I prefer logical, step-by-step approaches to problem-solving." },
                { id: "e5", text: "I enjoy learning how things work from the inside." },
            ],
        },
        B: {
            title: "Spatial & Design Thinking",
            items: [
                { id: "e6", text: "I can visualize 3D objects from 2D drawings." },
                { id: "e7", text: "I enjoy designing, sketching, or creating blueprints." },
                { id: "e8", text: "I have a good sense of spatial relationships and proportions." },
                { id: "e9", text: "I like building models, prototypes, or physical structures." },
                { id: "e10", text: "I appreciate aesthetic design in engineering solutions." },
            ],
        },
        C: {
            title: "Systems Thinking",
            items: [
                { id: "e11", text: "I understand how different parts of a system interact." },
                { id: "e12", text: "I enjoy optimizing processes for efficiency." },
                { id: "e13", text: "I can see the bigger picture while focusing on details." },
                { id: "e14", text: "I like working with networks, circuits, or interconnected systems." },
                { id: "e15", text: "I enjoy analyzing data to improve outcomes." },
            ],
        },
        D: {
            title: "Work Style & Preferences",
            items: [
                { id: "e16", text: "I prefer working with computers and software." },
                { id: "e17", text: "I enjoy hands-on work with tools and machinery." },
                { id: "e18", text: "I like working on large-scale infrastructure projects." },
                { id: "e19", text: "I am interested in electronics and circuitry." },
                { id: "e20", text: "I enjoy chemistry- or biology-related experiments." },
            ],
        },
        E: {
            title: "Domain Interests",
            items: [
                { id: "e21", text: "I am fascinated by coding, AI, or data science." },
                { id: "e22", text: "I am interested in automobiles, engines, or mechanical systems." },
                { id: "e23", text: "I find construction, bridges, or buildings interesting." },
                { id: "e24", text: "I am curious about power systems, sensors, or IoT devices." },
                { id: "e25", text: "I am interested in pharmaceuticals, biotech, or chemical processes." },
            ],
        },
    };

    const calculateResults = () => {
        const getA = (id: string) => answers[id] || 0;

        // Domain Scores based on question mappings
        const software = getA("e1") + getA("e3") + getA("e4") + getA("e16") + getA("e21") + getA("e15");
        const mechanical = getA("e2") + getA("e6") + getA("e9") + getA("e17") + getA("e22");
        const civil = getA("e7") + getA("e8") + getA("e9") + getA("e18") + getA("e23");
        const electrical = getA("e11") + getA("e14") + getA("e19") + getA("e24");
        const chemical = getA("e5") + getA("e12") + getA("e20") + getA("e25");

        const domainScores = [
            { name: "Software & Data", score: software, code: "SW" },
            { name: "Mechanical", score: mechanical, code: "ME" },
            { name: "Civil", score: civil, code: "CE" },
            { name: "Electrical", score: electrical, code: "EE" },
            { name: "Chemical/Biotech", score: chemical, code: "CH" },
        ];

        // Trait scores for archetype calculation
        const problemSolving = getA("e1") + getA("e2") + getA("e3") + getA("e4") + getA("e5");
        const spatialDesign = getA("e6") + getA("e7") + getA("e8") + getA("e9") + getA("e10");
        const systemsThinking = getA("e11") + getA("e12") + getA("e13") + getA("e14") + getA("e15");

        const archetypes: Archetype[] = [
            {
                name: "Software & Data Engineer",
                score: (software + problemSolving) / 55,
                careers: "Computer Science, IT, AI/ML, Data Science, Software Development",
                desc: "You excel at logical thinking and love working with code, algorithms, and data systems.",
            },
            {
                name: "Mechanical & Automotive Engineer",
                score: (mechanical + spatialDesign) / 50,
                careers: "Mechanical Engineering, Automotive, Aerospace, Robotics",
                desc: "You have a talent for understanding machines, mechanisms, and hands-on building.",
            },
            {
                name: "Civil & Structural Engineer",
                score: (civil + spatialDesign) / 50,
                careers: "Civil Engineering, Architecture, Construction Management, Urban Planning",
                desc: "You think big—bridges, buildings, and infrastructure fascinate you.",
            },
            {
                name: "Electrical & Electronics Engineer",
                score: (electrical + systemsThinking) / 45,
                careers: "Electronics, Electrical Engineering, IoT, Embedded Systems, Power Systems",
                desc: "You understand circuits, signals, and how electronic systems work together.",
            },
            {
                name: "Chemical & Biotech Engineer",
                score: (chemical + systemsThinking) / 45,
                careers: "Biotechnology, Chemical Engineering, Pharmaceuticals, Environmental Engineering",
                desc: "You are curious about reactions, processes, and life sciences applications.",
            },
        ];

        archetypes.sort((a, b) => b.score - a.score);
        const bestMatch = archetypes[0];

        setResultData({
            domainScores,
            archetype: bestMatch,
            allArchetypes: archetypes,
        });
        setShowResults(true);
    };

    const totalQuestions = Object.values(questions).reduce((sum, section) => sum + section.items.length, 0);
    const answeredQuestions = Object.keys(answers).length;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tests
                    </Button>
                </Link>
                <div className="text-center mb-10">
                    <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                        <Wrench className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Engineering Career Assessment
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Discover which engineering domain suits you best.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600 bg-gray-100 rounded-lg py-3 px-4">
                        <span className="font-semibold text-gray-800">Scale:</span>
                        <span>1 = Strongly Disagree</span>
                        <span>2 = Disagree</span>
                        <span>3 = Neutral</span>
                        <span>4 = Agree</span>
                        <span>5 = Strongly Agree</span>
                    </div>
                </div>

                {!showResults ? (
                    <div className="space-y-8">
                        {Object.entries(questions).map(([sectionKey, section]) => (
                            <Card key={sectionKey}>
                                <CardHeader>
                                    <CardTitle>{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {section.items.map((q) => (
                                        <div key={q.id} className="space-y-3 border-b border-gray-100 pb-4 last:border-0">
                                            <Label className="text-base font-medium">{q.text}</Label>
                                            <RadioGroup
                                                onValueChange={(val) => handleRatingChange(q.id, val)}
                                                className="flex flex-wrap gap-4"
                                            >
                                                {[1, 2, 3, 4, 5].map((val) => (
                                                    <div key={val} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={val.toString()} id={`${q.id}-${val}`} />
                                                        <Label htmlFor={`${q.id}-${val}`} className="font-normal text-gray-600">
                                                            {val}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}

                        <div className="flex flex-col items-center pt-6">
                            <Button
                                size="lg"
                                onClick={calculateResults}
                                className="w-full md:w-auto px-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={answeredQuestions < 20}
                            >
                                Submit Test
                            </Button>
                            {answeredQuestions < 20 && (
                                <p className="text-center text-sm text-red-500 mt-2">
                                    Please answer at least {20 - answeredQuestions} more questions to submit.
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl text-blue-700">
                                    Your Archetype: {resultData?.archetype.name}
                                </CardTitle>
                                <CardDescription className="text-lg text-gray-700 mt-2">
                                    {resultData?.archetype.desc}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="font-semibold text-gray-800 mb-2">Recommended Career Paths:</p>
                                <p className="text-xl text-blue-600 font-bold">{resultData?.archetype.careers}</p>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Engineering Domain Scores</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={resultData?.domainScores}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="code" />
                                            <YAxis />
                                            <RechartsTooltip />
                                            <Bar dataKey="score" fill="#2563eb" name="Score" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>All Engineering Paths</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {resultData?.allArchetypes.map((arch, index) => (
                                            <div
                                                key={arch.name}
                                                className={`p-3 rounded-lg ${index === 0 ? "bg-blue-100 border border-blue-300" : "bg-gray-50"}`}
                                            >
                                                <p className="font-semibold text-gray-800">
                                                    {index + 1}. {arch.name}
                                                </p>
                                                <p className="text-sm text-gray-600">{arch.careers}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-center pt-6">
                            <Button onClick={() => window.location.reload()} variant="outline">
                                Retake Test
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PsychometricEngineering;
