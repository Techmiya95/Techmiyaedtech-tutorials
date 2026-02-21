import { Link } from "react-router-dom";
import {
    Home,
    ChevronRight,
    Cloud,
    Container,
    RefreshCw,
    Terminal,
    Settings,
    ShieldCheck,
    Layout,
    Github,
    BarChart3,
    Server
} from "lucide-react";

const devopsTools = [
    {
        title: "Linux for DevOps",
        description: "Master the foundation of DevOps. Shell, permissions, and system administration.",
        icon: <Terminal className="w-6 h-6" />,
        color: "from-slate-700 to-slate-900",
        link: "/linux"
    },
    {
        title: "AWS Cloud Mastery",
        description: "Learn VPC, EC2, S3, IAM, and Serverless architectures on Amazon Web Services.",
        icon: <Cloud className="w-6 h-6" />,
        color: "from-orange-400 to-orange-600",
        link: "/devops/aws"
    },
    {
        title: "Jenkins CI/CD",
        description: "Automate your workflows with declarative and scripted Jenkins pipelines.",
        icon: <RefreshCw className="w-6 h-6" />,
        color: "from-red-500 to-red-700",
        link: "/devops/jenkins"
    },
    {
        title: "Docker & Containers",
        description: "Master containerization, images, volumes, and multi-stage builds.",
        icon: <Container className="w-6 h-6" />,
        color: "from-blue-400 to-blue-600",
        link: "/devops/docker"
    },
    {
        title: "Kubernetes (K8s)",
        description: "Orchestrate containers at scale. Deployments, Services, and Helm charts.",
        icon: <Layout className="w-6 h-6" />,
        color: "from-indigo-500 to-indigo-700",
        link: "/devops/kubernetes"
    },
    {
        title: "Terraform (IaC)",
        description: "Infrastructure as Code. Manage cloud resources with HCL and providers.",
        icon: <Settings className="w-6 h-6" />,
        color: "from-violet-500 to-violet-700",
        link: "/devops/terraform"
    },
    {
        title: "Ansible",
        description: "Automate configuration management with Playbooks and Roles.",
        icon: <ShieldCheck className="w-6 h-6" />,
        color: "from-red-600 to-red-800",
        link: "/devops/ansible"
    },
    {
        title: "GitHub Actions",
        description: "Learn modern DevOps automation directly within your GitHub repositories.",
        icon: <Github className="w-6 h-6" />,
        color: "from-gray-800 to-black",
        link: "/devops/github"
    },
    {
        title: "Shell Scripting",
        description: "The ultimate tool for automation. Bash scripting for DevOps engineers.",
        icon: <Terminal className="w-6 h-6" />,
        color: "from-emerald-600 to-emerald-800",
        link: "/devops/shell-scripting"
    },
    {
        title: "Monitoring & Observability",
        description: "Master Prometheus and Grafana for metrics and visual dashboards.",
        icon: <BarChart3 className="w-6 h-6" />,
        color: "from-orange-600 to-red-500",
        link: "/devops/monitoring"
    }
];

const DevOpsHome = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-violet-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium">DevOps Ecosystem</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden bg-white border-b border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 -z-10" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-violet-200 mb-8 border border-violet-500">
                            <RefreshCw className="w-10 h-10 animate-spin-slow" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            DevOps <span className="bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">Ecosystem</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                            Master the full lifecycle of software development and operations.
                            Learn the industry-standard tools for CI/CD, IaC, Cloud, and Monitoring.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tool Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {devopsTools.map((tool) => (
                        <Link
                            key={tool.title}
                            to={tool.link}
                            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className={`h-1.5 bg-gradient-to-r ${tool.color}`} />
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform duration-300">
                                        {tool.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                                        {tool.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {tool.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-violet-600">
                                    Explore Tutorial <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* DevOps Path */}
            <section className="bg-gray-900 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Why Learn DevOps?</h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "High Demand",
                                        desc: "DevOps is one of the most sought-after skills in the modern tech industry."
                                    },
                                    {
                                        title: "Better Collaboration",
                                        desc: "Bridge the gap between development and operations teams for faster delivery."
                                    },
                                    {
                                        title: "Scalability",
                                        desc: "Learn to manage thousands of servers and containers with automation."
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-violet-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Server className="w-6 h-6 text-violet-400" />
                                <h3 className="text-xl font-bold text-white">The Industrial Stack</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                Professionals don't just use one tool. They combine **Cloud**, **Linux**, **CI/CD**, and **Infrastructure as Code** to build resilient systems.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/10 rounded-xl text-center">
                                    <span className="text-violet-400 font-bold block">100%</span>
                                    <span className="text-xs text-gray-400">Practical</span>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl text-center">
                                    <span className="text-violet-400 font-bold block">24/7</span>
                                    <span className="text-xs text-gray-400">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DevOpsHome;
