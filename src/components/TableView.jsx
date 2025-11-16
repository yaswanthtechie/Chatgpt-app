const TableView = ({ table }) => {
  if (!table || !table.columns || !table.rows) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <table className="w-full text-sm text-left">
        <thead className="bg-light-surface dark:bg-dark-surface">
          <tr>
            {table.columns.map((col, index) => (
              <th key={index} scope="col" className="px-4 py-2 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-light-border dark:border-dark-border">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
