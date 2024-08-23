import Image from "next/image";

export function UploadImageFile() {
  return (
    <div className="flex justify-center items-center w-full h-[480px] rounded-md bg-white/20">
      <Image
        src={"/assets/images/image-down.svg"}
        alt="Upload Image"
        width={80}
        height={80}
      />
    </div>
  );
}
