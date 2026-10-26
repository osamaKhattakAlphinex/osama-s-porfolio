import type { PostMeta } from "./types";
import { A, Figure, H2, Note, Out } from "@/components/article";

export const meta: PostMeta = {
  slug: "build-time-tracking-app-like-hubstaff",
  title: "How to Build a Time Tracking App Like Hubstaff: Lessons from Staffvertex",
  metaTitle: "How to Build a Time Tracking App Like Hubstaff",
  description:
    "What it takes to build a time tracking app like Hubstaff: the timer, offline sync, idle time, screenshots, timesheets and invoices. Lessons from Staffvertex.",
  focusKeyword: "build a time tracking app",
  keywords: ["build a time tracking app", "Hubstaff alternative", "time tracking software development", "MERN stack SaaS", "employee time tracker"],
  category: "SaaS development",
  published: "2026-10-20",
  updated: "2026-10-20",
  project: "staffvertex",
  services: ["mern-stack-development", "nextjs-development"],
  image: "/blog/build-time-tracking-app-like-hubstaff.webp",
  imageAlt: "Staffvertex home page in a browser window: free to start, time tracking and project management for teams",
  excerpt:
    "A timer looks like the easy part. It isn't. Here's what building and maintaining Staffvertex taught me about the parts of a time tracker that people actually trust.",
  toc: [
    { id: "what-matters", label: "What a time tracker has to get right" },
    { id: "the-timer", label: "The timer is the product" },
    { id: "offline", label: "Offline first, or the hours are wrong" },
    { id: "idle-time", label: "Idle time is a policy, not a feature" },
    { id: "screenshots", label: "Screenshots and privacy" },
    { id: "hours-to-invoices", label: "From hours to timesheets to invoices" },
    { id: "data-model", label: "A data model that survives edits" },
    { id: "stack", label: "Choosing the stack" },
    { id: "build-or-buy", label: "Should you build your own?" },
  ],
  faqs: [
    {
      q: "How long does it take to build a time tracking app?",
      a: "A web-only first version with a timer, projects and basic reports can be built in a few weeks. A product that competes with Hubstaff, with desktop apps, offline sync, idle detection, screenshots and invoicing, takes months and then needs ongoing maintenance.",
    },
    {
      q: "Can you build a time tracking app with the MERN stack?",
      a: "Yes. MongoDB, Express, React and Node.js cover the web app and API well. You will still need a desktop app for reliable tracking, which is usually built with Electron or a native toolkit and talks to the same API.",
    },
    {
      q: "Do time tracking apps need screenshots?",
      a: "No. Many teams never turn them on. If you offer them, make them optional, off by default, and give people a way to blur or delete them.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Every team that bills by the hour ends up with the same argument sooner or later: someone says they worked six hours, the
        report says four, and nobody can prove which is right. A time tracking app exists to end that argument. That&apos;s a
        harder job than it sounds.
      </p>
      <p>
        I build and maintain <A href="/projects/staffvertex">Staffvertex</A>, a time tracking and project management product in
        the same category as Hubstaff, made at Alphinex Solutions. This article is what I&apos;d tell anyone who wants to build
        a time tracking app of their own: what matters, what looks important but isn&apos;t, and where the real work hides.
      </p>

      <H2 id="what-matters">What a time tracker has to get right</H2>
      <p>Strip away the dashboards and a time tracker makes three promises:</p>
      <ul>
        <li>
          <strong>The hours are correct.</strong> Not roughly correct. Correct enough that a client will pay an invoice built on
          them.
        </li>
        <li>
          <strong>Tracking costs almost no effort.</strong> If starting the timer takes more than one click, people forget, and
          then they fill in timesheets from memory on Friday.
        </li>
        <li>
          <strong>It&apos;s fair to the person being tracked.</strong> If the team feels watched, they&apos;ll resent the tool and
          find ways around it.
        </li>
      </ul>
      <p>
        Every feature decision comes back to one of those three. When I&apos;m unsure whether something belongs in the product, I
        ask which promise it serves. If the answer is none, it waits.
      </p>

      <Figure
        src="/work/staffvertex/home.webp"
        alt="Staffvertex home page: free to start, time tracking and project management for teams"
        caption="Staffvertex leads with one action: start the timer in one click."
      />

      <H2 id="the-timer">The timer is the product</H2>
      <p>
        It&apos;s tempting to treat the timer as a solved problem and spend your energy on reports. That&apos;s backwards. People
        touch the timer dozens of times a day and open reports once a week. If the timer is slow, fiddly or unreliable, nothing
        else you build will matter.
      </p>
      <p>A good timer does a few things without being asked:</p>
      <ul>
        <li>Starts from wherever the person already is: the desktop app, the browser, or a global keyboard shortcut.</li>
        <li>Remembers the last project and task, because most people switch far less often than you&apos;d expect.</li>
        <li>Never runs twice. Starting a timer on the laptop should stop the one left running in the browser.</li>
        <li>Shows the running time somewhere visible, so a forgotten timer gets noticed in minutes, not days.</li>
      </ul>
      <p>
        That last point saves more support tickets than any feature I can think of. A timer left running overnight is the most
        common way hours go wrong, and the fix is mostly visibility.
      </p>

      <H2 id="offline">Offline first, or the hours are wrong</H2>
      <p>
        Here&apos;s the mistake I see in most first attempts: the app sends a request to the server when the timer starts and
        another when it stops, and treats the server as the source of truth for everything in between. Then someone tracks a
        flight, a train ride or just a bad afternoon of Wi-Fi, and their hours disappear.
      </p>
      <p>
        The Staffvertex desktop app keeps counting when the connection drops and syncs about once a minute when it comes back.
        That behavior is the difference between a tracker people trust and one they double-check against a notebook.
      </p>
      <p>If you&apos;re designing this yourself, the pieces are:</p>
      <ol>
        <li>Record time on the device as small, timestamped intervals, written to local storage before anything else happens.</li>
        <li>Send those intervals to the API in batches, each with an id the server can use to ignore duplicates.</li>
        <li>Let the server accept late data. An interval that arrives three hours late is still a real interval.</li>
        <li>Never trust the device clock on its own. Compare it with server time when you can, so changing the computer clock
          doesn&apos;t change the hours. Staffvertex calls this a trusted clock.</li>
      </ol>
      <Note title="Rule of thumb">
        <p>
          Design the sync so that sending the same batch twice is harmless. Networks retry, apps crash mid-request, and laptops
          sleep at the worst possible moment.
        </p>
      </Note>

      <H2 id="idle-time">Idle time is a policy, not a feature</H2>
      <p>
        Detecting that nobody has touched the keyboard or mouse for ten minutes is the easy part. Deciding what to do about it is
        not, because the right answer depends on the team. A design agency might want idle time thrown away. A support team on
        calls might want it kept, because talking on the phone looks idle to a computer.
      </p>
      <p>
        So don&apos;t hard-code a rule. Staffvertex lets each team choose whether idle time is kept, discarded, asked about, or
        whether the timer simply stops. Ask the person first whenever you can. &quot;You were away for 14 minutes, keep this
        time?&quot; is fair, and it catches the meeting that happened away from the desk.
      </p>

      <H2 id="screenshots">Screenshots and privacy</H2>
      <p>
        Screenshots are the feature buyers ask about and employees dread. I&apos;d build them, because some clients genuinely need
        proof of work, but I&apos;d build them carefully:
      </p>
      <ul>
        <li>Off by default. A team turns them on deliberately, and everyone tracked can see that they&apos;re on.</li>
        <li>Blur options, so a screenshot can show that work happened without showing private messages or client data.</li>
        <li>Clear retention, so old screenshots are deleted on a schedule instead of piling up forever.</li>
        <li>
          Honest operating system permissions. On macOS, screen capture requires the Screen Recording permission, so only ask for
          it when screenshots are actually enabled.
        </li>
      </ul>
      <p>
        Staffvertex follows that pattern: screenshots are optional and off by default, with blur controls. Activity and app
        tracking sit in the same bucket. Useful for some teams, invasive for others, so they should be settings, not
        assumptions.
      </p>

      <Figure
        src="/work/staffvertex/section.webp"
        alt="Staffvertex page explaining what a tracked day looks like, from clocking on to the end of the day"
        caption="Explaining a tracked day step by step does more for trust than any privacy policy."
      />

      <H2 id="hours-to-invoices">From hours to timesheets to invoices</H2>
      <p>
        Tracked time is raw material. The value shows up when it turns into something a manager or client acts on, and the chain
        usually looks like this:
      </p>
      <ol>
        <li>
          <strong>Timesheets.</strong> A week of intervals grouped by person and day, with overtime calculated and a way to
          approve or send back.
        </li>
        <li>
          <strong>Reports.</strong> The same data cut by project, client or task, exportable, and ideally emailed on a schedule
          so nobody has to remember to run them.
        </li>
        <li>
          <strong>Invoices and pay.</strong> Hours multiplied by the right rate. Rates differ per person, per project and
          sometimes per client, so model them as their own records with start dates, not as one number on the user.
        </li>
      </ol>
      <p>
        Staffvertex covers all three, along with project expenses. If you&apos;re building a smaller tool, I&apos;d still design
        the data with invoices in mind from day one. Retrofitting rates onto months of existing time entries is painful.
      </p>

      <H2 id="data-model">A data model that survives edits</H2>
      <p>
        People edit their time. They forget to start the timer, they log a meeting after the fact, they split two hours across two
        projects. Your data model has to handle that without losing what originally happened.
      </p>
      <p>Whether you use MongoDB or a relational database, a few decisions hold up well:</p>
      <ul>
        <li>
          <strong>Store intervals, not totals.</strong> Each time entry has a start, an end, a user, a project and optionally a
          task, all in UTC. Durations are calculated, never stored as the only record.
        </li>
        <li>
          <strong>Record the source.</strong> Desktop, web, mobile or manual entry. Managers reasonably want to know which hours
          were added by hand.
        </li>
        <li>
          <strong>Keep an edit history.</strong> When someone changes an entry, keep the old values. It settles disputes and it
          catches bugs.
        </li>
        <li>
          <strong>Index for the questions you ask most.</strong> In MongoDB, a compound index on user and start time covers
          &quot;my week&quot;, and one on project and start time covers project reports.
        </li>
        <li>
          <strong>Store the user&apos;s time zone with the entry.</strong> A day boundary means midnight where the person is, not
          midnight on the server.
        </li>
      </ul>

      <H2 id="stack">Choosing the stack</H2>
      <p>
        A time tracker is really three apps that share one API: the web app where people plan work and read reports, the desktop
        app that does the tracking, and the API with its database in the middle.
      </p>
      <p>
        For the web app and API, the <A href="/services/mern-stack-development">MERN stack</A> is a natural fit. Time entries,
        projects and teams map cleanly to MongoDB documents, Express and Node.js handle a busy API comfortably, and React is a good
        match for the timer and board interfaces. Staffvertex&apos;s web app runs on{" "}
        <A href="/services/nextjs-development">Next.js</A>, which adds server rendering for the public marketing and pricing pages,
        the pages that need to rank on Google.
      </p>
      <p>
        The desktop app is its own project. Browser tabs get throttled and closed, so serious tracking needs a desktop client.
        Staffvertex ships for Windows and macOS. Plan for code signing, auto-updates and the operating system permissions from the
        start, because each one takes longer than it looks.
      </p>

      <H2 id="build-or-buy">Should you build your own?</H2>
      <p>
        If you just need your own team to track hours, don&apos;t build anything. Use an existing tool. Staffvertex has a free plan
        for a single user, and so do several of its competitors.
      </p>
      <p>Building makes sense when one of these is true:</p>
      <ul>
        <li>Time tracking is the product you want to sell.</li>
        <li>Your workflow is unusual enough that existing tools fight you, such as a specific approval chain or payroll rule.</li>
        <li>You need tracking built into a product you already have, for example a marketplace that bills clients by the hour.</li>
      </ul>
      <p>
        In those cases, start small: the timer, offline sync and a weekly timesheet. Get those trusted first. Screenshots,
        invoices and integrations can follow once people rely on the core.
      </p>
      <p>
        If you&apos;re planning a SaaS product like this and want someone who has built one end to end, see{" "}
        <A href="/services/mern-stack-development">how I work on MERN stack projects</A> or{" "}
        <A href="/contact">tell me what you&apos;re building</A>. You can also look at{" "}
        <Out href="https://www.staffvertex.com">Staffvertex itself</Out> to see these ideas running in production.
      </p>
    </>
  );
}
