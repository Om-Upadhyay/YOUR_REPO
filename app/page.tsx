"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  FileDown,
  Github,
  GitFork,
  Linkedin,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
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

type Project = (typeof portfolio.projects)[number];

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Proof", href: "#proof" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Contact", href: "#contact" }
];

const skillGroups = [
  {
    title: "AI/ML",
    icon: BrainCircuit,
    skills: portfolio.skills.ai_ml.slice(0, 7)
  },
  {
    title: "Analytics",
    icon: BarChart3,
    skills: portfolio.skills.data_analytics.slice(0, 8)
  },
  {
    title: "Backend",
    icon: TerminalSquare,
    skills: [...portfolio.skills.backend, "Python", "SQL", "JavaScript"]
  },
  {
    title: "Tools",
    icon: Database,
    skills: portfolio.skills.tools
  }
];

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 41) % 100}%`,
  top: `${(index * 47) % 100}%`,
  size: 2 + (index % 3),
  duration: 9 + (index % 5),
  delay: (index % 7) * 0.25
}));

function SectionTitle({
  eyebrow,
  title
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="text-3xl font-bold tracking-normal text-white sm:text-5xl">{title}</h2>
    </motion.div>
  );
}

function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_28rem),radial-gradient(circle_at_70%_25%,rgba(168,85,247,0.14),transparent_26rem),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.88))]" />
      <div className="absolute inset-0 animate-grid-fade bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:80px_80px]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-200/55 shadow-[0_0_18px_rgba(103,232,249,0.65)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{ y: [0, -24, 0], opacity: [0.12, 0.7, 0.12] }}
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

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;

  if (showImage) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4">
          <p className="text-sm font-semibold text-white">{project.bestFor}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-950/80 p-5 font-mono text-xs text-slate-300">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="space-y-2">
        <p>
          <span className="text-cyan-300">project</span> = {JSON.stringify(project.title)}
        </p>
        <p>
          <span className="text-purple-300">role_fit</span> = {JSON.stringify(project.bestFor)}
        </p>
        <p>
          <span className="text-emerald-300">impact</span> = {JSON.stringify(project.metrics[0])}
        </p>
        <p className="pt-3 text-slate-500">preview_fallback_{index + 1}.ready()</p>
      </div>
    </div>
  );
}

function ProfilePortrait() {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className="grid aspect-[4/5] w-full max-w-sm place-items-center rounded-[2rem] border border-cyan-300/20 bg-slate-950/70 p-8 text-center shadow-glass backdrop-blur-2xl">
        <div>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-purple-400 text-3xl font-black text-slate-950">
            OU
          </div>
          <p className="mt-5 text-sm font-semibold text-cyan-100">Add profile.png to public</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-border relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] p-1 shadow-glass lg:mx-0">
      <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-slate-950">
        <Image
          src={portfolio.personal.profileImage}
          alt={`${portfolio.personal.name} profile photo`}
          fill
          priority
          sizes="(min-width: 1024px) 360px, 80vw"
          className="object-cover object-[50%_28%]"
          onError={() => setImageFailed(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-slate-950/65 p-4 backdrop-blur-xl">
          <p className="text-sm font-bold text-white">{portfolio.personal.name}</p>
          <p className="mt-1 text-xs text-cyan-100">{portfolio.personal.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [githubActivity, setGithubActivity] = useState<GithubActivity | null>(null);

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
    <main className="relative z-10 min-h-screen pb-20 lg:pb-0">
      <ParticleBackground />
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400"
        style={{ width: progressWidth }}
      />

      <header className="fixed inset-x-0 top-4 z-40">
        <nav className="container flex items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 shadow-glass backdrop-blur-2xl">
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

      <a
        href="#contact"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:-translate-y-1 lg:inline-flex"
      >
        <MessageCircle className="h-4 w-4" />
        Contact Me
      </a>

      <div className="fixed inset-x-4 bottom-4 z-40 grid grid-cols-2 gap-3 lg:hidden">
        <a
          href={portfolio.personal.resume}
          download
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-950/85 px-4 py-3 text-sm font-bold text-white backdrop-blur-xl"
        >
          <FileDown className="h-4 w-4" />
          Resume
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950"
        >
          <Mail className="h-4 w-4" />
          Contact
        </a>
      </div>

      <section id="home" className="container flex min-h-[92vh] items-center pt-28">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center"
          >
            <div>
              <Badge className="mb-6">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Recruiter-ready AI, analytics, and backend portfolio
              </Badge>
              <h1 className="text-5xl font-black leading-none tracking-normal text-white sm:text-7xl lg:text-8xl">
                {portfolio.personal.name}
                <span className="mt-4 block max-w-full break-words leading-none text-gradient [text-wrap:balance]">
                  {portfolio.personal.title}
                </span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {portfolio.personal.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {portfolio.roleChips.map((role) => (
                  <Badge key={role} className="border-white/15 bg-white/10 text-white">
                    {role}
                  </Badge>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <a href="#projects">
                    View Projects <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href={portfolio.personal.resume} download>
                    Download Resume <FileDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href="#contact">
                    Contact Me <Mail className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              <ProfilePortrait />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {portfolio.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl"
              >
                <p className="text-sm font-medium text-muted-foreground">{outcome.label}</p>
                <p className="mt-2 text-2xl font-black text-white">{outcome.value}</p>
                <p className="mt-1 text-xs leading-5 text-cyan-100/80">{outcome.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="projects" className="container py-20">
        <SectionTitle
          eyebrow="Featured Projects"
          title="Proof that the skills turn into systems."
          description="Recruiters should see the outcome, role fit, and technical stack before they have to dig."
        />
        <div className="grid gap-6">
          {portfolio.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group grid gap-6 rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-glass backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.075] lg:grid-cols-[0.9fr_1.1fr] lg:p-6"
            >
              <ProjectVisual project={project} index={index} />
              <div className="flex flex-col">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge>{project.duration}</Badge>
                  <Badge className="border-purple-300/20 bg-purple-300/10 text-purple-100">
                    {project.bestFor}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {project.description}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <CheckCircle2 className="mb-2 h-4 w-4 text-cyan-300" />
                      <p className="text-sm font-semibold text-white">{metric}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-l border-cyan-300/40 pl-4 text-sm leading-7 text-cyan-50/85">
                  {project.impact}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} className="border-white/10 bg-white/10 text-slate-100">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.github ? (
                    <Button asChild variant="secondary">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild variant="ghost">
                    <a href="#contact">Discuss Project</a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="proof" className="container py-20">
        <SectionTitle
          eyebrow="Why Recruiters Should Care"
          title="Fast signal for multiple technical roles."
          description="A compact snapshot for AI/ML, analytics, and backend recruiters scanning quickly."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {portfolio.recruiterProof.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <ShieldCheck className="mb-5 h-9 w-9 text-cyan-300" />
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className="container py-20">
        <SectionTitle
          eyebrow="Skills"
          title="Grouped for recruiter scanning."
          description="Instead of a long skill wall, each cluster maps directly to the roles Om is targeting."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"
            >
              <group.icon className="mb-5 h-9 w-9 text-cyan-300" />
              <h3 className="text-xl font-bold text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} className="border-white/10 bg-white/10 text-slate-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about" className="container py-20">
        <SectionTitle
          eyebrow="About"
          title="An AI builder with an analytics-first brain."
          description={portfolio.about.trim().replace(/\s+/g, " ")}
        />
      </section>

      <section id="experience" className="container py-20">
        <SectionTitle
          eyebrow="Experience"
          title="Applied analytics in real industry settings."
          description="Internship and education signals that support the project proof."
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
                    {experience.role} - {experience.company}
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

      <section id="certifications" className="container py-20">
        <SectionTitle
          eyebrow="Certifications"
          title="Structured learning with measurable scores."
          description="Cloud and analytics credentials that support the portfolio's technical story."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {portfolio.certifications.map((cert) => (
            <Card key={cert.title} className="transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{cert.title}</CardTitle>
                  <CardDescription>
                    {cert.issuer} - Score: {cert.score}
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

      <section id="github-activity" className="container py-20">
        <SectionTitle
          eyebrow="GitHub Activity"
          title="Live repository activity."
          description="The site fetches public GitHub data through a cached Next.js route."
        />
        <Card className="glass-border overflow-hidden">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Github className="mb-5 h-12 w-12 text-cyan-300" />
              <h3 className="text-2xl font-bold text-white">Om-Upadhyay</h3>
              <p className="mt-3 text-muted-foreground">
                Public repositories and profile stats refresh through <span className="font-mono text-cyan-200">/api/github</span>.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["Repos", githubActivity?.stats.repositories ?? portfolio.stats.projects],
                  ["Followers", githubActivity?.stats.followers ?? "-"],
                  ["Following", githubActivity?.stats.following ?? "-"]
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

      <section id="contact" className="container py-20">
        <Card className="glass-border overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.035]">
          <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_0.8fr] md:p-12">
            <div>
              <Badge className="mb-4">Contact</Badge>
              <h2 className="text-3xl font-bold tracking-normal text-white sm:text-5xl">
                Let&apos;s build something intelligent.
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
        (c) {new Date().getFullYear()} {portfolio.personal.name}. Dynamic Next.js portfolio.
      </footer>
    </main>
  );
}
