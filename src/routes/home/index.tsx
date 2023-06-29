import { useContext, useEffect } from "react";
import {
  Header,
  SectionFive,
  SectionFour,
  SectionOne,
  SectionThree,
  SectionTwo,
  Footer,
} from "./components";

const Home = () => {
  return (
    <>
      {/* @ts-ignore */}
      <input onInput={(e) => saveColorTheme(e.target.value)} type="color" />
      <header>
        <Header />
      </header>
      <section id="section-1">
        <SectionOne />
      </section>
      <section id="section-2">
        <SectionTwo />
      </section>
      <section id="section-3">
        <SectionThree />
      </section>
      <section id="section-4">
        <SectionFour />
      </section>
      <section id="section-5">
        <SectionFive />
      </section>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
