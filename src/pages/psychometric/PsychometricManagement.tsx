
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";

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

const PsychometricManagement = () => {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [resultData, setResultData] = useState<ResultData | null>(null);

    const handleRatingChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value) }));
    };

    // Management-specific Questions
    const questions = {
        A: {
            title: "Leadership & Decision Making",
            items: [
                { id: "m1", text: "I naturally take charge in group situations." },
                { id: "m2", text: "I am comfortable making decisions under pressure." },
                { id: "m3", text: "I can delegate tasks effectively to others." },
                { id: "m4", text: "I enjoy resolving conflicts between team members." },
                { id: "m5", text: "I take responsibility for both successes and failures." },
            ],
        },
        B: {
            title: "Communication & Interpersonal Skills",
            items: [
                { id: "m6", text: "I can persuade others to see my point of view." },
                { id: "m7", text: "I am skilled at negotiating win-win outcomes." },
                { id: "m8", text: "I find it easy to understand others' emotions and perspectives." },
                { id: "m9", text: "I enjoy networking and building professional relationships." },
                { id: "m10", text: "I can present ideas clearly to different audiences." },
            ],
        },
        C: {
            title: "Analytical & Strategic Thinking",
            items: [
                { id: "m11", text: "I enjoy working with numbers, budgets, and financial data." },
                { id: "m12", text: "I am good at forecasting trends and making projections." },
                { id: "m13", text: "I can analyze complex information to make decisions." },
                { id: "m14", text: "I like planning strategies for long-term goals." },
                { id: "m15", text: "I pay close attention to details and accuracy." },
            ],
        },
        D: {
            title: "Work Values & Ethics",
            items: [
                { id: "m16", text: "I value integrity and ethical behavior in business." },
                { id: "m17", text: "I prefer collaborative teamwork over solo work." },
                { id: "m18", text: "I am ambitious and strive for continuous improvement." },
                { id: "m19", text: "I enjoy organizing and optimizing workflows." },
                { id: "m20", text: "I am comfortable working in structured environments." },
            ],
        },
        E: {
            title: "Domain Interests",
            items: [
                { id: "m21", text: "I am interested in hiring, training, and developing people." },
                { id: "m22", text: "I am fascinated by brands, advertising, and consumer behavior." },
                { id: "m23", text: "I am drawn to investments, banking, and wealth management." },
                { id: "m24", text: "I enjoy logistics, supply chain, and operations management." },
                { id: "m25", text: "I find accounting, auditing, and compliance interesting." },
            ],
        },
    };

    const calculateResults = () => {
        const getA = (id: string) => answers[id] || 0;

        // Domain Scores based on question mappings
        const hr = getA("m4") + getA("m8") + getA("m17") + getA("m21") + getA("m3");
        const marketing = getA("m6") + getA("m9") + getA("m10") + getA("m22") + getA("m18");
        const finance = getA("m11") + getA("m12") + getA("m13") + getA("m23");
        const operations = getA("m14") + getA("m19") + getA("m20") + getA("m24");
        const accounting = getA("m11") + getA("m15") + getA("m16") + getA("m25");

        const domainScores = [
            { name: "HR & People", score: hr, code: "HR" },
            { name: "Marketing", score: marketing, code: "MKT" },
            { name: "Finance", score: finance, code: "FIN" },
            { name: "Operations", score: operations, code: "OPS" },
            { name: "Accounting", score: accounting, code: "ACC" },
        ];

        // Trait scores for archetype calculation
        const leadership = getA("m1") + getA("m2") + getA("m3") + getA("m4") + getA("m5");
        const communication = getA("m6") + getA("m7") + getA("m8") + getA("m9") + getA("m10");
        const analytical = getA("m11") + getA("m12") + getA("m13") + getA("m14") + getA("m15");

        const archetypes: Archetype[] = [
            {
                name: "HR & People Manager",
                score: (hr + communication) / 50,
                careers: "Human Resources, Talent Acquisition, Training & Development, Administration",
                desc: "You excel at understanding people and building teams. Your empathy and communication skills make you a natural fit for HR.",
            },
            {
                name: "Marketing & Brand Strategist",
                score: (marketing + communication) / 50,
                careers: "Marketing, Sales, Advertising, Brand Management, Digital Marketing",
                desc: "You are creative, persuasive, and understand consumer behavior. Marketing and branding come naturally to you.",
            },
            {
                name: "Finance & Investment Analyst",
                score: (finance + analytical) / 45,
                careers: "Finance, Banking, Investment Analysis, Risk Management, Wealth Management",
                desc: "You have a sharp analytical mind and are comfortable with numbers. Financial analysis and investment strategies excite you.",
            },
            {
                name: "Operations & Supply Chain Manager",
                score: (operations + leadership) / 45,
                careers: "Operations Management, Logistics, Supply Chain, Project Management",
                desc: "You are organized, strategic, and love optimizing processes. Operations and logistics are where you thrive.",
            },
            {
                name: "Accounting & Audit Specialist",
                score: (accounting + analytical) / 45,
                careers: "Accounting, Auditing, Tax Planning, Compliance, Corporate Finance",
                desc: "You are detail-oriented and value accuracy. Accounting, auditing, and compliance are your strengths.",
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
                    <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-green-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tests
                    </Button>
                </Link>
                <div className="text-center mb-10">
                    <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                        <Briefcase className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        MBA/BBA Career Assessment
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Discover which management specialization suits you best.
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
                                className="w-full md:w-auto px-12 text-lg bg-green-600 hover:bg-green-700 text-white"
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
                        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl text-green-700">
                                    Your Archetype: {resultData?.archetype.name}
                                </CardTitle>
                                <CardDescription className="text-lg text-gray-700 mt-2">
                                    {resultData?.archetype.desc}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="font-semibold text-gray-800 mb-2">Recommended Career Paths:</p>
                                <p className="text-xl text-green-600 font-bold">{resultData?.archetype.careers}</p>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Management Domain Scores</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={resultData?.domainScores}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="code" />
                                            <YAxis />
                                            <RechartsTooltip />
                                            <Bar dataKey="score" fill="#16a34a" name="Score" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>All Management Paths</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {resultData?.allArchetypes.map((arch, index) => (
                                            <div
                                                key={arch.name}
                                                className={`p-3 rounded-lg ${index === 0 ? "bg-green-100 border border-green-300" : "bg-gray-50"}`}
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

export default PsychometricManagement;
