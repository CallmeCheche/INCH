
import React from "react";
import { Calendar, MessageSquare, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface DoctorBookingSidebarProps {
  doctorData: any;
  availableDates: any[];
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  timeSlots: string[];
  handleDateSelect: (date: string) => void;
  handleTimeSlotSelect: (timeSlot: string) => void;
}

const DoctorBookingSidebar: React.FC<DoctorBookingSidebarProps> = ({
  doctorData,
  availableDates,
  selectedDate,
  selectedTimeSlot,
  timeSlots,
  handleDateSelect,
  handleTimeSlotSelect
}) => (
  <div className="sticky top-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Book an Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-gray-600">Consultation Fee</span>
          <span className="text-lg font-bold text-gray-900">
            {doctorData.currency} {doctorData.consultationFee}
          </span>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Select Appointment Type</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center bg-secondary/10 hover:bg-secondary/20 border-2 border-secondary rounded-md p-3 transition">
              <Video className="h-5 w-5 text-secondary mb-1" />
              <span className="text-sm font-medium text-secondary">Video Call</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 border-2 border-transparent rounded-md p-3 transition">
              <Phone className="h-5 w-5 text-gray-700 mb-1" />
              <span className="text-sm font-medium text-gray-700">Phone Call</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Select Date</h4>
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {availableDates.map((dateObj, index) => (
              <button
                key={index}
                className={`flex flex-col items-center justify-center min-w-[70px] p-2 rounded-md border-2 ${
                  selectedDate === dateObj.date
                    ? "bg-secondary/10 border-secondary"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleDateSelect(dateObj.date)}
              >
                <span className="text-xs font-medium text-gray-500">
                  {dateObj.day}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {dateObj.dayOfMonth}
                </span>
                <span className="text-xs text-gray-500">{dateObj.month}</span>
              </button>
            ))}
          </div>
        </div>
        {selectedDate && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Select Time</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`p-2 text-sm font-medium rounded-md border-2 ${
                    selectedTimeSlot === time
                      ? "bg-secondary/10 border-secondary text-secondary"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTimeSlotSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
        <Button
          className="w-full"
          disabled={!selectedDate || !selectedTimeSlot || !doctorData.available}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
        <p className="text-xs text-gray-500 text-center">
          By booking this appointment you agree to our{" "}
          <Link to="/terms" className="text-secondary hover:underline">
            Terms of Service
          </Link>
        </p>
      </CardContent>
    </Card>
    <div className="mt-4 grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full">
        <MessageSquare className="mr-2 h-4 w-4" />
        Message
      </Button>
      <Button variant="outline" className="w-full">
        <Phone className="mr-2 h-4 w-4" />
        Call
      </Button>
    </div>
  </div>
);

export default DoctorBookingSidebar;
