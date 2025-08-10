"use client"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Your Site Name</title>
        <meta name="description" content="Your site description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Your Site
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/" className={`hover:text-primary ${router.pathname === "/" ? "text-primary" : ""}`}>
                Home
              </Link>
              <Link
                href="/tools"
                className={`hover:text-primary ${router.pathname.startsWith("/tools") ? "text-primary" : ""}`}
              >
                Tools
              </Link>
              <Link
                href="/tools/fake-checker"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              >
                Fake Checker
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Your Site Name. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
