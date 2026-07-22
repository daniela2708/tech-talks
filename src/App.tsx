import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Home from "./pages/Home";

// Code-split routes that aren't needed for the initial landing paint so they
// don't ship in the main chunk (bundle-dynamic-imports).
const Sessions = lazy(() => import("./pages/Sessions"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
