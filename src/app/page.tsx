import Footer from "@/components/Footer";
import { AboutMain } from "@/components/main/About_main";
import { ActionMain } from "@/components/main/Action_main";
import AiMain from "@/components/main/Ai_main";
import CasesMain from "@/components/main/Cases_main";
import Mari_main from "@/components/main/Mari_main";
import Setvice_main from "@/components/main/Setvice_main";
import Image from "next/image";

export default function Home() {
  return (
    <>
          <AboutMain />
          <Mari_main/>
      <CasesMain />
      <Setvice_main />
      <AiMain/>
      <ActionMain/>
      <Footer />
    </>
  );
}
