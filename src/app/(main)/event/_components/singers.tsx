import Image from "next/image";

const Images = [
  {
    id: 1,
    path: "/assets/images/singers/1.png",
  },
  {
    id: 2,
    path: "/assets/images/singers/2.png",
  },
  {
    id: 3,
    path: "/assets/images/singers/3.png",
  },
  {
    id: 4,
    path: "/assets/images/singers/4.png",
  },
  {
    id: 5,
    path: "/assets/images/singers/5.png",
  },
];

export function Singers() {
  return (
    <div className="relative w-full flex justify-between items-center gap-2 mt-20 mb-20">
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10 pointer-events-none bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

      {Images.map((singer) => (
        <div key={singer.id} className="relative w-full h-[450px]">
          <Image
            src={singer.path}
            width={400}
            height={350}
            alt={`Image ${singer.id}`}
            className="object-cover w-full h-full z-20"
          />
        </div>
      ))}
    </div>
  );
}
