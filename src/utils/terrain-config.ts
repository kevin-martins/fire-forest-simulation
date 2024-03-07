export const temperatureColor = (temperature: number) => {
  switch (true) {
    case temperature >= -20 && temperature < 0:
      return "bg-blue-500"; // Cold colors
    case temperature >= 0 && temperature < 20:
      return "bg-green-500"; // Moderate colors
    case temperature >= 20 && temperature <= 50:
      return "bg-red-500"; // Hot colors
    default:
      return "bg-gray-500";
  }
}