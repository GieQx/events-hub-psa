
import cmsService from "@/services/cmsService";
import { format, addDays, addMonths } from "date-fns";

/**
 * Seeds the database with initial data if it's empty
 */
export const seedDatabaseIfEmpty = () => {
  // Only seed if no events exist
  const existingEvents = cmsService.events.getAll();
  if (existingEvents.length > 0) {
    return;
  }

  // Initialize home content if it doesn't exist
  if (!cmsService.homeContent.get()) {
    cmsService.homeContent.update({
      heroTitle: "Discover Premier Conventions for Professionals",
      heroSubtitle: "Join us at these industry-leading events featuring experts, cutting-edge insights, and valuable networking opportunities.",
      heroBackgroundStyle: "bg-gradient-to-r from-blue-500 to-purple-600",
      upcomingEventsTitle: "Mark Your Calendar",
      upcomingEventsSubtitle: "Don't miss these opportunities to connect with industry leaders and enhance your professional skills",
      featuredEvents: [],
      testimonials: [
        {
          id: crypto.randomUUID(),
          text: "The National Convention on Civil Registration was an eye-opening experience. The speakers were excellent and the networking opportunities were invaluable for my career growth.",
          author: "Sarah Johnson",
          position: "Director of Operations",
          company: "DataTech Solutions"
        },
        {
          id: crypto.randomUUID(),
          text: "I've attended many conventions, but the National Statistics Month stood out for its excellent organization and the quality of information presented. Will definitely attend next year!",
          author: "Michael Chen",
          position: "Lead Data Scientist",
          company: "AnalyticsHub"
        },
        {
          id: crypto.randomUUID(),
          text: "The Community-Based Monitoring System convention provided practical tools and strategies that I've successfully implemented in my organization. Highly recommended!",
          author: "James Rodriguez",
          position: "Community Engagement Manager",
          company: "Civic Innovations"
        }
      ]
    });
  }

  // Seed 10 events
  const events = [
    {
      id: "nccrvs",
      title: "National Convention on Civil Registration and Vital Statistics",
      shortName: "NCCRVS",
      description: "Explore cutting-edge techniques and best practices in registration and verification systems.",
      longDescription: "Join industry leaders and experts at the National Convention on Civil Registration and Vital Statistics (NCCRVS) for three days of immersive learning, networking, and collaboration. Discover the latest advancements in identity verification, fraud prevention, and seamless registration experiences. This premier event brings together professionals from technology, security, and user experience to shape the future of verification systems.",
      date: "June 15-17, 2026",
      location: "San Francisco, CA",
      venueName: "Moscone Center",
      venueAddress: "747 Howard St, San Francisco, CA 94103",
      venueDescription: "The Moscone Center is San Francisco's premier convention and exhibition complex. Located in the heart of the city, this world-class facility offers state-of-the-art amenities and is within walking distance of hotels, shopping, dining, and cultural attractions.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1597406921474!2d-122.40277032357242!3d37.78393571231892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e97646f7%3A0x72c5cb98814ace6!2sMoscone%20Center!5e0!3m2!1sen!2sus!4v1712524217753!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      color: "bg-rvs-primary",
      gradientClass: "hero-gradient-rvs",
      eventStartDate: format(addMonths(new Date(), 2), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 2), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: true
    },
    {
      id: "cbms",
      title: "National Convention on Community-Based Monitoring System",
      shortName: "CBMS",
      description: "Strengthening community connections through innovative engagement strategies and tools.",
      longDescription: "The National Convention on Community-Based Monitoring System (CBMS) is dedicated to building stronger, more resilient communities through innovative engagement approaches. Learn from community leaders, government officials, and engagement experts about effective strategies for fostering inclusive participation, leveraging technology for outreach, and measuring the impact of community initiatives.",
      date: "September 8-10, 2026",
      location: "Chicago, IL",
      venueName: "McCormick Place",
      venueAddress: "2301 S King Dr, Chicago, IL 60616",
      venueDescription: "McCormick Place is North America's largest convention center, offering breathtaking views of Lake Michigan and Chicago's skyline. With state-of-the-art facilities and excellent accessibility, it's the perfect venue for this collaborative event.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.1474088349696!2d-87.61901192348775!3d41.85121097124183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2b6308ed849f%3A0xb8c3d3991df3878!2sMcCormick%20Place!5e0!3m2!1sen!2sus!4v1712524333487!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      color: "bg-bms-primary",
      gradientClass: "hero-gradient-bms",
      eventStartDate: format(addMonths(new Date(), 3), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 3), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: true
    },
    {
      id: "nsm",
      title: "National Statistics Month",
      shortName: "NSM",
      description: "Celebrating excellence in mathematics education and statistical representation.",
      longDescription: "The National Statistics Month (NSM) brings together educators, media professionals, and mathematicians to celebrate and promote excellence in mathematics education and its representation in media. This unique event features award ceremonies recognizing outstanding contributions, workshops on effective teaching methods, and discussions on improving mathematical literacy through various media channels.",
      date: "November 20-22, 2026",
      location: "Boston, MA",
      venueName: "Boston Convention and Exhibition Center",
      venueAddress: "415 Summer St, Boston, MA 02210",
      venueDescription: "The Boston Convention and Exhibition Center is an architectural landmark offering breathtaking views of Boston Harbor. This modern facility provides a sophisticated environment for learning and networking, with excellent technical capabilities and amenities.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.856618695702!2d-71.04539792346848!3d42.34655547119171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a828ab98a73%3A0x1ff67a39da02a6c4!2sBoston%20Convention%20and%20Exhibition%20Center!5e0!3m2!1sen!2sus!4v1712524384147!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      color: "bg-sm-primary",
      gradientClass: "hero-gradient-sm",
      eventStartDate: format(addMonths(new Date(), 4), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 4), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    },
    {
      id: "ncs",
      title: "National Convention on Statistics",
      shortName: "NCS",
      description: "Driving global impact and social responsibility through collaborative action.",
      longDescription: "The National Convention on Statistics (NCS) is a platform for leaders, innovators, and change-makers committed to advancing statistical knowledge and methodologies. Through interactive sessions, case studies, and networking opportunities, participants will gain insights into successful data-driven initiatives, form partnerships for collaborative projects, and develop actionable strategies for making informed decisions.",
      date: "March 5-7, 2027",
      location: "New York, NY",
      venueName: "Javits Center",
      venueAddress: "429 11th Ave, New York, NY 10001",
      venueDescription: "The Jacob K. Javits Convention Center is a LEED Silver-certified facility committed to sustainability. Located in Manhattan's West Side, the venue features innovative green technology, including a 7-acre green roof that serves as a wildlife habitat and energy-efficient systems that align perfectly with the forum's focus on sustainability.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2223977949997!2d-74.00398822352826!3d40.75744207127307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b419563e45%3A0x7e2abf5a7e5ed160!2sJavits%20Center!5e0!3m2!1sen!2sus!4v1712524423794!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      color: "bg-cs-primary",
      gradientClass: "hero-gradient-cs",
      eventStartDate: format(addMonths(new Date(), 5), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 5), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    },
    {
      id: "dgrs",
      title: "Digital Government Research Symposium",
      shortName: "DGRS",
      description: "Exploring digital transformation in government services and citizen engagement.",
      longDescription: "The Digital Government Research Symposium brings together government officials, technologists, and researchers to explore innovative approaches to digital transformation in public services. Attendees will discover cutting-edge technologies, best practices, and strategies for enhancing citizen engagement, improving service delivery, and fostering data-driven decision making in government operations.",
      date: "July 10-12, 2026",
      location: "Austin, TX",
      venueName: "Austin Convention Center",
      venueAddress: "500 E Cesar Chavez St, Austin, TX 78701",
      venueDescription: "The Austin Convention Center is a versatile venue in the heart of downtown Austin, offering state-of-the-art technology and sustainable operations. Its central location provides easy access to the city's renowned music scene, culinary delights, and cultural attractions.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.892222047336!2d-97.74022892372243!3d30.263044381799623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a11929b27f%3A0x89f4c49b48191f!2sAustin%20Convention%20Center!5e0!3m2!1sen!2sus!4v1712524468283!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      color: "bg-rvs-primary",
      gradientClass: "hero-gradient-rvs",
      eventStartDate: format(addMonths(new Date(), 6), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 6), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: true
    },
    {
      id: "sdgf",
      title: "Sustainable Development Goals Forum",
      shortName: "SDGF",
      description: "Accelerating progress towards the UN Sustainable Development Goals through data and statistics.",
      longDescription: "The Sustainable Development Goals Forum is dedicated to advancing progress towards the United Nations' 17 Sustainable Development Goals through data-driven approaches and statistical analysis. This collaborative event brings together policy makers, statisticians, and sustainability experts to share insights, methodologies, and tools for measuring, tracking, and achieving sustainable development targets.",
      date: "October 5-7, 2026",
      location: "Denver, CO",
      venueName: "Colorado Convention Center",
      venueAddress: "700 14th St, Denver, CO 80202",
      venueDescription: "The Colorado Convention Center is an expansive facility in downtown Denver, featuring modern design and amenities. With its signature blue bear sculpture and stunning mountain views, it provides an inspiring backdrop for discussions on sustainable development and environmental stewardship.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.8254036703985!2d-104.9966632236522!3d39.74284110371374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78d76172fcc7%3A0xb723c8bbf8d71403!2sColorado%20Convention%20Center!5e0!3m2!1sen!2sus!4v1712524524659!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      color: "bg-bms-primary",
      gradientClass: "hero-gradient-bms",
      eventStartDate: format(addMonths(new Date(), 7), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 7), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    },
    {
      id: "hsic",
      title: "Health Statistics and Information Conference",
      shortName: "HSIC",
      description: "Advancing healthcare through improved data collection, analysis, and reporting methodologies.",
      longDescription: "The Health Statistics and Information Conference focuses on enhancing health outcomes through improved data collection, analysis, and reporting. This specialized event connects healthcare professionals, data scientists, and policy makers to explore innovations in health informatics, epidemiology, and public health surveillance systems. Attendees will gain insights into leveraging data for evidence-based decision making in healthcare policy and practice.",
      date: "January 15-17, 2027",
      location: "Miami, FL",
      venueName: "Miami Beach Convention Center",
      venueAddress: "1901 Convention Center Dr, Miami Beach, FL 33139",
      venueDescription: "The Miami Beach Convention Center is a world-class facility recently renovated to incorporate cutting-edge technology and sustainable design principles. Its vibrant South Beach location offers attendees a perfect blend of professional development and relaxation opportunities.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.034170472312!2d-80.13847552396328!3d25.79469161365307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b4951b3cdb1d%3A0x933d516f60dce677!2sMiami%20Beach%20Convention%20Center!5e0!3m2!1sen!2sus!4v1712524578267!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      color: "bg-sm-primary",
      gradientClass: "hero-gradient-sm",
      eventStartDate: format(addMonths(new Date(), 8), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 8), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    },
    {
      id: "aesr",
      title: "Annual Economic Statistics Review",
      shortName: "AESR",
      description: "Comprehensive analysis of economic trends, methodologies, and forecasting techniques.",
      longDescription: "The Annual Economic Statistics Review provides a forum for economists, statisticians, and policy makers to examine economic trends, refine methodologies, and improve forecasting techniques. Sessions cover topics like GDP measurement, inflation calculation, labor market analysis, and international trade statistics. Participants will engage in discussions about enhancing the accuracy, timeliness, and relevance of economic indicators for policy formation and business planning.",
      date: "February 22-24, 2027",
      location: "Washington, DC",
      venueName: "Walter E. Washington Convention Center",
      venueAddress: "801 Mt Vernon Pl NW, Washington, DC 20001",
      venueDescription: "The Walter E. Washington Convention Center is a prestigious venue in the nation's capital, offering sophisticated facilities and technology. Its central location provides convenient access to federal agencies, think tanks, and cultural institutions, making it an ideal setting for discussions on economic policy and statistics.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.1759789424846!2d-77.02543392369042!3d38.90495457057134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b795526febfb%3A0x92a16a2cd5f425ef!2sWalter%20E.%20Washington%20Convention%20Center!5e0!3m2!1sen!2sus!4v1712524625395!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1554469384-e58fac937bb4?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      color: "bg-cs-primary",
      gradientClass: "hero-gradient-cs",
      eventStartDate: format(addMonths(new Date(), 9), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 9), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    },
    {
      id: "mwds",
      title: "Modern Workforce Data Summit",
      shortName: "MWDS",
      description: "Exploring the future of work through comprehensive labor statistics and workforce trends.",
      longDescription: "The Modern Workforce Data Summit examines transformations in employment patterns and workforce development through the lens of robust statistical analysis. Industry leaders, labor economists, and HR professionals gather to discuss gathering, analyzing, and applying workforce data to address challenges like skills gaps, remote work trends, automation impact, and demographic shifts in the labor market.",
      date: "April 8-10, 2027",
      location: "Seattle, WA",
      venueName: "Washington State Convention Center",
      venueAddress: "705 Pike St, Seattle, WA 98101",
      venueDescription: "The Washington State Convention Center provides a contemporary venue in the heart of Seattle's vibrant downtown. With its commitment to sustainability and proximity to the city's tech hub, it offers an inspiring environment for discussions about the future of work and workforce data analysis.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.8070232041186!2d-122.33485792342101!3d47.61155217918635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab5090f3cc7%3A0x43d34940cb6c883c!2sWashington%20State%20Convention%20Center!5e0!3m2!1sen!2sus!4v1712524669611!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      color: "bg-rvs-primary",
      gradientClass: "hero-gradient-rvs",
      eventStartDate: format(addMonths(new Date(), 10), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 10), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    },
    {
      id: "edsc",
      title: "Educational Data Science Conference",
      shortName: "EDSC",
      description: "Leveraging data analytics to enhance educational outcomes and policy development.",
      longDescription: "The Educational Data Science Conference brings together educators, researchers, and policy makers to explore how data science can transform education systems. Sessions cover topics like learning analytics, educational measurement, research methodologies, and evidence-based policy making. Participants will learn about cutting-edge approaches to collecting, analyzing, and interpreting educational data to improve teaching practices and student outcomes.",
      date: "May 17-19, 2027",
      location: "Phoenix, AZ",
      venueName: "Phoenix Convention Center",
      venueAddress: "100 N 3rd St, Phoenix, AZ 85004",
      venueDescription: "The Phoenix Convention Center is a modern facility in downtown Phoenix featuring sustainable design and state-of-the-art technology. Its desert-inspired architecture and commitment to environmental responsibility create an appropriate setting for discussions about educational innovation and data-informed decision making.",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.9366942868946!2d-112.07245502379267!3d33.44857508077654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b1291d293c167%3A0x2d2d7354cbdf4c55!2sPhoenix%20Convention%20Center!5e0!3m2!1sen!2sus!4v1712524716115!5m2!1sen!2sus",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&auto=format&fit=crop&q=80",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      color: "bg-bms-primary",
      gradientClass: "hero-gradient-bms",
      eventStartDate: format(addMonths(new Date(), 11), "yyyy-MM-dd'T'09:00:00"),
      eventEndDate: format(addMonths(addDays(new Date(), 2), 11), "yyyy-MM-dd'T'17:00:00"),
      published: true,
      featured: false
    }
  ];

  // Add events to CMS
  events.forEach(event => {
    cmsService.events.create(event);
  });

  // Create default speakers
  const speakers = [
    {
      id: crypto.randomUUID(),
      eventId: "nccrvs",
      name: "Dr. Sarah Johnson",
      role: "Director of Data Systems",
      company: "National Registration Bureau",
      bio: "Dr. Sarah Johnson is a leading expert in civil registration systems with over 15 years of experience implementing digital solutions for government agencies. She has led major digital transformation initiatives in multiple countries and is a recognized authority on privacy-preserving identity verification systems.",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "cbms",
      name: "Michael Wong",
      role: "Community Engagement Specialist",
      company: "Urban Development Institute",
      bio: "Michael Wong has pioneered innovative approaches to community-based monitoring systems across diverse urban environments. His work focuses on empowering communities to collect, analyze and utilize data for local decision-making. He has successfully implemented monitoring frameworks in over 50 communities nationwide.",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "nsm",
      name: "Dr. Emily Chen",
      role: "Professor of Statistics",
      company: "National University",
      bio: "Dr. Emily Chen is an award-winning statistics educator who has transformed how mathematics is taught at both undergraduate and graduate levels. Her research focuses on making complex statistical concepts accessible to diverse learning audiences. She has published extensively on pedagogical approaches for statistics education.",
      photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "ncs",
      name: "James Rodriguez",
      role: "Chief Statistician",
      company: "Federal Statistics Office",
      bio: "James Rodriguez leads the Federal Statistics Office in designing and implementing national statistical programs that inform policy across government departments. He champions modernization of statistical methodologies and has been instrumental in advancing standards for open data and interoperability in national statistics.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "dgrs",
      name: "Olivia Martinez",
      role: "Digital Transformation Director",
      company: "Government Technology Agency",
      bio: "Olivia Martinez has led groundbreaking initiatives to modernize government digital services across multiple agencies. Her expertise spans system architecture, user experience design, and large-scale implementation of citizen-centric platforms. She is passionate about using technology to improve government transparency and accessibility.",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "sdgf",
      name: "Dr. Samuel Okafor",
      role: "Sustainable Development Advisor",
      company: "International Statistics Institute",
      bio: "Dr. Samuel Okafor specializes in measuring progress toward the UN Sustainable Development Goals through robust statistical frameworks. He has advised governments and international organizations on establishing monitoring systems that track environmental, social, and economic sustainability metrics at national and regional levels.",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "hsic",
      name: "Dr. Sophia Kim",
      role: "Health Informatics Director",
      company: "National Health Statistics Center",
      bio: "Dr. Sophia Kim leads initiatives to enhance health data collection and analysis nationwide. Her work has revolutionized how healthcare metrics are gathered and utilized, improving public health surveillance systems and clinical outcomes tracking. She is a pioneer in integrating diverse data sources for comprehensive health monitoring.",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "aesr",
      name: "Dr. Robert Chen",
      role: "Chief Economist",
      company: "Central Bank",
      bio: "Dr. Robert Chen oversees economic statistics and analysis that guide national monetary policy. With expertise in macroeconomic forecasting and financial statistics, he has enhanced methodologies for measuring economic activity in the digital age. He previously served as a senior economist at international financial institutions.",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "mwds",
      name: "Jennifer Harris",
      role: "Workforce Analytics Leader",
      company: "Bureau of Labor Statistics",
      bio: "Jennifer Harris has pioneered innovative approaches to measuring emerging workforce trends in the gig economy and remote work environments. Her statistical models help policy makers understand changing employment patterns and skill requirements. She specializes in combining traditional survey methodologies with new data sources.",
      photoUrl: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=400&auto=format&fit=crop&q=80"
    },
    {
      id: crypto.randomUUID(),
      eventId: "edsc",
      name: "Dr. Marcus Johnson",
      role: "Education Research Director",
      company: "Center for Educational Statistics",
      bio: "Dr. Marcus Johnson leads research initiatives that apply data science techniques to educational assessment and policy analysis. His work has transformed how student achievement is measured and analyzed across diverse demographic groups. He advocates for evidence-based approaches to educational reform and resource allocation.",
      photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&auto=format&fit=crop&q=80"
    }
  ];

  // Create sample sessions for each event
  events.forEach(event => {
    // Find the corresponding speaker for this event
    const eventSpeaker = speakers.find(speaker => speaker.eventId === event.id);
    const speakerId = eventSpeaker ? eventSpeaker.id : null;
    
    // Initialize the speakers management
    if (!cmsService.speakers) {
      cmsService.speakers = {
        items: [],
        getAll: function() {
          return this.items;
        },
        getByEvent: function(eventId) {
          return this.items.filter(item => item.eventId === eventId);
        },
        get: function(id) {
          return this.items.find(item => item.id === id);
        },
        create: function(data) {
          this.items.push(data);
          return data;
        },
        update: function(id, data) {
          const index = this.items.findIndex(item => item.id === id);
          if (index !== -1) {
            this.items[index] = data;
            return data;
          }
          return null;
        },
        delete: function(id) {
          const index = this.items.findIndex(item => item.id === id);
          if (index !== -1) {
            this.items.splice(index, 1);
            return true;
          }
          return false;
        }
      };
    }
    
    // Add the speaker
    if (eventSpeaker) {
      cmsService.speakers.create(eventSpeaker);
    }
    
    // Initialize the sessions management
    if (!cmsService.sessions) {
      cmsService.sessions = {
        items: [],
        getAll: function() {
          return this.items;
        },
        getByEvent: function(eventId) {
          return this.items.filter(item => item.eventId === eventId);
        },
        get: function(id) {
          return this.items.find(item => item.id === id);
        },
        create: function(data) {
          this.items.push(data);
          return data;
        },
        update: function(id, data) {
          const index = this.items.findIndex(item => item.id === id);
          if (index !== -1) {
            this.items[index] = data;
            return data;
          }
          return null;
        },
        delete: function(id) {
          const index = this.items.findIndex(item => item.id === id);
          if (index !== -1) {
            this.items.splice(index, 1);
            return true;
          }
          return false;
        }
      };
    }
    
    // Create sessions using the event date as reference
    const eventDate = new Date(event.eventStartDate);
    
    // Day 1 Sessions
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Registration and Welcome Breakfast",
      description: "Check-in, collect your badge, and enjoy a continental breakfast while networking with fellow attendees.",
      start_time: format(new Date(eventDate).setHours(8, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(eventDate).setHours(9, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      day_label: "Day 1",
      location: "Main Lobby"
    });
    
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Opening Keynote Address",
      description: "Join us for an inspiring keynote that sets the tone for the conference and explores emerging trends in the field.",
      start_time: format(new Date(eventDate).setHours(9, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(eventDate).setHours(10, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      speaker_id: speakerId,
      day_label: "Day 1",
      location: "Grand Ballroom"
    });
    
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Morning Breakout Sessions",
      description: "Choose from multiple specialized tracks covering different aspects of the field.",
      start_time: format(new Date(eventDate).setHours(10, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(eventDate).setHours(12, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      day_label: "Day 1",
      location: "Various Meeting Rooms"
    });
    
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Networking Lunch",
      description: "Enjoy a catered lunch while connecting with peers and speakers.",
      start_time: format(new Date(eventDate).setHours(12, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(eventDate).setHours(13, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      day_label: "Day 1",
      location: "Dining Hall"
    });
    
    // Day 2 Sessions
    const day2Date = addDays(eventDate, 1);
    
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Interactive Workshops",
      description: "Hands-on sessions where you'll gain practical skills and insights from industry experts.",
      start_time: format(new Date(day2Date).setHours(9, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(day2Date).setHours(11, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      day_label: "Day 2",
      location: "Workshop Rooms A & B"
    });
    
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Expert Panel Discussion",
      description: "Industry leaders debate current challenges and future directions in an engaging moderated format.",
      start_time: format(new Date(day2Date).setHours(11, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(day2Date).setHours(12, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      day_label: "Day 2",
      location: "Grand Ballroom"
    });
    
    // Day 3 Sessions
    const day3Date = addDays(eventDate, 2);
    
    cmsService.sessions.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      title: "Closing Keynote and Awards",
      description: "Final inspirational address and recognition of outstanding contributions in the field.",
      start_time: format(new Date(day3Date).setHours(15, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      end_time: format(new Date(day3Date).setHours(16, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      day_label: "Day 3",
      location: "Grand Ballroom"
    });
    
    // Create marquee items
    if (!cmsService.marqueeItems) {
      cmsService.marqueeItems = {
        items: [],
        getAll: function() {
          return this.items;
        },
        getByEvent: function(eventId) {
          return this.items.filter(item => item.eventId === eventId);
        },
        create: function(data) {
          this.items.push(data);
          return data;
        }
      };
    }
    
    // Add marquee items for the event
    cmsService.marqueeItems.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      text: `Registration for ${event.title} is now open!`,
      link: `/events/${event.id}`,
      priority: 1
    });
    
    cmsService.marqueeItems.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      text: `New speakers announced for ${event.shortName}. Check the lineup!`,
      link: `/events/${event.id}#speakers`,
      priority: 2
    });
    
    cmsService.marqueeItems.create({
      id: crypto.randomUUID(),
      eventId: event.id,
      text: `Early bird pricing ends soon for ${event.shortName}. Register today!`,
      link: `/events/${event.id}`,
      priority: 3
    });
  });

  console.log("Database seeded with 10 events and related data");
};
