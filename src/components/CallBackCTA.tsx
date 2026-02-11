import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Phone, User, BookOpen, Send } from "lucide-react";

export const CallBackCTA = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone || !course) {
            toast.error("Please fill in all fields");
            return;
        }

        const message = `Hi, I am ${name}. My number is ${phone}. I am interested in ${course}. Please call me back.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/916363760275?text=${encodedMessage}`;

        toast.success("Redirecting to WhatsApp...");

        // Small delay to let the toast show
        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
        }, 1500);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Text Content */}
                    <div className="lg:w-1/2 text-white space-y-6 text-center lg:text-left">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Kickstart</span> Your Tech Career?
                        </h2>
                        <p className="text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                            Don't know where to begin? Our expert counselors are just a message away. Get personalized guidance on the best course for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                <span className="text-yellow-400 text-xl">✨</span>
                                <span className="font-medium">Free Career Counseling</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                <span className="text-yellow-400 text-xl">🎓</span>
                                <span className="font-medium">Placement Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="lg:w-1/2 w-full max-w-md">
                        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                            <CardHeader className="space-y-1 text-center pb-2">
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Request a Call Back
                                </CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back to you instantly on WhatsApp!
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Your Name"
                                                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="tel"
                                                placeholder="Phone Number"
                                                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                                            <Select value={course} onValueChange={setCourse}>
                                                <SelectTrigger className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors">
                                                    <SelectValue placeholder="Select Course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Generative AI">Generative AI</SelectItem>
                                                    <SelectItem value="DevOps and Cloud">DevOps and Cloud</SelectItem>
                                                    <SelectItem value="Android Development">Android Development</SelectItem>
                                                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                                                    <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                                                    <SelectItem value="Data Science & AI">Data Science & AI</SelectItem>
                                                    <SelectItem value="Java Programming">Java Programming</SelectItem>
                                                    <SelectItem value="Digital Marketing">Digital Marketing with AI</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Get a Call Back
                                    </Button>

                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        By submitting, you agree to receive updates on WhatsApp.
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
