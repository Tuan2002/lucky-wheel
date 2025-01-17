import { WheelComponent } from '@/components/WheelSpin';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full ">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
        }}
      ></div>
      <WheelComponent />
    </section>
  );
}
