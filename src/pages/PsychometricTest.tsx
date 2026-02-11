
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Wrench, Briefcase } from "lucide-react";

const PsychometricTest = () => {
    const tests = [
        {
            title: "Generic Psychometric",
            description: "Discover your general personality traits, strengths, and broad career interests based on the RIASEC model.",
            icon: Brain,
            link: "/generic",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Engineering Career",
            description: "Tailored for aspiring engineers. Assess your analytical skills, technical aptitude, and engineering domains.",
            icon: Wrench,
            link: "/engineering",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Management (MBA/BBA)",
            description: "Find your fit in the business world. Explore outcomes like HR, Marketing, Finance, and Accountancy.",
            icon: Briefcase,
            link: "/management",
            color: "text-green-600",
            bg: "bg-green-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                        Choose Your <span className="text-amber-600">Path</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Select a psychometric assessment tailored to your career goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tests.map((test) => (
                        <Card key={test.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300 border-gray-200">
                            <CardHeader className="text-center pb-2">
                                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${test.bg}`}>
                                    <test.icon className={`w-8 h-8 ${test.color}`} />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">{test.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center flex-grow">
                                <CardDescription className="text-base text-gray-600">
                                    {test.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="pt-2 pb-8">
                                <Link to={test.link} className="w-full px-6">
                                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                                        Start Assessment
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PsychometricTest;
