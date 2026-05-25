"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Boxes,
  DatabaseZap,
  Gauge,
  Layers3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { DEFAULT_TEAM_IMAGE_OBJECT_CLASS, TEAM_MEMBERS, TEAM_SECTION_INTRO } from "@/lib/team";
import { cn } from "@/lib/utils";

const STORY_CARDS = [
  {
    title: "The business grew faster than the system.",
    desc: "Orders, SKUs, leads, payments, and tasks started moving through different tools.",
    icon: Boxes,
  },
  {
    title: "WhatsApp became the control room.",
    desc: "Sales, stock, follow-ups, and approvals lived in chats nobody could audit.",
    icon: MessageSquareText,
  },
  {
    title: "Excel became the operating system.",
    desc: "Every team had a sheet. No two teams had the same truth.",
    icon: DatabaseZap,
  },
  {
    title: "That pain became the product brief.",
    desc: "Zoveto exists because fragmented operations make good companies feel out of control.",
    icon: Sparkles,
  },
] as const;

const OUTCOME_CARDS = [
  { title: "Control", icon: ShieldCheck, desc: "One source of execution truth across stock, sales, finance, and people." },
  { title: "Clarity", icon: Gauge, desc: "Leaders see what moved, why it moved, and who owns the next action." },
  { title: "Flow", icon: Activity, desc: "Work moves through rules, approvals, and automations instead of follow-up chains." },
  { title: "Speed", icon: TrendingUp, desc: "Teams act on current operating data instead of waiting for rebuilt reports." },
] as const;

const PRINCIPLES = [
  { title: "Model the real workflow", desc: "Start from how orders, stock, cash, and people actually move on the floor." },
  { title: "Make ownership visible", desc: "Every exception needs a status, owner, timestamp, and next action." },
  { title: "Automate only after structure", desc: "AI and automation work when the underlying process has clean system rules." },
  { title: "Design for auditability", desc: "Every action should be traceable without slowing teams down." },
  { title: "Ship close to operators", desc: "Product decisions stay close to day-end pressure, not pitch-deck abstraction." },
] as const;

const SYSTEM_NODES = ["Inventory", "Warehouse", "Sales", "Finance", "HRMS", "BI", "AI Agents"] as const;
const OPERATING_SIGNALS = [
  { label: "SKU movement", value: "Traced" },
  { label: "Order state", value: "Owned" },
  { label: "Cash pulse", value: "Visible" },
  { label: "Payroll run", value: "Controlled" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function AboutNarrativeClient() {
  const reduceMotion = useReducedMotion();

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };
  const revealItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: easeOut },
    },
  };

  return (
    <div className="relative overflow-hidden bg-background pb-20 pt-28 md:pt-36">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_15%_14%,rgba(0,113,227,0.16),transparent_50%),radial-gradient(circle_at_82%_8%,rgba(52,199,89,0.10),transparent_40%)]"
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.7], scale: [1, 1.04, 1] }}
        transition={reduceMotion ? undefined : { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <motion.section
          className="grid gap-10 pb-20 md:pb-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={revealItem}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">About Zoveto</p>
            <h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.65rem,5.6vw,5.35rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">
              Built for operators who need control, not another dashboard.
            </h1>
            <p className="mt-7 max-w-[66ch] text-pretty text-lg leading-8 text-muted md:text-xl">
              Zoveto is a company operating system for businesses that have outgrown chats, spreadsheets, and disconnected tools.
              We build around the way stock, orders, cash, and teams really move.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/modules/inventory"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue px-6 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(0,113,227,0.26)] transition-colors hover:bg-blue-hover"
              >
                Explore the system <ArrowRight size={16} />
              </Link>
              <Link
                href="/operational-proof"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-blue/30"
              >
                See operating patterns
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.10)]"
            variants={revealItem}
          >
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-white">
                  <Workflow size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Company OS control room</p>
                  <p className="text-[11px] font-medium text-muted-2">One system. One operating truth.</p>
                </div>
              </div>
              <span className="rounded-full border border-green/20 bg-green/10 px-3 py-1 text-[11px] font-semibold text-foreground">
                Live
              </span>
            </div>

            <div className="grid gap-px bg-border sm:grid-cols-[0.88fr_1.12fr]">
              <div className="bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-2">Operating signals</p>
                <div className="mt-5 space-y-3">
                  {OPERATING_SIGNALS.map((signal) => (
                    <div key={signal.label} className="rounded-2xl border border-border bg-surface-2 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-muted">{signal.label}</span>
                        <span className="text-sm font-semibold text-foreground">{signal.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative bg-card p-5">
                {!reduceMotion ? (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute left-5 right-5 top-[5.6rem] h-px bg-blue/60"
                    animate={{ opacity: [0.25, 1, 0.25], scaleX: [0.1, 1, 0.1] }}
                    transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-2">Connected modules</p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {SYSTEM_NODES.map((node) => (
                    <div key={node} className="rounded-xl border border-border bg-surface-2 px-3 py-3 text-sm font-semibold text-foreground">
                      {node}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-blue/15 bg-blue-light p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue">
                    <BadgeCheck size={14} />
                    Operator built
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    The product brief is not “more software.” It is fewer blind spots and cleaner execution.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          aria-labelledby="lived-title"
          className="py-16 md:py-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="max-w-3xl">
            <motion.p variants={revealItem} className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">
              Why we exist
            </motion.p>
            <motion.h2 id="lived-title" variants={revealItem} className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-5xl">
              We did not imagine the mess. We operated inside it.
            </motion.h2>
          </div>
          <motion.div variants={staggerContainer} className="mt-10 grid gap-4 md:grid-cols-2">
            {STORY_CARDS.map((block) => (
              <motion.article
                key={block.title}
                variants={revealItem}
                className="group rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue/25 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] motion-reduce:transform-none"
              >
                <block.icon className="h-5 w-5 text-blue" strokeWidth={1.8} />
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-foreground">{block.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{block.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[linear-gradient(180deg,#0b0f14_0%,#101827_62%,#151f31_100%)] py-24 md:py-28">
          <div className="container mx-auto max-w-content px-4 sm:px-6">
            <motion.div
              className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.28 }}
            >
              <motion.div variants={revealItem}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/62">System shift</p>
                <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2.1rem,3.8vw,4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
                  Zoveto replaces the operational drift between tools.
                </h2>
                <p className="mt-6 max-w-[62ch] text-base leading-7 text-white/70 md:text-lg">
                  ERP, warehouse, CRM, finance, HRMS, BI, and AI agents run on one connected operating model. Fewer exports.
                  Fewer status meetings. Fewer “which sheet is right?” moments.
                </p>
              </motion.div>

              <motion.div variants={revealItem} className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <div className="grid gap-3 sm:grid-cols-2">
                  {["ERP -> warehouse", "warehouse -> CRM", "CRM -> finance", "everything -> AI agents"].map((line) => (
                    <div key={line} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-sm font-semibold text-white/86">
                      {line}
                    </div>
                  ))}
                </div>
                <motion.svg aria-hidden viewBox="0 0 1000 240" className="mt-8 hidden h-24 w-full md:block">
                  <motion.path
                    d="M40,140 C210,40 350,190 530,110 C700,40 820,160 960,100"
                    stroke="rgba(96,165,250,0.38)"
                    strokeWidth="1.4"
                    fill="none"
                    strokeDasharray="5 11"
                    animate={reduceMotion ? undefined : { strokeDashoffset: [0, -120] }}
                    transition={reduceMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          className="py-20 md:py-24"
          aria-labelledby="outcomes-title"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <motion.div variants={revealItem}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">What this changes</p>
              <h2 id="outcomes-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-5xl">
                A business starts feeling run, not patched together.
              </h2>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-2">
              {OUTCOME_CARDS.map((item) => (
                <motion.article
                  key={item.title}
                  variants={revealItem}
                  className="rounded-[1.4rem] border border-border bg-card p-6 shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] motion-reduce:transform-none"
                >
                  <item.icon className="h-5 w-5 text-blue" strokeWidth={1.8} />
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="py-20 md:py-24" aria-labelledby="build-title" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="max-w-3xl">
            <motion.p variants={revealItem} className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">
              Build principles
            </motion.p>
            <motion.h2 variants={revealItem} id="build-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-5xl">
              The product is engineered around operational discipline.
            </motion.h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <motion.article key={item.title} variants={revealItem} className="rounded-[1.4rem] border border-border bg-card p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="py-20 md:py-24" aria-labelledby="team-title" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <motion.div variants={revealItem}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">Leadership</p>
              <h2 id="team-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-5xl">
                Built by operators, not just developers.
              </h2>
              <p className="mt-5 max-w-[58ch] text-base leading-7 text-muted">{TEAM_SECTION_INTRO}</p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid gap-4">
            {TEAM_MEMBERS.map((member) => (
              <motion.article
                key={member.id}
                variants={revealItem}
                className="grid gap-5 rounded-[1.5rem] border border-border bg-card p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/25 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] motion-reduce:transform-none sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] sm:gap-6"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[7.5rem] overflow-hidden rounded-2xl bg-surface ring-1 ring-border sm:mx-0 sm:max-w-none sm:w-[7.5rem] sm:min-w-[7.5rem]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className={cn(
                      "h-full w-full object-cover",
                      member.imageObjectClass ?? DEFAULT_TEAM_IMAGE_OBJECT_CLASS
                    )}
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold tracking-[-0.025em] text-foreground">{member.name}</p>
                  <p className="mt-1 text-sm font-medium text-muted">{member.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{member.cardTagline}</p>
                  <p className="mt-3 text-sm leading-6 text-foreground/82">{member.bio[0]}</p>
                </div>
              </motion.article>
            ))}
            </motion.div>
          </div>
        </motion.section>

        <footer className="mb-4 mt-6 overflow-hidden rounded-[2rem] border border-border bg-foreground px-6 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.18)] md:px-10 md:py-16">
          <Layers3 className="mx-auto h-7 w-7 text-blue" />
          <p className="mx-auto mt-6 max-w-4xl text-balance text-[clamp(1.8rem,3.4vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-white">
            Zoveto is not another tool. It is the operating system your business should have started with.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/signup"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-blue px-8 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,113,227,0.34)] transition-colors hover:bg-blue-hover"
            >
              Request Early Access
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-sm font-semibold text-white transition-colors hover:bg-white/[0.10]"
            >
              Book a Demo
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

