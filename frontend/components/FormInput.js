export default function FormInput({ label, type, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <input 
        className="border border-gray-300 rounded w-full py-2 px-3" 
        type={type} 
        value={value} 
        onChange={onChange} 
        required 
      />
    </div>
  );
}
