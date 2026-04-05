import NavBar from "@/components/nav-bar"
import WelcomeScreen from "@/components/welcome-screen"
import Dock from "@/components/dock"
import { Draggable } from "gsap/dist/Draggable";
import gsap from "gsap"
import Terminal from "@/windows/terminal";
import Resume from "@/windows/resume";
import Safari from "@/windows/safari";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <NavBar />
      <WelcomeScreen />
      <Dock />

      <Terminal />
      <Resume />
      <Safari />
    </main>
  )
}

export default App
