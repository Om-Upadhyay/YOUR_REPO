"use client";

import { useEffect, useMemo, useState } from "react";
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
  Star,
  GitFork,
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
import { portfolio } from "@/data/portfolio";

type GithubActivity = {
  stats: {
    repositories: number;
    followers: number;
    following: number;
  };
  repositories: {
    id: number;
    name: string;
    url: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    updatedAt: string;
  }[];
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Contact", href: "#contact" }
];

const skillScores: Record<string, number> = {
  Python: 92,
  SQL: 86,
  "Machine Learning": 84,
  "Natural Language Processing": 82,
  NLP: 82,
  Flask: 80,
  MySQL: 78,
  OpenCV: 76,
  "Scikit-Learn": 84,
  Pandas: 88,
  NumPy: 86,
  "Power BI": 74,
  Tableau: 72,
  HTML: 82,
  CSS: 80,
  JavaScript: 78
};

const aboutCards = [
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
      {portfolio.personal.name}
      <span className="mt-4 block overflow-hidden whitespace-nowrap border-r-4 border-cyan-300 pr-2 text-gradient motion-safe:animate-[typing_3.5s_steps(28,end),blink_0.8s_step-end_infinite]">
        {portfolio.personal.title}
      </span>
    </h1>
  );
}

function getSkillList() {
  return [
    ...portfolio.skills.languages,
    ...portfolio.skills.ai_ml,
    ...portfolio.skills.data_analytics,
    ...portfolio.skills.backend,
    ...portfolio.skills.tools
  ]
    .filter((skill, index, skills) => skills.indexOf(skill) === index)
    .map((name) => ({ name, value: skillScores[name] ?? 70 }))
    .slice(0, 18);
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [githubActivity, setGithubActivity] = useState<GithubActivity | null>(null);
  const skills = useMemo(getSkillList, []);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/github")
      .then((response) => response.json() as Promise<GithubActivity>)
      .then((data) => {
        if (isMounted) {
          setGithubActivity(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setGithubActivity(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
            <span className="hidden sm:inline">{portfolio.personal.name}</span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
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
              {portfolio.personal.tagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#projects">
                  View Projects <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={portfolio.personal.resume} download>
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
                <CardDescription>Dynamic portfolio data source</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 font-mono text-sm">
                {[
                  ["focus", "AI, NLP, ML, Data Analytics"],
                  ["projects", `${portfolio.stats.projects} featured systems`],
                  ["certifications", `${portfolio.stats.certifications} credentials`],
                  ["technologies", `${portfolio.stats.technologies}+ tools`],
                  ["location", portfolio.personal.location]
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
          description={portfolio.about.trim().replace(/\s+/g, " ")}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {aboutCards.map((item, index) => (
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
          description="Rendered dynamically from grouped portfolio skills, with animated competency bars."
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
          title="Applied analytics in real industry settings."
          description="Timeline entries now come directly from the portfolio data source."
        />
        <div className="mx-auto grid max-w-3xl gap-8">
          {portfolio.experience.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.role}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative border-l border-cyan-300/30 pl-8"
            >
              <span className="absolute -left-3 top-1 grid h-6 w-6 place-items-center rounded-full bg-cyan-300 shadow-glow">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-slate-950" />
              </span>
              <Card>
                <CardHeader>
                  <Badge className="w-fit">{experience.duration}</Badge>
                  <CardTitle>
                    {experience.role} · {experience.company}
                  </CardTitle>
                  <CardDescription>{experience.description.join(" ")}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="container py-24">
        <SectionTitle
          eyebrow="Projects"
          title="Featured intelligent systems."
          description="Add or edit projects in one file and the cards update automatically."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {portfolio.projects.map((project, index) => (
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
                  <Badge className="w-fit">{project.duration}</Badge>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 grid gap-2 text-sm text-muted-foreground">
                    {project.features.slice(0, 4).map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="border-purple-300/20 bg-purple-300/10 text-purple-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.github ? (
                    <Button asChild variant="secondary">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
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
          description="Certification cards are generated from portfolio data and can grow with new credentials."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {portfolio.certifications.map((cert) => (
            <Card key={cert.title} className="transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{cert.title}</CardTitle>
                  <CardDescription>
                    {cert.issuer} · Score: {cert.score}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="github-activity" className="container py-24">
        <SectionTitle
          eyebrow="GitHub Activity"
          title="Live repository activity."
          description="This section fetches from the GitHub API through a cached Next.js route."
        />
        <Card className="glass-border overflow-hidden">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Github className="mb-5 h-12 w-12 text-cyan-300" />
              <h3 className="text-2xl font-bold text-white">Om-Upadhyay</h3>
              <p className="mt-3 text-muted-foreground">
                GitHub data refreshes through <span className="font-mono text-cyan-200">/api/github</span>.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["Repos", githubActivity?.stats.repositories ?? portfolio.stats.projects],
                  ["Followers", githubActivity?.stats.followers ?? "—"],
                  ["Following", githubActivity?.stats.following ?? "—"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 text-xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6" variant="secondary">
                <a href={portfolio.personal.github} target="_blank" rel="noreferrer">
                  Visit GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-4">
              {(githubActivity?.repositories.length
                ? githubActivity.repositories
                : portfolio.projects.map((project, index) => ({
                    id: index,
                    name: project.title,
                    url: project.github || portfolio.personal.github,
                    description: project.description,
                    language: project.technologies[0] ?? "Code",
                    stars: 0,
                    forks: 0,
                    updatedAt: project.duration
                  }))
              ).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-white">{repo.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{repo.description}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-cyan-300" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="text-cyan-200">{repo.language}</span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {repo.forks}
                    </span>
                  </div>
                </a>
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
                href={`mailto:${portfolio.personal.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-5 w-5 text-cyan-300" />
                {portfolio.personal.email}
              </a>
              <a
                href={portfolio.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5 text-cyan-300" />
                LinkedIn
              </a>
              <a
                href={portfolio.personal.github}
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
        © {new Date().getFullYear()} {portfolio.personal.name}. Dynamic Next.js portfolio.
      </footer>
    </main>
  );
}
