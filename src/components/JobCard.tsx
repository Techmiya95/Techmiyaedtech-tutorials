
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

interface JobCardProps {
    id: string;
    title: string;
    description: string;
    postedDate: string;
    location: string;
    type: string;
}

export const JobCard = ({ id, title, description, postedDate, location, type }: JobCardProps) => {
    const formattedDate = new Date(postedDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-1">{title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {location}</span>
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {type}</span>
                        </div>
                    </div>
                    <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full whitespace-nowrap">
                        {formattedDate}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3 text-gray-600">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Link to={`/jobs/${id}`} className="w-full">
                    <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
                        Read More
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
