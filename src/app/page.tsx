import { EventCard } from "@/components/event-card";
import Image from "next/image";

const MOCK_EVENT = [
  {
    title: "Junior Vianna",
    image: "/assets/images/image.png",
    date: "June 15, 2024",
    hour: "19:00",
    location: "Serrinha dos Pintos",
  },
  {
    title: "Junior Vianna",
    image: "/assets/images/image.png",
    date: "June 15, 2024",
    hour: "19:00",
    location: "Serrinha dos Pintos",
  },
  {
    title: "Junior Vianna",
    image: "/assets/images/image.png",
    date: "June 15, 2024",
    hour: "19:00",
    location: "Serrinha dos Pintos",
  },
  {
    title: "Junior Vianna",
    image: "/assets/images/image.png",
    date: "June 15, 2024",
    hour: "19:00",
    location: "Serrinha dos Pintos",
  },
  {
    title: "Junior Vianna",
    image: "/assets/images/image.png",
    date: "June 15, 2024",
    hour: "19:00",
    location: "Serrinha dos Pintos",
  },
  {
    title: "Junior Vianna",
    image: "/assets/images/image.png",
    date: "June 15, 2024",
    hour: "19:00",
    location: "Serrinha dos Pintos",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full h-full flex-wrap gap-6 p-4">
        {MOCK_EVENT.map((event) => (
          <EventCard
            key={event.title}
            title={event.title}
            image={event.image}
            date={event.date}
            hour={event.hour}
            location={event.location}
          />
        ))}
      </div>
    </main>
  );
}
