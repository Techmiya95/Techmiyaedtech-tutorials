
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
    title: string;
    description: string;
    date: string;
    slug: string;
    image?: string;
    isPlaceholder?: boolean;
}

export const BlogCard = ({ title, description, date, slug, image, isPlaceholder }: BlogCardProps) => {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
            <div className="md:h-48 h-40 w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                        <span className="text-4xl font-bold opacity-20">Blog</span>
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="text-sm text-amber-600 font-medium mb-2">{date}</div>
                <CardTitle className="text-xl font-bold line-clamp-2 text-gray-900">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3 text-gray-600">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                {isPlaceholder ? (
                    <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
                ) : (
                    <Link to={slug} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white group">
                            Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
};
