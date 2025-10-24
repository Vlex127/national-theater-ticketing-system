import Image from "next/image";

export default function PayoutPage() {
  return (<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>National Theater - Payment</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700;800;900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {\n            background-color: #121212;\n        }\n        .material-symbols-outlined {\n            font-variation-settings:\n            'FILL' 0,\n            'wght' 400,\n            'GRAD' 0,\n            'opsz' 24\n        }\n    "
    }}
  />
  <div
    className="relative flex h-auto min-h-screen w-full flex-col dark group/design-root overflow-x-hidden"
    style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
  >
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[1280px] flex-1">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293829] px-4 md:px-10 py-3">
            <div className="flex items-center gap-4 text-white">
              <div className="size-6 text-primary">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-poppins">
                National Theater
              </h2>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-8">
              <div className="flex items-center gap-9">
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
                  Events
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
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  data-alt="User profile picture"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYhlua7YSo-nSneTJM7ciup7aluqUqwW5eCjhsz5DebYvF3DjqsSvwdsQP0nl5OFfVWQqb5mY8kdxpW2T0_KY4Jr3gtT1O_ohau-wrGtGiaWoRSYIUKTCLPeiGNkwHmOvvmhQfeYlCf1mYr4MVqwG2OIFxesuiv_WSdDnNikoFJdc4j3-C0_QpsNle3UXuKExov3UjJL60e3CAZTYFU-DvObytjRsiyBBN51wy-UrugI2OAH-YF0dqJm8Timc6efFyi8zBMB4JndY")'
                  }}
                />
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 md:px-10 py-8">
            <div className="flex flex-wrap gap-2 p-4">
              <a
                className="text-[#9eb79e] text-base font-medium leading-normal font-dm-sans"
                href="#"
              >
                Select Seats
              </a>
              <span className="text-[#9eb79e] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-primary text-base font-bold leading-normal font-dm-sans">
                Payment
              </span>
              <span className="text-[#9eb79e] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-[#9eb79e] text-base font-medium leading-normal font-dm-sans">
                Confirmation
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 font-poppins">
                Complete Your Payment
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold font-poppins mb-4">
                    Payment Method
                  </h3>
                  <div className="rounded-lg bg-[#1c261c] p-4">
                    <div className="flex flex-col space-y-4">
                      <label className="flex items-center space-x-3 p-4 rounded-lg border border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer transition-colors">
                        <input
                          defaultChecked=""
                          className="form-radio text-primary bg-transparent border-gray-600 focus:ring-primary"
                          name="payment_method"
                          type="radio"
                          defaultValue="card"
                        />
                        <span className="text-white font-medium">
                          Debit Card
                        </span>
                      </label>
                      <div className="space-y-4 pl-8" id="card-details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-400 mb-1"
                              htmlFor="card-name"
                            >
                              Name on Card
                            </label>
                            <input
                              className="w-full bg-[#293829] border-gray-600 rounded-md text-white focus:ring-primary focus:border-primary"
                              id="card-name"
                              type="text"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-400 mb-1"
                              htmlFor="card-number"
                            >
                              Card Number
                            </label>
                            <input
                              className="w-full bg-[#293829] border-gray-600 rounded-md text-white focus:ring-primary focus:border-primary"
                              id="card-number"
                              placeholder="XXXX XXXX XXXX XXXX"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-400 mb-1"
                              htmlFor="expiry-date"
                            >
                              Expiry Date
                            </label>
                            <input
                              className="w-full bg-[#293829] border-gray-600 rounded-md text-white focus:ring-primary focus:border-primary"
                              id="expiry-date"
                              placeholder="MM/YY"
                              type="text"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-400 mb-1"
                              htmlFor="cvv"
                            >
                              CVV
                            </label>
                            <input
                              className="w-full bg-[#293829] border-gray-600 rounded-md text-white focus:ring-primary focus:border-primary"
                              id="cvv"
                              placeholder="XXX"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <label className="flex items-center space-x-3 p-4 rounded-lg border border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer transition-colors">
                        <input
                          className="form-radio text-primary bg-transparent border-gray-600 focus:ring-primary"
                          name="payment_method"
                          type="radio"
                          defaultValue="bank"
                        />
                        <span className="text-white font-medium">
                          Bank Transfer
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-4 rounded-lg border border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer transition-colors">
                        <input
                          className="form-radio text-primary bg-transparent border-gray-600 focus:ring-primary"
                          name="payment_method"
                          type="radio"
                          defaultValue="paystack"
                        />
                        <span className="text-white font-medium">Paystack</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button className="w-full sm:w-auto flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em] hover:bg-yellow-300 transition-colors">
                    Pay Now
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="material-symbols-outlined text-accent-green text-base">
                      lock
                    </span>
                    <span>SSL Secured &amp; PCI Compliant</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-[#1c261c] rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] p-6 space-y-6 sticky top-8">
                  <h3 className="text-xl font-bold font-poppins mb-4">
                    Order Summary
                  </h3>
                  <div className="p-4 @container">
                    <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start bg-[#1c261c]">
                      <div
                        className="w-full @xl:w-1/3 bg-center bg-no-repeat aspect-square @xl:aspect-auto @xl:h-32 bg-cover rounded-lg"
                        data-alt="The Lion King promotional image"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCp4dh5Zpk4sTGZRfgG3izE9LVohpAizxea_NXVARw5SQmlLCuDRxE3RZ6hyI8K91tGvSpszN9JAe_D6M5iXu4RrVi21K-UNbTWeOjV_caOBPyVgDkXFNMeXUeA-dv0QH9HZ1NoVFoAlalqlRjW1UqPeW4MD7k-pScv38CrOGEgANng9H-hcFf_USAwsXaQJbKgChMvtEJrErgyqh9GRd5TaaN3XkveXbGfJxJE7Hm5IVYbwn3gbqUzl63kkauzU2H2W_DSgAl24gk")'
                        }}
                      />
                      <div className="flex w-full min-w-0 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
                        <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-poppins">
                          The Lion King
                        </p>
                        <p className="text-[#9eb79e] text-sm font-normal leading-normal">
                          Sat, 24th July 2024 - 7:30 PM
                        </p>
                        <div className="flex flex-col gap-1 mt-2">
                          <p className="text-[#9eb79e] text-sm font-normal leading-normal">
                            National Theater, Lagos
                          </p>
                          <p className="text-[#9eb79e] text-sm font-normal leading-normal">
                            Balcony, Row E, Seats 12-14
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700" />
                  <div className="p-4">
                    <div className="flex justify-between gap-x-6 py-2">
                      <p className="text-[#9eb79e] text-sm font-normal leading-normal">
                        Subtotal
                      </p>
                      <p className="text-white text-sm font-normal leading-normal text-right">
                        ₦45,000
                      </p>
                    </div>
                    <div className="flex justify-between gap-x-6 py-2">
                      <p className="text-[#9eb79e] text-sm font-normal leading-normal">
                        Fees
                      </p>
                      <p className="text-white text-sm font-normal leading-normal text-right">
                        ₦2,000
                      </p>
                    </div>
                    <div className="border-t border-gray-700 my-2" />
                    <div className="flex justify-between gap-x-6 py-2">
                      <p className="text-white text-base font-bold leading-normal">
                        Total
                      </p>
                      <p className="text-primary text-base font-bold leading-normal text-right">
                        ₦47,000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="text-center py-6 border-t border-solid border-b-[#293829] mt-12">
            <div className="flex justify-center gap-6 text-sm text-[#9eb79e]">
              <a className="hover:text-primary" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary" href="#">
                Terms of Service
              </a>
              <a className="hover:text-primary" href="#">
                Customer Support
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</>

  ) 
}