/**
 * Boilerplate component for all cards
 *
 * @param {{cardStyle: string, label: string, children: ReactNode }} param0
 * @returns
 */
export default function Card({ children, cardStyle }) {
  return (
    <div
      className={
        "rounded-md p-8 shadow-md bg-foreground " + (cardStyle ? cardStyle : "")
      }
    >
      {children ? children : "N/A"}
    </div>
  );
}
