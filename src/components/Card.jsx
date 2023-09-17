/**
 * Boilerplate component for all cards 
 * 
 * @param {{cardStyle: string, label: string, children: ReactNode }} param0 
 * @returns 
 */
export default function Card({ cardStyle, label, children }) {
  return (
    <div className={`rounded-md ${cardStyle ? cardStyle : ''} px-4 pt-8 pb-8 shadow-md md:shadow-lg md:w-64 sm:w-32`}>
      <div className="text-gray-400 uppercase text-xs">{label}</div>
      <div className="pt-2 text-gray-500 pl-3 ">
        {children ? children : "N/A"} 
      </div>
    </div>
  );
}
