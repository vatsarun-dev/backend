import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";

const features = [
  {
    title: "Small rituals, clear records",
    description:
      "Admissions, class lists, and daily updates stay close to the staff workflows that already exist.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "A calmer school office",
    description:
      "Every table, form, and search flow is shaped for quick reading without feeling like corporate software.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Designed around students",
    description:
      "Student photos, class context, and contact details remain visible where staff need confidence.",
    image:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=900&q=82",
  },
];

const steps = [
  {
    title: "Register with care",
    description:
      "Create a complete student profile with photo, class, course, contact, and family details.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=82",
  },
  {
    title: "Search in seconds",
    description:
      "Find students by name, ID, class, course, father name, or mobile number using the existing backend.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=82",
  },
  {
    title: "Read the school day",
    description:
      "Use dashboard signals to understand registrations, active classes, and recent student activity.",
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1000&q=82",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=82",
  "https://cdn.prod.website-files.com/68f68958c2668295d6501e97/6a2050b8af91f02cff0698aa_home-hero-new.avif",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=82",
];

export function SchoolStorySections({ basePath = "/teacher", ctaTo }) {
  const target = ctaTo || `${basePath}/students/new`;

  return (
    <>
      <section className="story-section feature-block" data-reveal>
        <div className="story-intro">
          <span className="eyebrow">Student experience</span>
          <h2>A warmer way to run the school day.</h2>
          <p>
            The workspace keeps existing backend workflows intact while giving
            every screen the feel of a thoughtful K-8 school site.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <img src={feature.image} alt="" />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-band" data-reveal>
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=82"
          alt=""
        />
        <div className="testimonial-copy">
          <span className="eyebrow">Staff voice</span>
          <blockquote>
            "The register feels less like a database and more like a place where
            the whole class story comes together."
          </blockquote>
          <p>Academic office / ADHH workspace</p>
        </div>
      </section>

      <section className="numbered-section" data-reveal>
        {steps.map((step, index) => (
          <article className="numbered-row" key={step.title}>
            <div className="numbered-copy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <img src={step.image} alt="" />
          </article>
        ))}
      </section>

      <section
        className="photo-grid"
        aria-label="School life gallery"
        data-reveal
      >
        {gallery.map((src) => (
          <img src={src} alt="" key={src} />
        ))}
      </section>

      <section className="closing-cta" data-reveal>
        <div>
          <span className="eyebrow">Ready for the next record</span>
          <h2>Keep the school office moving with care.</h2>
          <Link to={target}>
            <Button icon={ArrowRight}>Register a student</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
