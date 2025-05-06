
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const DatabaseStructure = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold mb-8 text-center">Database Structure</h1>
        
        <div className="space-y-8">
          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users Table</CardTitle>
              <CardDescription>Stores all user information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>User entity with role-based access</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Unique identifier</TableCell>
                    <TableCell>Primary Key, Auto-increment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">name</TableCell>
                    <TableCell>varchar(255)</TableCell>
                    <TableCell>User's full name</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">email</TableCell>
                    <TableCell>varchar(255)</TableCell>
                    <TableCell>User's email address</TableCell>
                    <TableCell>Not Null, Unique</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">password</TableCell>
                    <TableCell>varchar(255)</TableCell>
                    <TableCell>Hashed password</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">user_type</TableCell>
                    <TableCell>enum</TableCell>
                    <TableCell>User role in the system</TableCell>
                    <TableCell>Not Null, Options: 'patient', 'doctor'</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">created_at</TableCell>
                    <TableCell>timestamp</TableCell>
                    <TableCell>Account creation date</TableCell>
                    <TableCell>Not Null, Default: current_timestamp</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Doctors Table */}
          <Card>
            <CardHeader>
              <CardTitle>Doctors Table</CardTitle>
              <CardDescription>Extends Users table with doctor-specific information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Doctor entity that extends User</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Unique identifier</TableCell>
                    <TableCell>Primary Key, Auto-increment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">user_id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Reference to Users table</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">specialty</TableCell>
                    <TableCell>varchar(255)</TableCell>
                    <TableCell>Medical specialty</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">availability</TableCell>
                    <TableCell>json</TableCell>
                    <TableCell>Available time slots</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Medical History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Medical History Table</CardTitle>
              <CardDescription>Patient medical records with privacy settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Medical history records for patients</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Unique identifier</TableCell>
                    <TableCell>Primary Key, Auto-increment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">patient_id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Reference to Users table (patients)</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">conditions</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell>Medical conditions</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">allergies</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell>Allergy information</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">treatments</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell>Current and past treatments</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">visibility</TableCell>
                    <TableCell>enum</TableCell>
                    <TableCell>Access control for records</TableCell>
                    <TableCell>Not Null, Options: 'private', 'protected', 'public'</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Appointments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Appointments Table</CardTitle>
              <CardDescription>Scheduled consultations between patients and doctors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Appointment scheduling system</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Unique identifier</TableCell>
                    <TableCell>Primary Key, Auto-increment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">patient_id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Reference to Users table (patients)</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">doctor_id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Reference to Doctors table</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">date</TableCell>
                    <TableCell>date</TableCell>
                    <TableCell>Appointment date</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">time</TableCell>
                    <TableCell>time</TableCell>
                    <TableCell>Appointment time</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">status</TableCell>
                    <TableCell>enum</TableCell>
                    <TableCell>Current appointment status</TableCell>
                    <TableCell>Not Null, Options: 'pending', 'confirmed', 'cancelled'</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Notifications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications Table</CardTitle>
              <CardDescription>System and user notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Notification delivery system</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Unique identifier</TableCell>
                    <TableCell>Primary Key, Auto-increment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">user_id</TableCell>
                    <TableCell>integer</TableCell>
                    <TableCell>Reference to Users table</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">message</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell>Notification content</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">type</TableCell>
                    <TableCell>enum</TableCell>
                    <TableCell>Notification delivery method</TableCell>
                    <TableCell>Not Null, Options: 'email', 'sms'</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">status</TableCell>
                    <TableCell>enum</TableCell>
                    <TableCell>Delivery status</TableCell>
                    <TableCell>Not Null, Options: 'sent', 'failed'</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">created_at</TableCell>
                    <TableCell>timestamp</TableCell>
                    <TableCell>When notification was created</TableCell>
                    <TableCell>Not Null, Default: current_timestamp</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DatabaseStructure;
