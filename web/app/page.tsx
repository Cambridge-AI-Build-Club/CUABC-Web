// Phase 0 placeholder. Exercises the shared SCSS (intro, button, container grid) so the
// style pipeline can be verified before any real page is ported in Phase 1.
export default function HomePage() {
  return (
    <div className="wrapper">
      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6">
              <h1>Next.js rebuild — Phase 0</h1>
              <p>
                Skeleton only. The Jekyll site remains the source of truth until the
                migration cutover; page-by-page porting starts in Phase 1.
              </p>
              <a className="button button-primary" href="#">
                Placeholder button
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
