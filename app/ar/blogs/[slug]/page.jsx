import React from 'react';
import { client } from '@/sanity/lib/client';
import dynamicImport from 'next/dynamic';

const BlogDetails = dynamicImport(() => import('@/components/Blogs/BlogDetails'), {
  loading: () => (
    <section className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-cyan-400 font-mono">جاري تحميل المقالة...</p>
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
        title: `${blog.title?.ar || 'مقالة'} | مدونة عماد حسين خان التقنية`,
        description: blog.description?.ar || 'مقالة تقنية',
        keywords: [
          blog.categories?.[0]?.ar || 'مدونة',
          'المدونة التقنية',
          'تطوير الويب',
          'البرمجة',
          'الدروس'
        ],
        authors: [{ name: 'عماد حسين خان' }],
        robots: 'index, follow',
        alternates: {
          canonical: `https://www.imadkhan.online/ar/blogs/${slug}`,
          languages: {
            'en': `https://www.imadkhan.online/en/blogs/${slug}`,
            'ar': `https://www.imadkhan.online/ar/blogs/${slug}`,
          },
        },
        openGraph: {
          title: blog.title?.ar || 'مقالة',
          description: blog.description?.ar || 'مقالة تقنية',
          url: `https://www.imadkhan.online/ar/blogs/${slug}`,
          siteName: 'موقع محفظة عماد حسين خان',
          images: blog.images?.[0] ? [{ url: blog.images[0].asset?.url, width: 1200, height: 630, alt: blog.title?.ar }] : [],
          locale: 'ar_SA',
          type: 'article',
          publishedTime: blog.publishedAt,
          authors: ['عماد حسين خان'],
          tags: blog.categories?.map(cat => cat.ar) || [],
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title?.ar || 'مقالة',
          description: blog.description?.ar || 'مقالة تقنية',
          images: blog.images?.[0]?.asset?.url || 'https://www.imadkhan.online/logo.png',
        },
      };
    }
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
  }

  // Fallback metadata
  return {
    title: `المدونة | مدونة عماد حسين خان التقنية`,
    description: 'مقالة تقنية حول تطوير الويب والبرمجة',
    keywords: ['المدونة التقنية', 'تطوير الويب', 'البرمجة'],
    authors: [{ name: 'عماد حسين خان' }],
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
      language="ar"
      slug={slug}
    />;
  } catch (error) {
    console.error('Error fetching blog:', error);

    // Return component with fallback data
    return <BlogDetails
      blog={null}
      relatedBlogs={[]}
      language="ar"
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