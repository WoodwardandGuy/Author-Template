import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, Award, Users, TreePine, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getCompanyInfo, getServiceAreasWithSlugs } from '@/lib/sanity.fetch';

const BASE_URL = 'https://www.treeprofessionalsofharrisburg.com';

export const metadata: Metadata = {
  title: 'About Us | Tree Professionals of Harrisburg',
  description:
    'Tree Professionals of Harrisburg is a licensed, insured, and family-owned tree care company serving Central PA. Expert tree removal, trimming, and 24/7 emergency services.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Tree Professionals of Harrisburg',
    description:
      'Licensed, insured, and family-owned tree care company serving Harrisburg, PA and surrounding areas.',
    url: `${BASE_URL}/about`,
    type: 'website',
  },
};

function generateBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
    ],
  };
}

export default async function AboutPage() {
  const [companyInfo, serviceAreas] = await Promise.all([
    getCompanyInfo(),
    getServiceAreasWithSlugs(),
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-tree-green/5 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tree-green mb-6">
            About Tree Professionals of Harrisburg
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Tree Professionals of Harrisburg is a family-owned tree care company rooted in Central Pennsylvania. We know the oaks, maples, and ash trees that line the streets of Midtown, the towering pines in the yards of Camp Hill, and the storm-battered hardwoods along the Susquehanna. This is our home, and taking care of its trees is what we do.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-tree-green/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-tree-green mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Central Pennsylvania throws a lot at its trees. Ice storms in January snap limbs off century-old oaks. Summer microbursts topple weakened ash trees — many already hollowed out by emerald ash borer — onto roofs, fences, and power lines. And every spring, homeowners discover that the tree they&apos;ve been ignoring for years is now leaning toward their neighbor&apos;s house.
            </p>
            <p>
              That&apos;s the work we do every day. Our crews climb, rig, and remove trees in tight residential lots where there&apos;s no room for error — between homes, over pools, around utility lines. When a straight drop isn&apos;t an option, we section trees piece by piece. When access is tight, we bring in crane-assisted removal. We&apos;ve taken down trees wedged between row homes in downtown Harrisburg and cleared storm-damaged timber on multi-acre properties in Dillsburg.
            </p>
            <p>
              But not every call is a removal. A lot of what we do is keeping healthy trees healthy — structural pruning to reduce wind load, deadwood removal so a branch doesn&apos;t come down on a car, and canopy thinning to let light reach the lawn underneath. We also get called in when something looks wrong: fungal growth at the base, bark splitting, or a tree that just stopped leafing out on one side. Our arborists can diagnose the issue and give you a straight answer on whether treatment makes sense or whether it&apos;s time for the tree to come down.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-tree-green mb-10 text-center">
            Why Harrisburg Trusts Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'We Carry Real Insurance',
                description:
                  'General liability and workers\' comp — not a discount policy with exclusions. If a limb hits your fence or a climber gets hurt, you\'re covered. We\'ll show you proof of insurance before we start.',
              },
              {
                icon: Clock,
                title: 'We Answer the Phone at 2 AM',
                description:
                  'When a storm drops a red oak on your driveway at midnight, you need someone who picks up. Our emergency crews have chainsaws loaded and trucks ready to roll year-round.',
              },
              {
                icon: Award,
                title: 'We Know These Trees',
                description:
                  'Pennsylvania hardwoods — red oak, sugar maple, tulip poplar, black walnut — each one behaves differently when you cut it. Our crews have the experience to read a tree before the first cut.',
              },
              {
                icon: Users,
                title: 'Family-Owned, Not a Call Center',
                description:
                  'When you call us, you talk to someone who works on trees — not a dispatcher at a national franchise. The person who gives your estimate is often the person running the crew.',
              },
              {
                icon: TreePine,
                title: 'We Save Trees When We Can',
                description:
                  'Not every problem tree needs to come down. Cabling, bracing, crown reduction, targeted pruning — we\'ll tell you if there\'s a way to keep the tree and solve the problem.',
              },
              {
                icon: Leaf,
                title: 'No Surprises on the Bill',
                description:
                  'You get a written estimate before we touch anything. The price we quote is the price you pay. We don\'t start cutting and then "discover" extra work.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-tree-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-tree-green" />
                </div>
                <h3 className="text-lg font-semibold text-tree-green-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-tree-green text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Our Commitment to the Community
          </h2>
          <div className="space-y-4 text-gray-100 leading-relaxed text-lg">
            <p>
              We clean up after ourselves. That sounds basic, but if you&apos;ve ever hired a tree company that left a yard full of chips, ruts in the lawn, and branches in the flower bed, you know it&apos;s not a given. When we leave, the only sign we were there is the stump — and we can grind that too.
            </p>
            <p>
              We also don&apos;t push unnecessary work. If you call us about a tree and it just needs a deadwood prune, we&apos;ll tell you that — even though a full removal would be a bigger invoice. Our business runs on referrals from people who trust us, and we&apos;d rather earn your recommendation than squeeze an extra dollar out of a job.
            </p>
            <p>
              Central PA is where we live, where our kids go to school, and where we want to keep working for a long time. That&apos;s why we do things right the first time.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      {serviceAreas.length > 0 && (
        <section id="service-areas" className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-tree-green mb-6">
              Proudly Serving Central Pennsylvania
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              From our base in Harrisburg, we serve homeowners and businesses across the greater Central PA region:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {serviceAreas.map((area) => (
                <Link
                  key={area.id}
                  href={area.slug ? `/areas/${area.slug}` : '#'}
                  className="bg-tree-green/5 rounded-lg px-4 py-3 text-center text-tree-green font-medium hover:bg-tree-green hover:text-white transition-colors"
                >
                  {area.name}, {area.state}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-accent-orange/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-tree-green mb-4">
            Got a Tree Problem?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Tell us what&apos;s going on and we&apos;ll come take a look — no cost, no obligation, no pressure. If we can help, we&apos;ll give you a clear price. If it&apos;s not something you need to address right now, we&apos;ll tell you that too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-accent-orange hover:bg-accent-orange-dark text-white h-12 px-8 text-lg"
            >
              <Link href="/#contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 text-lg border-tree-green text-tree-green hover:bg-tree-green hover:text-white"
            >
              <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                <Phone className="mr-2 h-5 w-5" />
                {companyInfo.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
