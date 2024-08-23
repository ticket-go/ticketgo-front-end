import { ButtonInput } from "./button-input";

export function InputCodeForm() {
  return (
    <div className="relative flex items-center w-full bg-white rounded-md shadow-md px-2 p-2">
      <input
        className="bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 px-4 py-2 flex-1 rounded-l-md"
        placeholder="Código"
      />
      <ButtonInput 
        text="Aplicar cupom" 
      />
    </div>
  );
}
