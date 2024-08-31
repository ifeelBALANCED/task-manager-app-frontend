import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <section
      className="flex items-center justify-center h-screen bg-cloud"
      role="main"
      aria-labelledby="page-title"
      aria-label="404 Not Found Page"
      data-testid="not-found-page"
    >
      <div
        className="text-center"
        aria-label="404 Not Found Content"
        data-testid="not-found-content"
      >
        <h1
          id="page-title"
          className="text-9xl font-extrabold text-sapphire mb-4"
          aria-label="404 Error"
          data-testid="not-found-title"
        >
          404
        </h1>
        <p
          className="text-4xl font-bold text-gray-900 mb-4"
          aria-label="Missing Page Message"
          data-testid="not-found-message"
        >
          Something&apos;s missing.
        </p>
        <p
          className="text-lg font-light text-steel mb-4"
          aria-label="Page Not Found Explanation"
          data-testid="not-found-explanation"
        >
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </p>
        <Link
          to="/"
          className="no-underline inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-sapphire rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 my-4"
          aria-label="Back to Homepage"
          data-testid="back-to-home-link"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  )
}
