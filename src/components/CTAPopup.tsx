import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Phone, User, BookOpen, Send } from "lucide-react";

export const CTAPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
    }, []);

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

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            setIsOpen(false);
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Get a Free Career Consultation!
                    </DialogTitle>
                    <DialogDescription>
                        Leave your details and our experts will call you back shortly.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Your Name"
                                className="pl-9"
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
                                className="pl-9"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                            <Select value={course} onValueChange={setCourse}>
                                <SelectTrigger className="pl-9">
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
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Request Call Back
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
