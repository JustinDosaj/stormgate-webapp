import { EnvelopeIcon } from "@heroicons/react/24/solid"

const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Builds', href: '/builds' },
      { name: 'News & Updates', href: '/news' },
      { name: 'Privacy', href: '/policy/privacy' },
      { name: 'Terms & Conditions', href: '/policy/terms' },
    ],
    social: [
      {
        name: 'X',
        href: '#',
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        ),
      },
    ],
  }
  
  export default function Footer() {

    var year = new Date().getFullYear()

    return (
      <footer className="bg-gray-800">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-14 sm:py-12 lg:px-8 space-y-6">
          <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-gray-500">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="h-6 w-6" />
              </a>
            ))}
          </div>

            <div className=" text-gray-400 text-sm flex justify-center">Contact us at 
              <span className="underline ml-1">stormgatetactics@gmail.com</span>
            </div>
      
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {year} Vurge LLC, Inc. All rights reserved. Game content and assets are trademarks of Frost Giant Studios.
          </p>
        </div>
      </footer>
    )
  }
  