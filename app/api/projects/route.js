import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(order asc) {
        _id,
        title,
        category,
        year,
        stack,
        description,
        image{
          asset->{
            url
          }
        },
        links,
        featured,
        order
      }
    `);

    return Response.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}