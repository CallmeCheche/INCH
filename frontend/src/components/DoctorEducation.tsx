
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DoctorEducation: React.FC<{ education: any[] }> = ({ education }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Education & Qualifications</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {education.map((edu, index) => (
          <li key={index} className="flex">
            <div className="mr-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{edu.year}</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default DoctorEducation;
