import React from 'react';
import { client } from '@/sanity/lib/client';
import dynamicImport from 'next/dynamic';

const BlogDetails = dynamicImport(() => import('@/components/Blogs/BlogDetails'), {
  loading: () => (
    <section className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-cyan-400 font-mono">Loading Article...</p>
    </section>
  )
});

// Static params for all possible blog slugs
export async function generateStaticParams() {
  // Define all possible blog slugs
  const blogSlugs = [
    'nextjs-14-complete-guide',
    'building-secure-apis-nodejs',
    'optimizing-react-performance',
    'docker-for-developers',
    'web-application-security',
    'typescript-in-react'
  ];

  return blogSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    // Try to fetch from Sanity first
    const blog = await client.fetch(`
      *[_type == "blog" && slug.current == $slug][0] {
        title,
        description,
        categories,
        images,
        publishedAt,
        readTime
      }
    `, { slug });

    if (blog) {
      return {
        title: `${blog.title?.en || 'Blog'} | Imad Hussain Khan Technical Blog`,
        description: blog.description?.en || 'Technical blog article',
        keywords: [
          blog.categories?.[0]?.en || 'Blog',
          'Technical Blog',
          'Web Development',
          'Programming',
          'Tutorial'
        ],
        authors: [{ name: 'Imad Hussain Khan' }],
        robots: 'index, follow',
        alternates: {
          canonical: `https://www.imadkhan.online/en/blogs/${slug}`,
          languages: {
            'en': `https://www.imadkhan.online/en/blogs/${slug}`,
            'ar': `https://www.imadkhan.online/ar/blogs/${slug}`,
          },
        },
        openGraph: {
          title: blog.title?.en || 'Blog',
          description: blog.description?.en || 'Technical blog article',
          url: `https://www.imadkhan.online/en/blogs/${slug}`,
          siteName: 'Imad Hussain Khan Portfolio',
          images: blog.images?.[0] ? [{ url: blog.images[0].asset?.url, width: 1200, height: 630, alt: blog.title?.en }] : [],
          locale: 'en_US',
          type: 'article',
          publishedTime: blog.publishedAt,
          authors: ['Imad Hussain Khan'],
          tags: blog.categories?.map(cat => cat.en) || [],
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title?.en || 'Blog',
          description: blog.description?.en || 'Technical blog article',
          images: blog.images?.[0]?.asset?.url || 'https://www.imadkhan.online/logo.png',
        },
      };
    }
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
  }

  // Fallback metadata
  return {
    title: `Blog | Imad Hussain Khan Technical Blog`,
    description: 'Technical blog article about web development and programming',
    keywords: ['Technical Blog', 'Web Development', 'Programming'],
    authors: [{ name: 'Imad Hussain Khan' }],
    robots: 'index, follow',
  };
}

// Main page component
const BlogDetailPage = async ({ params }) => {
  const { slug } = await params;
  try {
    // Try to fetch from Sanity
    const { blog, relatedBlogs } = await client.fetch(`
      {
        "blog": *[_type == "blog" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          categories,
          sections,
          images[]{
            asset->{
              url,
              _id,
              metadata {
                dimensions
              }
            }
          },
          conclusion,
          publishedAt,
          readTime,
          featured
        },
        "relatedBlogs": *[_type == "blog" && slug.current != $slug] | order(publishedAt desc)[0...3] {
          _id,
          title,
          slug,
          description,
          categories,
          publishedAt,
          readTime
        }
      }
    `, { slug });

    return <BlogDetails
      blog={blog}
      relatedBlogs={relatedBlogs}
      language="en"
      slug={slug}
    />;
  } catch (error) {
    console.error('Error fetching blog:', error);

    // Return component with fallback data
    return <BlogDetails
      blog={null}
      relatedBlogs={[]}
      language="en"
      slug={slug}
    />;
  }
};

export default BlogDetailPage;

// Viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};