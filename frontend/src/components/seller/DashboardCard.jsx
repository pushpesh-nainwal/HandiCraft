const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "text-green-600",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className={`${color}`}>
          <Icon size={38} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
