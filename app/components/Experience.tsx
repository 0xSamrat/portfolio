import Link from "next/link";
import { ROLES } from "../content/profile";

/**
 * The résumé's work history, which the previous site left out entirely.
 * Recruiters and agents both look for it.
 */
export function Experience() {
  return (
    <section id="experience">
      <div className="label">Experience</div>
      <h2 className="section-title">
        Four years, <em>four systems</em> that had to stay up.
      </h2>

      <div className="roles">
        {ROLES.map((r) => (
          <article className="role" key={r.slug} id={r.slug}>
            <div className="role-when">
              <span className="role-dates">
                {r.start} <span aria-hidden="true">–</span> {r.end}
              </span>
              {r.current && <span className="role-now">Current</span>}
            </div>

            <div className="role-body">
              <h3>
                {r.title} <span className="role-at">at</span>{" "}
                {r.companyUrl ? (
                  <a
                    href={r.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.company}
                    <span className="arr" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  r.company
                )}
              </h3>
              <p className="role-blurb">{r.blurb}</p>
              <ul className="role-bullets">
                {r.bullets.slice(0, 3).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tags">
                {r.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link className="section-more" href="/work">
        <span>Every role and project in full</span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
