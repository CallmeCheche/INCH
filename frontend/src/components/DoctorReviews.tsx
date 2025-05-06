
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DoctorReviewsProps {
  doctorData: any;
}

const DoctorReviews: React.FC<DoctorReviewsProps> = ({ doctorData }) => {
  // Helper to calculate rating distribution
  const getRatingCount = (rating: number) => (
    doctorData.reviews.filter((r: any) => r.rating === rating).length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Patient Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center">
          <div className="mr-4">
            <span className="text-3xl font-bold text-gray-900">{doctorData.rating}</span>
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(doctorData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{doctorData.reviewCount} reviews</span>
          </div>
          <div className="flex-1">
            {/* Rating bars */}
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center">
                  <span className="w-6 text-xs text-gray-600">{rating}</span>
                  <div className="w-full mx-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-500 rounded-full"
                      style={{
                        width: `${
                          doctorData.reviews.length
                            ? (getRatingCount(rating) / doctorData.reviews.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-600">{getRatingCount(rating)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ul className="space-y-6">
          {doctorData.reviews.map((review: any) => (
            <li key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-gray-200 text-gray-500">
                      {review.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <div className="flex items-center text-sm text-gray-500">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{review.helpful} found this helpful</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorReviews;
