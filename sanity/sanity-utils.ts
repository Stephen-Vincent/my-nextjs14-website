// sanity-utils.ts
import { createClient, groq } from "next-sanity";    
import { Project } from "@/types/Project";  
import { Page } from "@/types/Page";
import clientConfig from "./config/client-config"; 

export async function getProjects(): Promise<Project[]> {
    return createClient(clientConfig).fetch( 
        groq`*[_type == "project"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content,
        alt       
    }`
    )
}

export async function getProject(slug: string): Promise<Project>{

    const query = groq`*[_type == "project" && slug.current == $slug]{ 
        _id, 
        _createdAt, 
        name, 
        "slug": slug.current, 
        "image": image.asset->url, 
        url, 
        content, 
        alt 
    }[0]`; // Add [0] at the end of the query to select the first result

    const project = await createClient(clientConfig).fetch(query, { slug });
    if (!project) {
        throw new Error('Project not found');
    }
    return project;

}

export async function getPages(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page"]{
        _id,
        _createdAt,
        title,
        "slug" : slug.current,
    }`
  );    
}

export async function getPage(slug: string): Promise<Page> { 
   return createClient(clientConfig).fetch(
     groq`*[_type == "page" && slug.current = $slug]{
        _id,
        _createdAt,
        title,
        "slug" : slug.current,
        content
     }`,{ slug }
   );
}