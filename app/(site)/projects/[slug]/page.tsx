"use client";

import React, { useEffect, useState } from "react";
import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Project } from "@/types/Project";

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // This function is declared within useEffect to handle async operations
    const fetchProject = async () => {
      try {
        const fetchedProject = await getProject(params.slug);
        setProject(fetchedProject);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    fetchProject();
  }, [params.slug]); // Depend on slug to refetch if it changes

  if (!project) {
    return <div>Loading project...</div>;
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl drop-shadow font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          {project.name}
        </h1>
        <a
          href={project.url}
          title="View Project"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
        >
          View Project
        </a>
      </header>

      {/* image goes here */}
      <Image
        src={project.image}
        alt={project.alt}
        width={1920}
        height={1080}
        className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
      />

      {/* content goes here */}
      <div className="mt-8 text-gray-700 text-lg">
        <PortableText value={project.content} />
      </div>
    </div>
  );
};

export default ProjectPage;
