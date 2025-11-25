import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const reviews = await client.fetch(`
      *[_type == "review" && published == true] | order(_createdAt asc) {
        _id,
        client,
        role,
        quote,
        location,
        image{
          asset->{
            url
          },
          alt
        }
      }
    `);

    return Response.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}