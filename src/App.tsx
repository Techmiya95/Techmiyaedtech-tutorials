
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
import HtmlTutorial from "./pages/HtmlTutorial";
import HtmlChapter from "./pages/HtmlChapter";
import CssTutorial from "./pages/CssTutorial";
import CssChapter from "./pages/CssChapter";
import DevOpsHome from "./pages/DevOpsHome";
import AwsTutorial from "./pages/AwsTutorial";
import AwsChapter from "./pages/AwsChapter";
import JenkinsTutorial from "./pages/JenkinsTutorial";
import JenkinsChapter from "./pages/JenkinsChapter";
import DockerTutorial from "./pages/DockerTutorial";
import DockerChapter from "./pages/DockerChapter";
import K8sTutorial from "./pages/K8sTutorial";
import K8sChapter from "./pages/K8sChapter";
import TerraformTutorial from "./pages/TerraformTutorial";
import TerraformChapter from "./pages/TerraformChapter";
import AnsibleTutorial from "./pages/AnsibleTutorial";
import AnsibleChapter from "./pages/AnsibleChapter";
import GithubTutorial from "./pages/GithubTutorial";
import GithubChapter from "./pages/GithubChapter";
import ShellTutorial from "./pages/ShellTutorial";
import ShellChapter from "./pages/ShellChapter";
import MonitoringTutorial from "./pages/MonitoringTutorial";
import MonitoringChapter from "./pages/MonitoringChapter";
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
              <Route path="/html" element={<HtmlTutorial />} />
              <Route path="/html/:slug" element={<HtmlChapter />} />
              <Route path="/css" element={<CssTutorial />} />
              <Route path="/css/:slug" element={<CssChapter />} />
              <Route path="/devops" element={<DevOpsHome />} />
              <Route path="/devops/aws" element={<AwsTutorial />} />
              <Route path="/devops/aws/:slug" element={<AwsChapter />} />
              <Route path="/devops/jenkins" element={<JenkinsTutorial />} />
              <Route path="/devops/jenkins/:slug" element={<JenkinsChapter />} />
              <Route path="/devops/docker" element={<DockerTutorial />} />
              <Route path="/devops/docker/:slug" element={<DockerChapter />} />
              <Route path="/devops/kubernetes" element={<K8sTutorial />} />
              <Route path="/devops/kubernetes/:slug" element={<K8sChapter />} />
              <Route path="/devops/terraform" element={<TerraformTutorial />} />
              <Route path="/devops/terraform/:slug" element={<TerraformChapter />} />
              <Route path="/devops/ansible" element={<AnsibleTutorial />} />
              <Route path="/devops/ansible/:slug" element={<AnsibleChapter />} />
              <Route path="/devops/github" element={<GithubTutorial />} />
              <Route path="/devops/github/:slug" element={<GithubChapter />} />
              <Route path="/devops/shell" element={<ShellTutorial />} />
              <Route path="/devops/shell/:slug" element={<ShellChapter />} />
              <Route path="/devops/monitoring" element={<MonitoringTutorial />} />
              <Route path="/devops/monitoring/:slug" element={<MonitoringChapter />} />
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
