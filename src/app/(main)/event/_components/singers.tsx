import Image from "next/image";

const Images = [
    {
        id: 1,
        path: "/assets/images/singers/1.png"
    },
    {
        id: 2,
        path: "/assets/images/singers/2.png"
    },
    {
        id: 3,
        path: "/assets/images/singers/3.png"
    },
    {
        id: 4,
        path: "/assets/images/singers/4.png"
    },
    {
        id: 5,
        path: "/assets/images/singers/5.png"
    }
]

export function Singers() {
  return (
    <div className="w-full flex justify-between items-center gap-2">
        {Images.map((singer) => 
            <div key={singer.id} className="w-full h-[450px]">
                <Image 
                    src={singer.path} 
                    width={400} 
                    height={350} 
                    alt="oi" 
                    className="object-cover w-full h-full"  
                />
            </div>)
        }
    </div>
  );
}
