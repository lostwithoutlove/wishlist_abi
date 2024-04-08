import Image from "next/image";
import Container from "./components/Container";

export default function Home() {
  return (
    <Container>
      <div className="flex">
        <div className="pt-48 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-10">
          <div className="text-rose-500 text-2xl gap-10"> </div>
        </div>
      </div>
    </Container>
  );
}
