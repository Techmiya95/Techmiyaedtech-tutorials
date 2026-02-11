
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PsychometricGeneric = () => {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [resultData, setResultData] = useState<any>(null);

    const handleRatingChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value) }));
    };

    const handleScenarioChange = (questionId: string, value: string) => {
        // Value mapping for Scenarios: A=5, B=4, C=3, D=2
        const scoreMap: Record<string, number> = { A: 5, B: 4, C: 3, D: 2 };
        setAnswers((prev) => ({ ...prev, [questionId]: scoreMap[value] }));
    };

    // Questions Data (Original)
    const questions = {
        A: {
            title: "Self-Image & Confidence",
            items: [
                { id: "q1", text: "I believe I can succeed even when things feel difficult." },
                { id: "q2", text: "I see myself as someone who can lead others." },
                { id: "q3", text: "I prefer taking initiative rather than waiting for instructions." },
                { id: "q4", text: "I am comfortable making decisions on my own." },
                { id: "q5", text: "I feel confident sharing my ideas in a group." },
            ],
        },
        B: {
            title: "Personality Traits",
            items: [
                { id: "q6", text: "I like planning and organizing my work." },
                { id: "q7", text: "I enjoy meeting new people." },
                { id: "q8", text: "I stay calm even under pressure." },
                { id: "q9", text: "I like trying new ways of doing things." },
                { id: "q10", text: "I complete tasks even when they feel boring." },
            ],
        },
        C: {
            title: "Interests (RIASEC-based)",
            items: [
                { id: "q11", text: "I enjoy fixing, building, or working with tools or machines." },
                { id: "q12", text: "I enjoy solving logical problems or puzzles." },
                { id: "q13", text: "I enjoy drawing, writing, music, or creative work." },
                { id: "q14", text: "I feel happy when I help others." },
                { id: "q15", text: "I enjoy convincing people or leading activities." },
                { id: "q16", text: "I like working with data, records, or systems." },
                { id: "q17", text: "I would enjoy working outdoors or with physical activity." },
                { id: "q18", text: "I like researching how things work." },
                { id: "q19", text: "I enjoy expressing myself creatively." },
                { id: "q20", text: "I enjoy teaching or guiding others." },
                { id: "q21", text: "I like starting projects or businesses." },
                { id: "q22", text: "I enjoy structured tasks and clear rules." },
            ],
        },
        D: {
            title: "Work Values",
            items: [
                { id: "q23", text: "Earning a high income is important to me." },
                { id: "q24", text: "I want a career that helps society." },
                { id: "q25", text: "Job security matters more than excitement." },
                { id: "q26", text: "I want freedom to express myself." },
                { id: "q27", text: "I prefer balance over long working hours." },
            ],
        },
    };

    const scenarios = [
        {
            id: "q28",
            text: "In a group project, I usually:",
            options: [
                { label: "Take charge and organize (Leader)", value: "A" },
                { label: "Analyze the problem (Thinker)", value: "B" },
                { label: "Suggest creative ideas (Creator)", value: "C" },
                { label: "Support the team (Helper)", value: "D" },
            ],
        },
        {
            id: "q29",
            text: "I feel most satisfied when I:",
            options: [
                { label: "Achieve a goal", value: "A" },
                { label: "Solve a problem", value: "B" },
                { label: "Create something", value: "C" },
                { label: "Help someone", value: "D" },
            ],
        },
        {
            id: "q30",
            text: "If given a choice, I prefer work that is:",
            options: [
                { label: "Practical and hands-on", value: "A" },
                { label: "Research-based", value: "B" },
                { label: "Creative", value: "C" },
                { label: "People-focused", value: "D" },
            ],
        },
    ];

    const calculateResults = () => {
        // Helper to safe get answer
        const getA = (id: string) => answers[id] || 0;

        // 1. RIASEC Buckets
        const R = getA("q11") + getA("q17");
        const I = getA("q12") + getA("q18");
        const A = getA("q13") + getA("q19");
        const S = getA("q14") + getA("q20");
        const E = getA("q15") + getA("q21");
        const C = getA("q16") + getA("q22");

        // 2. Trait Scores
        const Leadership = getA("q1") + getA("q2") + getA("q3") + getA("q4") + getA("q5");
        const Conscientiousness = getA("q6") + getA("q10");
        const Extraversion = getA("q7");
        const Stability = getA("q8");
        const Openness = getA("q9");

        const riasecScores = [
            { name: "Realistic", score: R, code: 'R' },
            { name: "Investigative", score: I, code: 'I' },
            { name: "Artistic", score: A, code: 'A' },
            { name: "Social", score: S, code: 'S' },
            { name: "Enterprising", score: E, code: 'E' },
            { name: "Conventional", score: C, code: 'C' },
        ];

        const sortedRiasec = [...riasecScores].sort((a, b) => b.score - a.score);
        const top2 = sortedRiasec.slice(0, 2);

        const archetypes = [
            {
                name: "Analytical Explorer",
                score: (I + Openness) / 15,
                careers: "Engineer, Data Analyst, Scientist, Economist",
                desc: "You love solving problems and understanding how things work."
            },
            {
                name: "Creative Influencer",
                score: (A + E + getA("q29") === 5 ? 5 : 0) / 25, // Tweaked slightly
                careers: "Designer, Content Creator, Marketing, Media",
                desc: "You are creative and persuasive."
            },
            {
                name: "Empathetic Guide",
                score: (S + getA("q14")) / 15,
                careers: "Teacher, Psychologist, HR, Healthcare",
                desc: "You are helpful and understanding."
            },
            {
                name: "Strategic Leader",
                score: (E + Leadership) / 35,
                careers: "Entrepreneur, Manager, MBA Paths",
                desc: "You are a natural leader who takes initiative."
            },
            {
                name: "Practical Builder",
                score: (R + C) / 20,
                careers: "Technician, Architect, Civil, Operations",
                desc: "You enjoy hands-on work and structure."
            },
            {
                name: "Organized Specialist",
                score: (C + Conscientiousness) / 20,
                careers: "Accountant, Admin, QA, Banking",
                desc: "You are detailed-oriented and reliable."
            }
        ];

        archetypes.sort((a, b) => b.score - a.score);
        const bestMatch = archetypes[0];

        setResultData({
            riasecScores,
            top2,
            archetype: bestMatch,
            allArchetypes: archetypes,
            traits: {
                Leadership, Conscientiousness, Extraversion, Stability, Openness
            }
        });
        setShowResults(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-amber-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tests
                    </Button>
                </Link>
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Generic Psychometric Test
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Discover your strengths, personality, and ideal career path.
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

                        <div className="flex justify-center pt-6">
                            <Button
                                size="lg"
                                onClick={calculateResults}
                                className="w-full md:w-auto px-12 text-lg bg-amber-500 hover:bg-amber-600 text-white"
                                disabled={Object.keys(answers).length < 20}
                            >
                                Submit Test
                            </Button>
                            {Object.keys(answers).length < 20 && (
                                <p className="text-center text-sm text-red-500 mt-2">Please answer most questions to submit.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl text-amber-700">Your Archetype: {resultData.archetype.name}</CardTitle>
                                <CardDescription className="text-lg text-gray-700 mt-2">
                                    {resultData.archetype.desc}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="font-semibold text-gray-800 mb-2">Recommended Career Paths:</p>
                                <p className="text-xl text-blue-600 font-bold">{resultData.archetype.careers}</p>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Interest Profile (RIASEC)</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={resultData.riasecScores}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="code" />
                                            <YAxis />
                                            <RechartsTooltip />
                                            <Bar dataKey="score" fill="#f59e0b" name="Score" />
                                        </BarChart>
                                    </ResponsiveContainer>
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

export default PsychometricGeneric;
