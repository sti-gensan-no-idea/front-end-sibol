import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button, DatePicker } from "@heroui/react";
import { DateValue } from "@heroui/react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

import { auth } from "@/firebase";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";

export const ScheduleForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User signed in:", user.uid);

        try {
          const userDoc = await getDoc(doc(db, "clients", user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            console.log("User Firestore data:", userData);

            setFormData({
              name: userData?.fullName || "",
              email: user.email || "",
              address: userData?.address || "",
            });
          } else {
            console.warn("User document does not exist.");
            setFormData({
              name: "",
              email: user.email || "",
              address: "",
            });
          }
        } catch (err) {
          console.error("Error fetching user document:", err);
        }
      } else {
        console.warn("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: DateValue | null) => {
    setSelectedDate(date);
  };

  const formatDate = (date: DateValue | null): string => {
    if (!date) return "";
    const jsDate = date instanceof Date ? date : new Date(date.toString());

    return jsDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-lg mx-auto bg-white shadow-medium rounded-large p-8">
        <h2 className="text-3xl mt-4 text-center font-bold text-gray-800 mb-4">
          Set Schedule
        </h2>

        <DatePicker
          aria-label="Select schedule date"
          className="mt-8"
          label="Schedule date"
          value={selectedDate}
          variant="bordered"
          onChange={handleDateChange}
        />

        <div className="space-y-4">
          <Input
            className="mt-4"
            id="name"
            label="Name"
            name="name"
            placeholder="Your name"
            type="text"
            value={formData.name}
            variant="bordered"
            onChange={handleInputChange}
          />
          <Input
            className="mt-1"
            id="email"
            label="Email address"
            name="email"
            placeholder="your.email@example.com"
            type="email"
            value={formData.email}
            variant="bordered"
            onChange={handleInputChange}
          />
          <Input
            className="mt-1"
            id="address"
            label="Address"
            name="address"
            placeholder="Your address"
            type="text"
            value={formData.address}
            variant="bordered"
            onChange={handleInputChange}
          />
          <Button
            className="w-full mt-8"
            color="primary"
            onPress={() => {
              alert("Schedule set!");
              navigate("/properties");
            }}
          >
            Submit
          </Button>
        </div>

        {selectedDate && (
          <div className="mt-4 text-sm text-gray-700">
            Selected Date: {formatDate(selectedDate)}
          </div>
        )}
      </div>
    </div>
  );
};
