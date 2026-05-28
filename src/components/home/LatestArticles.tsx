import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const MOCK_ARTICLES = [
 {
 id: 1,
 title: "10 Must-Read Fantasy Epics for the Summer",
 date: "May 15, 2026",
 image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop",
 excerpt: "Dive into new worlds with our curated list of the best fantasy epics released this season. From magic systems to sprawling empires, these books have it all.",
 category: "Recommendations",
 },
 {
 id: 2,
 title: "How to Build a Sustainable Reading Habit",
 date: "May 10, 2026",
 image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
 excerpt: "Struggling to find time to read? Discover 5 actionable tips to help you build a consistent reading habit, even on your busiest days.",
 category: "Tips & Guides",
 },
 {
 id: 3,
 title: "Behind the Pages: Interview with Sarah J. Maas",
 date: "May 02, 2026",
 image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
 excerpt: "We sat down with the bestselling author to discuss her latest release, her writing process, and what fans can expect next from her sprawling universe.",
 category: "Author Interviews",
 },
];

export function LatestArticles() {
 return (
 <section className="py-20 bg-muted/30">
 <div className="container mx-auto px-4">
 <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
 Latest Articles
 </h2>
 <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
 Stay updated with our latest news, author interviews, and reading recommendations.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {MOCK_ARTICLES.map((article) => (
 <article 
 key={article.id} 
 className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group flex flex-col"
 >
 <Link href="#" className="relative h-64 w-full overflow-hidden block">
 <Image
 src={article.image}
 alt={article.title}
 fill
 className="object-cover group-hover:scale-105 transition-transform duration-500"
 />
 <div className="absolute top-4 left-4 bg-background text-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
 {article.category}
 </div>
 </Link>
 
 <div className="p-6 md:p-8 flex flex-col flex-1">
 <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
 <Calendar className="w-4 h-4" />
 <time>{article.date}</time>
 </div>
 
 <Link href="#" className="hover:text-brand-primary transition-colors mb-3">
 <h3 className="text-xl md:text-2xl font-bold text-card-foreground leading-tight line-clamp-2">
 {article.title}
 </h3>
 </Link>
 
 <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
 {article.excerpt}
 </p>
 
 <Link 
 href="#" 
 className="inline-flex items-center font-bold text-primary hover:text-brand-primary transition-colors group/link mt-auto"
 >
 Read Article
 <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
 </Link>
 </div>
 </article>
 ))}
 </div>
 </div>
 </section>
 );
}
