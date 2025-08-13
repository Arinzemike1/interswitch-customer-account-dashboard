import { ReactNode } from "react";
interface TableProps {
  columns: string[];
  className?: string;
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, className, children }) => {
  return (
    <div className={`overflow-x-auto h-auto ${className}`}>
      <table className={`table w-full bg-white ${className}`}>
        <thead>
          <tr className="text-sm border-b border-[#F2F4F7]">
            {columns.map((column: any, index: number) => (
              <th key={index} className="text-left whitespace-nowrap font-semibold p-4">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F2F4F7]">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
