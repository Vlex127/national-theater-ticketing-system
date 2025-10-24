import Image from "next/image";

export default function Home() {
  return (<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>National Theater, Nigeria</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
  <div className="relative flex h-auto min-h-screen w-full flex-col dark group/design-root overflow-x-hidden">
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#29382f] px-4 md:px-10 py-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-white">
                <div className="size-6">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" />
                    <path
                      clipRule="evenodd"
                      d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32428 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  National Theater, Nigeria
                </h2>
              </div>
              <nav className="hidden md:flex items-center gap-9">
                <a
                  className="text-white text-sm font-medium leading-normal"
                  href="/"
                >
                  Home
                </a>
                <a
                  className="text-white text-sm font-medium leading-normal"
                  href="#"
                >
                  Shows
                </a>
                <a
                  className="text-white text-sm font-medium leading-normal"
                  href="#"
                >
                  About
                </a>
                <a
                  className="text-white text-sm font-medium leading-normal"
                  href="#"
                >
                  Contact
                </a>
              </nav>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#9eb7a8] flex border-none bg-[#29382f] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#29382f] focus:border-none h-full placeholder:text-[#9eb7a8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    placeholder="Search"
                    defaultValue=""
                  />
                </div>
              </label>
            </div>
            
          </header>
          <main className="flex-grow">
            
            <div className="py-10">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div
                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                    data-alt="The National Arts Theatre, a multi-purpose national monument for the preservation, presentation and promotion of Nigerian arts and culture, located in Lagos."
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0EYhS5bCiNX-Z1FJsKlhKH8-985FSAgHsn32DFMW-AeSFwJOyDWaGAUa4CrlFmhRtfSxtnbYiNTiaIjbyFjQ8hAGSp5iKeQBZn75pQlQpXuESqmR7cbw4uzCjNWMkL8SJGjeT0NQ6RtMBN8xtTn6p7ltUMvJ-tzlJrqFCeEo297l7_bo_mbtSuTIw-LvmWo39ccfs1aSsr0Om3FqfI5o9W502I-fCWZVrAfxKVwhTwqLrXJE2iR0glRCArmIvTYNnl0oB9pvy0OY")'
                    }}
                  >
                    <div className="flex flex-col gap-4 text-center">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Experience the Magic of Nigerian Theater
                      </h1>
                      
                      <h2 className="text-white/90 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal max-w-2xl mx-auto">
                        Book your tickets now and witness unforgettable
                        performances at the heart of Nigerian culture.
                      </h2>
                     
                    </div>
                    <a href="/Ticket" >  
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                      <span className="truncate">Book Tickets</span>
                    </button> 
                      </a>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Upcoming Events
            </h2>
            <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-4">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#1c2620] shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-64">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col"
                    data-alt="Poster for FELA! The Musical"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhtbVFkgv5EwpP9RS3JWVOoi0KZl1BgefXXntLuWO5A8XUA2Yms8ksA5JXYewDBdJA_buf9GsK78Co7gLRKH0HuPeUPRARVy4BTE84KSiiXrNp-_v3m_9x2SLURwRdXXlrYjW7_s253J7NO51a7i11DkQIo8R4WP5BjJK2ZEYUWjRWv-FGvI4WIIf6g5pmhvFJUNii-xOq8RMchdlJBW0LtJxBzIiiFSdiOUb5AQzG1o2x23n4FnDMqBf4MQS8nOzaVwGgDkkBRvc")'
                    }}
                  />
                  <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                      <p className="text-white text-base font-medium leading-normal">
                        FELA! The Musical
                      </p>
                      <p className="text-[#9eb7a8] text-sm font-normal leading-normal">
                        The electrifying story of a legend.
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#29382f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4c3f] transition-colors">
                      <span className="truncate">View Details</span>
                    </button>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#1c2620] shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-64">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col"
                    data-alt="Poster for The Lion and the Jewel"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDyYxCKkIsziTyLRAA0iQe9Ld9YuljtgZecmTq0Oar-1bS6MwvdbYIFSu3EdRNsgz-w1_4R4DdUkMUUyBXsMeQgJqzh_2iHuemYiHtkC_q0I3dCV6aeqQ2wZzQb8NdjADPUF2FXWkl1JkW-X-I_s3tic_3iP-78sA_lO1c1rEgvK5SZpUfhJc1EcpIORPCC9PEb3xI_I3sUBBU7suwukLqocUU1880O2f_-67qz_UOiMAg-dlr1i8PyTE_OlmXQ1No8q0tNpmtkr8Q")'
                    }}
                  />
                  <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                      <p className="text-white text-base font-medium leading-normal">
                        The Lion and the Jewel
                      </p>
                      <p className="text-[#9eb7a8] text-sm font-normal leading-normal">
                        A classic Nigerian comedy.
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#29382f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4c3f] transition-colors">
                      <span className="truncate">View Details</span>
                    </button>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#1c2620] shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-64">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col"
                    data-alt="Poster for Wole Soyinka's 'Death and the King's Horseman'"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdKrpME_oUJAcdqtjz-V9D6z1nMwq7zKumdtV4s0khPXhXmh7NhGMvhITJ2z0ttRmaN9Gc_icZsBXUcd5_29uu1T6ytKs64O4ZzkI6jqHXcx18OYEiCK6U0cJXsNggF3rgBJlREdmfRALAtMcJsdjm4R27egea6a0C7Uu2cZY-WjGJaz2vWHpj52H0ky3CQLq3sNsjqZzhIYgdwzB6TZ9hPNbTCSENU3a6YEUa_I16cQEKaXG3_1uccI70cM0FHEHjn8lPnA6d-6E")'
                    }}
                  />
                  <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                      <p className="text-white text-base font-medium leading-normal">
                        Death and the King's Horseman
                      </p>
                      <p className="text-[#9eb7a8] text-sm font-normal leading-normal">
                        A timeless tale of honor and sacrifice.
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#29382f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4c3f] transition-colors">
                      <span className="truncate">View Details</span>
                    </button>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#1c2620] shadow-[0_0_4px_rgba(0,0,0,0.1)] min-w-64">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col"
                    data-alt="Poster for Moremi the Musical"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4CAkGxpRXugACeGr2YR4LHYeSjrlvrWN8RWnY6GOcMWKbUWbLxPipV1OvIrZu3p4mtm61JRYt1uxgdMmzoP4oM-nrBGzUd62vTA8ZTIG5BMiRY-JU777PmUoNbTLhFUk2l_5F8_HvkbNdurOcGg2Gtky5r20mPxzmo54XvdlAy8IpKRs701DVf8FEVRWRvga8IrkaTUUh1iAnnJf-uT9nvNDABNxNh2GWFOiSC7v3fIQjNOxOIwMArmmqd6OELjk0nFbhfs4v240")'
                    }}
                  />
                  <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                      <p className="text-white text-base font-medium leading-normal">
                        Moremi The Musical
                      </p>
                      <p className="text-[#9eb7a8] text-sm font-normal leading-normal">
                        A story of courage and sacrifice.
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#29382f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4c3f] transition-colors">
                      <span className="truncate">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                About the National Theater
              </h2>
              <p className="text-white/80 text-base font-normal leading-relaxed pb-3 pt-1 px-4">
                The National Arts Theatre is the primary centre for the
                performing arts in Nigeria. The monument is located in Iganmu,
                Surulere, Lagos. Its construction was completed in 1976 in
                preparation for the Festival of Arts and Culture (FESTAC) in
                1977. The collection of the National Gallery of Modern Nigerian
                Art is housed in a section of this building. It stands as a
                beacon of Nigerian culture, creativity, and national pride.
              </p>
            </div>
          </main>
          <footer className="mt-20 border-t border-solid border-b-[#29382f] px-4 md:px-10 py-6">
            <div className="flex justify-between items-center">
              <p className="text-[#9eb7a8] text-sm">
                © 2024 National Theater, Nigeria. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a
                  className="text-white/80 hover:text-white transition-colors"
                  href="#"
                >
                  FAQs
                </a>
                <a
                  className="text-white/80 hover:text-white transition-colors"
                  href="#"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</>

  );
}
