
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const sampleRecords = [
  {
    id: "REC-001",
    date: "2025-04-08",
    title: "General Checkup",
    doctor: "Dr. Mensah",
    summary: "Normal results. Advised regular exercise."
  },
  {
    id: "REC-002",
    date: "2025-03-23",
    title: "Blood Test",
    doctor: "Dr. Anyaso",
    summary: "Cholesterol slightly elevated. Monitor diet."
  },
  {
    id: "REC-003",
    date: "2025-02-15",
    title: "Prescription Update",
    doctor: "Dr. Mensah",
    summary: "Hypertension medication adjusted. Next review in 1 month."
  }
];

const Records: React.FC = () => (
  <DashboardLayout userType="patient">
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Doctor</th>
                  <th className="py-2 px-4 text-left">Summary</th>
                </tr>
              </thead>
              <tbody>
                {sampleRecords.map((rec) => (
                  <tr key={rec.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{rec.date}</td>
                    <td className="py-2 px-4">{rec.title}</td>
                    <td className="py-2 px-4">{rec.doctor}</td>
                    <td className="py-2 px-4">{rec.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sampleRecords.length === 0 && (
              <div className="text-gray-500 p-4 text-center">No medical records available yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default Records;
