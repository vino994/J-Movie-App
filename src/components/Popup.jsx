export default function Popup({ message, type }) {
  if (!message) return null;

  return (
    <div className={`fixed top-5 right-5 px-5 py-3 rounded-lg text-white shadow-lg z-50
      ${type === "error" ? "bg-red-600" : "bg-green-600"}`}>
      {message}
    </div>
  );
}
