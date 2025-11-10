"use client";
import React from "react";
import { HeroParallax } from "../animated/parallax";
import dash1 from "@/assets/dash1.jpg";
import dash2 from "@/assets/dash2.jpg";
const products = [
  {
    title: "Lukanu",
    thumbnail: dash1.src,
  },
  {
    title: "Lukanu",
    thumbnail: dash2.src,
  },
  {
    title: "Lukanu",
    thumbnail: dash1.src,
  },

  {
    title: "Lukanu",
    thumbnail: dash2.src,
  },
  {
    title: "Lukanu",
    thumbnail: dash1.src,
  },
  {
    title: "Lukanu",
    thumbnail: dash2.src,
  },

  {
    title: "Lukanu",
    thumbnail: dash1.src,
  },
  {
    title: "Lukanu",
    thumbnail: dash2.src,
  },
  {
    title: "Lukanu",
    thumbnail: dash1.src,
  },
];
export default function CTA() {
  return <HeroParallax products={products} />;
}
