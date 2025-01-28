"use client";

// Component
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

// types.ts
interface Location {
  latitude: number;
  longitude: number;
}

interface TimingsType {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: { en: string; ar: string };
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
  designation: { abbreviated: string; expanded: string };
  holidays: string[];
}

interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: { en: string };
  month: { number: number; en: string };
  year: string;
}

interface PrayerDay {
  timings: TimingsType;
  date: {
    readable: string;
    timestamp: string;
    gregorian: GregorianDate;
    hijri: HijriDate;
  };
}

interface GeocodeResponse {
  city: string;
  locality: string;
  principalSubdivision: string;
  countryName: string;
}

interface PrayerTimesResponse {
  code: number;
  status: string;
  data: PrayerDay[];
}

const PrayerTimesPage: React.FC = () => {
  const masjidLocation = {
    latitude: 6.3562427,
    longitude: 2.4277997,
  };
  const [prayerTimes, setPrayerTimes] = useState<PrayerDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>(masjidLocation);
  const [cityName, setCityName] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<
    "Masjid Dare Salam" | "User Town"
  >("Masjid Dare Salam");

  useEffect(() => {
    const getLocation = (): void => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      if (selectedCity === "User Town")
        navigator.geolocation.getCurrentPosition(
          async (position: GeolocationPosition) => {
            //  console.log(" ==============> Current Position", position?.coords);

            try {
              const geocodeResponse = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=fr`
              );
              const geocodeData: GeocodeResponse = await geocodeResponse?.data;

              //  console.log(" =====================> Geocode data", geocodeData);

              setCityName(geocodeData?.city || "Votre ville");

              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            } catch (err) {
              setError(
                `Unable to get location details: ${
                  err instanceof Error ? err.message : "An error occurred"
                }`
              );
              setLoading(false);
            }
          },
          (error: GeolocationPositionError) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError(
                  "Location access denied. Please enable location services."
                );
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information unavailable.");
                break;
              case error.TIMEOUT:
                setError("Location request timed out.");
                break;
              default:
                setError("An unknown error occurred.");
            }
            setLoading(false);
          }
        );
    };

    getLocation();
  }, [selectedCity]);

  useEffect(() => {
    const fetchPrayerTimes = async (): Promise<void> => {
      //  if (!location) return;

      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        const response = await axios.get(
          `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${location.latitude}&longitude=${location.longitude}&method=2`
        );

        if (!response?.data) {
          throw new Error("Failed to fetch prayer times");
        }

        const data: PrayerTimesResponse = await response.data;
        setPrayerTimes(data?.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    if (location) {
      fetchPrayerTimes();
    }
  }, [location]);

  const formatGregorianDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatHijriDate = (hijri: HijriDate): string => {
    return `${hijri.day} ${hijri.month.en} ${hijri.year}`;
  };

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Heures de prières"
          description="Découvrez les heures de prières de la mosquée"
        />
        <div className="container py-12">
          <Card className="w-full">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center">
                  Détection de votre position et chargement des horaires...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Heures de prières"
          description="Découvrez les heures de prières de la mosquée"
        />
        <div className=" container py-12">
          <Card className="w-full">
            <CardContent className="p-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Heures de prières"
        description="Découvrez les heures de prières de la mosquée"
      />
      <div className=" container py-12">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-evenly items-center content-center w-full space-y-0">
            <CardTitle
              className={` border ${
                selectedCity === "Masjid Dare Salam"
                  ? "bg-primary/20 text-primary border-primary"
                  : ""
              } border-border max-w-fit p-2 mt-0  hover:cursor-pointer`}
              onClick={() => {
                setSelectedCity("Masjid Dare Salam");
                setLocation(masjidLocation);
              }}
            >
              Mosquée Dare SALAM
            </CardTitle>
            <CardTitle
              className={` border ${
                selectedCity === "User Town"
                  ? "bg-primary/20 text-primary border-primary"
                  : ""
              } border-border max-w-fit p-2 mt-0 hover:cursor-pointer `}
              onClick={() => setSelectedCity("User Town")}
            >
              {cityName.length > 0 ? cityName : "Votre Ville"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/85 text-white ">
                    <th className="border px-4 py-2 text-left font-semibold">
                      Date
                    </th>

                    <th className="border px-4 py-2 text-center  font-semibold">
                      Fajr
                    </th>
                    <th className="border px-4 py-2 text-center  font-semibold">
                      Shorok
                    </th>
                    <th className="border px-4 py-2 text-center font-semibold">
                      Dhohr
                    </th>
                    <th className="border px-4 py-2 text-center font-semibold">
                      Asr
                    </th>
                    <th className="border px-4 py-2 text-center font-semibold">
                      Maghrib
                    </th>
                    <th className="border px-4 py-2 text-center  font-semibold">
                      Isha
                    </th>
                    <th className="border px-4 py-2 text-left font-semibold">
                      Date Hégirien
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prayerTimes.map((day, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">
                        {formatGregorianDate(day.date.gregorian.date)}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {day.timings.Fajr.split(" ")[0]}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {day.timings.Sunrise.split(" ")[0]}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {day.timings.Dhuhr.split(" ")[0]}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {day.timings.Asr.split(" ")[0]}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {day.timings.Maghrib.split(" ")[0]}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {day.timings.Isha.split(" ")[0]}
                      </td>
                      <td className="border px-4 py-2">
                        {formatHijriDate(day.date.hijri)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrayerTimesPage;
