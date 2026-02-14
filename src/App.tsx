
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import TutorialHome from "./pages/TutorialHome";
import PythonTutorial from "./pages/PythonTutorial";
import PythonChapter from "./pages/PythonChapter";
import JavaTutorial from "./pages/JavaTutorial";
import JavaChapter from "./pages/JavaChapter";
import GolangTutorial from "./pages/GolangTutorial";
import GolangChapter from "./pages/GolangChapter";
import JavaScriptTutorial from "./pages/JavaScriptTutorial";
import JavaScriptChapter from "./pages/JavaScriptChapter";
import LinuxTutorial from "./pages/LinuxTutorial";
import LinuxChapter from "./pages/LinuxChapter";
import CTutorial from "./pages/CTutorial";
import CChapter from "./pages/CChapter";
import CppTutorial from "./pages/CppTutorial";
import CppChapter from "./pages/CppChapter";
import SqlTutorial from "./pages/SqlTutorial";
import SqlChapter from "./pages/SqlChapter";
import FlaskTutorial from "./pages/FlaskTutorial";
import FlaskChapter from "./pages/FlaskChapter";
import DjangoTutorial from "./pages/DjangoTutorial";
import DjangoChapter from "./pages/DjangoChapter";
import Compiler from "./pages/Compiler";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<TutorialHome />} />
              <Route path="/python" element={<PythonTutorial />} />
              <Route path="/python/:slug" element={<PythonChapter />} />
              <Route path="/java" element={<JavaTutorial />} />
              <Route path="/java/:slug" element={<JavaChapter />} />
              <Route path="/golang" element={<GolangTutorial />} />
              <Route path="/golang/:slug" element={<GolangChapter />} />
              <Route path="/javascript" element={<JavaScriptTutorial />} />
              <Route path="/javascript/:slug" element={<JavaScriptChapter />} />
              <Route path="/linux" element={<LinuxTutorial />} />
              <Route path="/linux/:slug" element={<LinuxChapter />} />
              <Route path="/c-programming" element={<CTutorial />} />
              <Route path="/c-programming/:slug" element={<CChapter />} />
              <Route path="/cpp" element={<CppTutorial />} />
              <Route path="/cpp/:slug" element={<CppChapter />} />
              <Route path="/sql" element={<SqlTutorial />} />
              <Route path="/sql/:slug" element={<SqlChapter />} />
              <Route path="/flask" element={<FlaskTutorial />} />
              <Route path="/flask/:slug" element={<FlaskChapter />} />
              <Route path="/django" element={<DjangoTutorial />} />
              <Route path="/django/:slug" element={<DjangoChapter />} />
              <Route path="/compiler" element={<Compiler />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
