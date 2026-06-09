"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  TerminalSquare
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const navItems = ["About", "Skills", "Experience", "Projects", "Certifications", "GitHub", "Contact"];

const skills = [
  { name: "Python", value: 92 },
  { name: "SQL", value: 86 },
  { name: "Machine Learning", value: 84 },
  { name: "NLP", value: 82 },
  { name: "Flask", value: 80 },
  { name: "MySQL", value: 78 },
  { name: "OpenCV", value: 76 },
  { name: "Scikit-Learn", value: 84 },
  { name: "Pandas", value: 88 },
  { name: "NumPy", value: 86 },
  { name: "Power BI", value: 74 },
  { name: "Tableau", value: 72 },
  { name: "HTML", value: 82 },
  { name: "CSS", value: 80 },
  { name: "JavaScript", value: 78 }
];

const projects = [
  {
    title: "RAJ AI Assistant",
    description:
      "Voice-controlled AI assistant built using Python, NLP, speech recognition, computer vision and automation.",
    technologies: ["Python", "OpenCV", "SpeechRecognition", "Vosk", "Sentence Transformers"],
    href: "https://github.com/Om-Upadhyay/RAJ-assitant-"
  },
  {
    title: "NLP Driven Automated DSA Answer Evaluation",
    description:
      "AI-powered evaluation system that assesses subjective DSA answers using NLP and transformer models with 80% accuracy.",
    technologies: ["Python", "Transformers", "Flask", "Scikit-Learn", "MySQL"],
    href: "https://github.com/Om-Upadhyay"
  }
];

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  duration: 8 + (index % 7),
  delay: (index % 9) * 0.22
}));

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </motion.div>
  );
}

function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl animate-aurora" />
      <div className="absolute bottom-[-14rem] right-[-8rem] h-[36rem] w-[36rem] rounded-full bg-purple-600/20 blur-3xl animate-aurora [animation-delay:2s]" />
      <div className="absolute inset-0 animate-grid-fade bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-200/60 shadow-[0_0_18px_rgba(103,232,249,0.85)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{ y: [0, -28, 0], opacity: [0.18, 0.85, 0.18], scale: [1, 1.6, 1] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function TypingTitle() {
  return (
    <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
      Om Upadhyay
      <span className="mt-4 block overflow-hidden whitespace-nowrap border-r-4 border-cyan-300 pr-2 text-gradient motion-safe:animate-[typing_3.5s_steps(28,end),blink_0.8s_step-end_infinite]">
        AI & Data Analytics Engineer
      </span>
    </h1>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="relative z-10 min-h-screen">
      <ParticleBackground />
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400"
        style={{ width: progressWidth }}
      />

      <header className="fixed inset-x-0 top-4 z-40">
        <nav className="container flex items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-4 py-3 shadow-glass backdrop-blur-2xl">
          <a href="#home" className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-purple-500 text-slate-950">
              OU
            </span>
            <span className="hidden sm:inline">Om Upadhyay</span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("github", "github-activity")}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <Button asChild size="default" variant="secondary">
            <a href="#contact">Hire Me</a>
          </Button>
        </nav>
      </header>

      <section id="home" className="container flex min-h-screen items-center pt-28">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Building intelligent, data-driven systems
            </Badge>
            <TypingTitle />
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Building intelligent systems using AI, NLP, Machine Learning and Data Analytics.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#projects">
                  View Projects <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="/Paccar.pdf" download>
                  Download Resume <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass-border relative rounded-[2rem] p-1"
          >
            <Card className="overflow-hidden rounded-[2rem]">
              <CardHeader>
                <div className="mb-6 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <CardTitle className="font-mono text-base text-cyan-100">ai-engineer.profile</CardTitle>
                <CardDescription>Real-world AI + analytics readiness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 font-mono text-sm">
                {[
                  ["focus", "AI, NLP, ML, Data Analytics"],
                  ["stack", "Python, Flask, SQL, OpenCV"],
                  ["project_accuracy", "80% DSA answer evaluation"],
                  ["cloud_foundation", "AWS Academy Graduate"],
                  ["location", "Pune, Maharashtra"]
                ].map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <span className="text-purple-300">{key}</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-cyan-100">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="about" className="container py-24">
        <SectionTitle
          eyebrow="About"
          title="An AI builder with an analytics-first brain."
          description="I connect data exploration, model thinking, and deployable software to turn raw information into practical intelligent systems."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: BrainCircuit,
              title: "AI Systems",
              text: "I build NLP and ML-powered applications that understand text, voice, and user intent."
            },
            {
              icon: Database,
              title: "Data Analytics",
              text: "I work with EDA, preprocessing, insights, SQL workflows, and visualization tools."
            },
            {
              icon: TerminalSquare,
              title: "Backend Prototyping",
              text: "I use Flask, REST APIs, and MySQL to move AI ideas from notebooks into usable apps."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/[0.075]">
                <CardHeader>
                  <item.icon className="h-9 w-9 text-cyan-300" />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.text}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className="container py-24">
        <SectionTitle
          eyebrow="Skills"
          title="A practical AI engineering toolkit."
          description="Core tools across machine learning, analytics, backend APIs, visualization, and web foundations."
        />
        <Card className="glass-border p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="text-cyan-200">{skill.value}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: index * 0.025, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="experience" className="container py-24">
        <SectionTitle
          eyebrow="Experience"
          title="Applied analytics in a real industry setting."
          description="Internship experience focused on data cleaning, exploratory analysis, preprocessing, and insight generation."
        />
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative border-l border-cyan-300/30 pl-8"
          >
            <span className="absolute -left-3 top-1 grid h-6 w-6 place-items-center rounded-full bg-cyan-300 shadow-glow">
              <BriefcaseBusiness className="h-3.5 w-3.5 text-slate-950" />
            </span>
            <Card>
              <CardHeader>
                <Badge className="w-fit">Ashok Leyland Internship</Badge>
                <CardTitle>Data Analyst Intern</CardTitle>
                <CardDescription>
                  Worked on EDA, data preprocessing and analytical insights.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="container py-24">
        <SectionTitle
          eyebrow="Projects"
          title="Featured intelligent systems."
          description="Project work across AI assistants, NLP evaluation, transformer models, automation, and backend integration."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden transition duration-300 hover:-translate-y-2 hover:border-purple-300/30 hover:bg-white/[0.08]">
                <CardHeader>
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-500/20 text-cyan-200 ring-1 ring-white/10 transition group-hover:scale-110">
                    <Code2 className="h-7 w-7" />
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="border-purple-300/20 bg-purple-300/10 text-purple-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="secondary">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="certifications" className="container py-24">
        <SectionTitle
          eyebrow="Certifications"
          title="Signal from structured learning."
          description="Certifications that strengthen cloud fundamentals, analytics thinking, and business-focused problem solving."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {["AWS Cloud Foundations", "Deloitte Data Analytics Job Simulation"].map((cert) => (
            <Card key={cert} className="transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{cert}</CardTitle>
                  <CardDescription>Verified professional learning milestone</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="github-activity" className="container py-24">
        <SectionTitle
          eyebrow="GitHub Activity"
          title="Code, experiments, and project evolution."
          description="Explore my repositories and AI project work on GitHub."
        />
        <Card className="glass-border overflow-hidden">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Github className="mb-5 h-12 w-12 text-cyan-300" />
              <h3 className="text-2xl font-bold text-white">Om-Upadhyay</h3>
              <p className="mt-3 text-muted-foreground">
                Project work focused on AI assistants, NLP systems, analytics workflows, and Python
                development.
              </p>
              <Button asChild className="mt-6" variant="secondary">
                <a href="https://github.com/Om-Upadhyay" target="_blank" rel="noreferrer">
                  Visit GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Primary Stack", "Python + ML"],
                ["Featured Repo", "RAJ Assistant"],
                ["Focus Area", "NLP + Analytics"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 text-xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="contact" className="container py-24">
        <Card className="glass-border overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.035]">
          <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_0.8fr] md:p-12">
            <div>
              <Badge className="mb-4">Contact</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Let’s build something intelligent.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Open to AI, data analytics, machine learning, NLP, and software opportunities where
                practical systems matter.
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href="mailto:omupadhyay611@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-5 w-5 text-cyan-300" />
                omupadhyay611@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/om-upadhyay-467683268"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5 text-cyan-300" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Om-Upadhyay"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Github className="h-5 w-5 text-cyan-300" />
                GitHub
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="container pb-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Om Upadhyay. Designed for performance, polish, and Vercel.
      </footer>
    </main>
  );
}
