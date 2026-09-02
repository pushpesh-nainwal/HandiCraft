const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "text-[#A8572E]",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-[#E6DBC8]">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[#7A6A58] text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-[#2E2016]">{value}</h2>
        </div>

        <div className={`${color}`}>
          <Icon size={38} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
